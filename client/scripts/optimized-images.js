import sharp from "sharp";
import fs from "fs-extra";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const inputDir = path.join(__dirname, "../src/assets/images");
const outputDir = path.join(__dirname, "../public/images");

// Resoluciones deseadas
const sizes = [400, 800, 1200];

async function optimizeImage(file) {
  const ext = path.extname(file);
  const name = path.basename(file, ext);
  const inputPath = path.join(inputDir, file);

  await Promise.all(
    sizes.flatMap((size) => [
      sharp(inputPath)
        .resize(size)
        .toFormat("webp")
        .toFile(path.join(outputDir, "webp", `${name}-${size}.webp`)),

      sharp(inputPath)
        .resize({ width: size, withoutEnlargement: true }) // Mantiene la proporción original
        .jpeg({ quality: 80 })
        .toFile(path.join(outputDir, "jpg", `${name}-${size}.jpg`)),
    ])
  );
}

async function main() {
  await fs.ensureDir(outputDir);
  await fs.ensureDir(path.join(outputDir, "webp"));
  await fs.ensureDir(path.join(outputDir, "jpg"));

  const files = await fs.readdir(inputDir);

  for (const file of files) {
    if (/\.(jpe?g|png)$/i.test(file)) {
      await optimizeImage(file);
      console.log("Optimized:", file);
    }
  }
}

main().catch(console.error);
