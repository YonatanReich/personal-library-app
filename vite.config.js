import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

export default defineConfig({
  plugins: [
    react(),
    tailwindcss(),
  ],
  server: {
    host: '0.0.0.0', // Allows connections from your local network
    allowedHosts: true, // Disables host header checking for the tunnel
    hmr: {
      clientPort: 443, // Forces HMR to use Pinggy's secure port
    },
  } // Added missing closing brace for server
}) // Added missing closing brace for defineConfig