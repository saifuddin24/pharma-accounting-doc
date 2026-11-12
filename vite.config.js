import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  base: '/pharma-accounting-doc/',
  plugins: [react()],
  server: { port: 5173 },
});
