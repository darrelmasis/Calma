// prerender.js
import fs from 'fs'
import path from 'path'
import puppeteer from 'puppeteer'
import { exec } from 'child_process'

const routes = [
  '/',
  '/story',
  '/packages',
  '/services',
  '/booking',
  '/contact',
  '/team',
  '/home',
]

const DIST_DIR = path.resolve('./dist')
const SERVER_PORT = 4173 // puerto temporal

async function startServer() {
  return new Promise((resolve, reject) => {
    const serverProcess = exec(`npx http-server ${DIST_DIR} -p ${SERVER_PORT} -c-1`, (err) => {
      if (err) reject(err)
    })
    // espera 1s para que el servidor inicie
    setTimeout(() => resolve(serverProcess), 1000)
  })
}

async function prerender() {
  const serverProcess = await startServer()
  console.log(`Server running at http://localhost:${SERVER_PORT}`)

  const browser = await puppeteer.launch()
  const page = await browser.newPage()

  for (const route of routes) {
    try {
      const url = `http://localhost:${SERVER_PORT}${route}`
      console.log(`Prerendering ${route}...`)
      await page.goto(url, { waitUntil: 'networkidle0' })
      const html = await page.content()

      let filePath
      if (route === '/' || route === '/home') {
        filePath = path.join(DIST_DIR, 'index.html')
      } else {
        const routePath = route.startsWith('/') ? route.slice(1) : route
        const dir = path.join(DIST_DIR, routePath)
        fs.mkdirSync(dir, { recursive: true })
        filePath = path.join(dir, 'index.html')
      }

      fs.writeFileSync(filePath, html)
      console.log(`Saved ${filePath}`)
    } catch (err) {
      console.error(`Error during prerender ${route}:`, err)
    }
  }

  await browser.close()
  serverProcess.kill() // detiene http-server
  console.log('Prerendering complete!')
}

prerender().catch(err => {
  console.error(err)
  process.exit(1)
})
