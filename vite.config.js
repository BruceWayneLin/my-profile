import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import fs from 'fs'
import path from 'path'

export default defineConfig({
  build: {
    minify: 'terser',
    terserOptions: {
      compress: {
        drop_console: true,
        drop_debugger: true,
      },
    },
  },
  plugins: [
    react(),
    {
      name: 'serve-projects',
      configureServer(server) {
        server.middlewares.use((req, res, next) => {
          if (!req.url.startsWith('/projects/')) return next()

          // strip query string
          const urlPath = req.url.split('?')[0]
          let filePath = path.join(__dirname, 'public', urlPath)

          // directory request → look for index.html
          if (fs.existsSync(filePath) && fs.statSync(filePath).isDirectory()) {
            filePath = path.join(filePath, 'index.html')
          }

          if (fs.existsSync(filePath)) {
            const ext = path.extname(filePath)
            const mime = {
              '.html': 'text/html',
              '.js':   'application/javascript',
              '.css':  'text/css',
              '.png':  'image/png',
              '.jpg':  'image/jpeg',
              '.gif':  'image/gif',
              '.svg':  'image/svg+xml',
              '.ico':  'image/x-icon',
              '.woff': 'font/woff',
              '.woff2':'font/woff2',
              '.ttf':  'font/ttf',
              '.eot':  'application/vnd.ms-fontobject',
              '.json': 'application/json',
              '.map':  'application/json',
            }
            res.setHeader('Content-Type', mime[ext] || 'application/octet-stream')
            res.end(fs.readFileSync(filePath))
          } else {
            next()
          }
        })
      },
    },
  ],
})
