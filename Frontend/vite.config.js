import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';

// This gets the public ngrok URL from an environment variable
const hmrHost = process.env.VITE_HMR_HOST;

export default defineConfig({
  plugins: [
    react(),
    tailwindcss(),
  ],
  // This new server section fixes the WebSocket issue with ngrok
  server: {
    hmr: hmrHost ? {
      protocol: 'wss',
      host: hmrHost,
      clientPort: 443,
    } : true,
  },
});