import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'

export default defineConfig({
  plugins: [react()],
  // Relativa sökvägar så att sidan fungerar både på robbaeli.github.io och lokalt
  base: './',
})
