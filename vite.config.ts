import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import * as path from "node:path";


export default defineConfig({
  plugins: [
    react({
      babel: {
        plugins: ['babel-plugin-styled-components'],
      },
    }),
  ],

  base: '/ToDoList/',
  resolve: {
    alias: {
      '@/': `${path.resolve(__dirname, 'src')}/`,
    },
  },
});
