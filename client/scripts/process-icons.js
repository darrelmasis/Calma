import fs from 'fs';
import path from 'path';

const sourceFolders = {
  regular: 'src/assets/icons/src/regular',
  solid: 'src/assets/icons/src/solid',
  brands: 'src/assets/icons/src/brands'
};

const targetBase = 'src/assets/icons/processed';
const maxSize = 24; // Tamaño máximo de la dimensión mayor

// Función para procesar un SVG
function processSVG(filePath, targetPath) {
  let svg = fs.readFileSync(filePath, 'utf-8');

  // Eliminar comentarios
  svg = svg.replace(/<!--[\s\S]*?-->/g, '');

  // Extraer nombre del icono sin extensión
  const iconName = path.basename(filePath, '.svg');

  // Agregar atributo data-icon al <svg> (antes de cualquier otro atributo)
  svg = svg.replace(/<svg/, `<svg data-iconName="${iconName}"`);

  const viewBoxMatch = svg.match(/viewBox="([\d.-]+)\s+([\d.-]+)\s+([\d.-]+)\s+([\d.-]+)"/);
  if (!viewBoxMatch) {
    console.warn(`No viewBox encontrado en: ${filePath}`);
    return;
  }

  const [_, minX, minY, widthStr, heightStr] = viewBoxMatch;
  const width = parseFloat(widthStr);
  const height = parseFloat(heightStr);

  let newWidth, newHeight;
  if (width > height) {
    newWidth = maxSize;
    newHeight = (height / width) * maxSize;
  } else {
    newHeight = maxSize;
    newWidth = (width / height) * maxSize;
  }

  if (svg.includes('width=')) {
    svg = svg.replace(/width="[\d.]+"/, `width="${newWidth}"`);
  } else {
    svg = svg.replace(/<svg/, `<svg width="${newWidth}"`);
  }

  if (svg.includes('height=')) {
    svg = svg.replace(/height="[\d.]+"/, `height="${newHeight}"`);
  } else {
    svg = svg.replace(/<svg/, `<svg height="${newHeight}"`);
  }

  fs.mkdirSync(path.dirname(targetPath), { recursive: true });
  fs.writeFileSync(targetPath, svg, 'utf-8');
  console.log(`Procesado: ${targetPath}`);
}


// Procesar todas las carpetas (regular y solid)
Object.entries(sourceFolders).forEach(([type, folderPath]) => {
  const targetFolder = path.join(targetBase, type);
  fs.readdirSync(folderPath).forEach(file => {
    if (!file.endsWith('.svg')) return;
    const sourceFile = path.join(folderPath, file);
    const targetFile = path.join(targetFolder, file);
    processSVG(sourceFile, targetFile);
  });
});

// Función para generar index.js
function generateIndex(folder) {
  const files = fs.readdirSync(folder).filter(f => f.endsWith('.svg'))
  const lines = files.map(file => {
    const name = path.basename(file, '.svg')
      .split('-')
      .map(w => w.charAt(0).toUpperCase() + w.slice(1))
      .join('');
    return `import ${name} from './${file}?react';`;
  });

  const exports = `export {\n  ${files.map(f =>
    path.basename(f, '.svg')
      .split('-')
      .map(w => w.charAt(0).toUpperCase() + w.slice(1))
      .join('')
  ).join(',\n  ')}\n};`;

  const content = lines.join('\n') + '\n\n' + exports + '\n';
  fs.writeFileSync(path.join(folder, 'index.jsx'), content, 'utf-8');
  console.log(`Index generado en: ${folder}/index.jsx`);
}


// Generar index.js para cada variante
Object.keys(sourceFolders).forEach(type => {
  const targetFolder = path.join(targetBase, type);
  generateIndex(targetFolder);
});
