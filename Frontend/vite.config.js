import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// Vite configuration enabling React plugin support
export default defineConfig({
  plugins: [react()],
});
