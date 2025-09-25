import sharp from 'sharp'
import fs from 'fs-extra'
import path from 'path'
import { fileURLToPath } from 'url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)
const basePath = path.resolve(__dirname, '../src/assets/images')

// Array de carpetas de entrada
const inputDirs = [
  path.join(basePath, 'info'),
  path.join(basePath, 'services'),
  path.join(basePath, 'team')
]

const outputDir = path.join(__dirname, '../public/images')

// Resoluciones deseadas
const sizes = [400, 800, 1200]

async function optimizeImage(filePath) {
  const ext = path.extname(filePath)
  const name = path.basename(filePath, ext)
  const dirName = path.basename(path.dirname(filePath)) // para saber de qué carpeta viene

  await Promise.all(
    sizes.flatMap((size) => {
      const tasks = [
        // WebP
        sharp(filePath)
          .resize(size)
          .toFormat('webp')
          .toFile(path.join(outputDir, 'webp', `${name}-${size}.webp`)),

        // JPG
        sharp(filePath)
          .resize({ width: size, withoutEnlargement: true })
          .jpeg({ quality: 80 })
          .toFile(path.join(outputDir, 'jpg', `${name}-${size}.jpg`))
      ]

      // PNG solo si la carpeta es 'team'
      if (dirName === 'team') {
        tasks.push(
          sharp(filePath)
            .resize({ width: size, withoutEnlargement: true })
            .png()
            .toFile(path.join(outputDir, 'png', `${name}-${size}.png`))
        )
      }

      return tasks
    })
  )
}

async function processDir(dir) {
  const files = await fs.readdir(dir)

  for (const file of files) {
    const fullPath = path.join(dir, file)
    const stat = await fs.stat(fullPath)

    if (stat.isDirectory()) {
      await processDir(fullPath) // recursivo para subcarpetas
    } else if (/\.(jpe?g|png)$/i.test(file)) {
      await optimizeImage(fullPath)
      console.log('✅ Optimized:', fullPath)
    }
  }
}

async function main() {
  await fs.ensureDir(path.join(outputDir, 'webp'))
  await fs.ensureDir(path.join(outputDir, 'jpg'))
  await fs.ensureDir(path.join(outputDir, 'png')) // se creará solo si hay imágenes en 'team'

  for (const dir of inputDirs) {
    await processDir(dir)
  }

  console.log('🎉 Todas las imágenes optimizadas.')
}

main().catch(console.error)
