import { defineConfig, loadEnv } from 'vite'
import react from '@vitejs/plugin-react'
import dotenv from 'dotenv'
dotenv.config({ path: '../../.env' })

export default ({ mode }) => {
  // Load app-level env vars to node-level env vars.
  process.env = { ...process.env, ...loadEnv(mode, process.cwd()) }

  return defineConfig({
    server: {
      port: Number(process.env.CLIENT_PORT) || 3000,
    },
    define: {
      __SERVER_PORT__: process.env.SERVER_PORT,
    },
    plugins: [react()],
  })
}
// https://vitejs.dev/config/
