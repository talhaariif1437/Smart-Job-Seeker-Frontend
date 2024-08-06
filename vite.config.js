// vite.config.js
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
// import visualizer from 'rollup-plugin-visualizer';

export default defineConfig({
  plugins: [
    react(),
    // visualizer({
    //   open: true, // Automatically open the report in your default browser
    //   filename: 'bundle-report.html', // Name of the report file
    // }),
  ],
  build: {
    chunkSizeWarningLimit: 1000, // Adjust if necessary to suppress warnings
    // rollupOptions: {
      output: {
        manualChunks(id) {
          if (id.includes('node_modules')) {
            if (id.includes('@mui')) {
              // Group all Material UI components into a single chunk
              return 'mui';
            }
            if (id.includes('react-toastify')) {
              return 'toastify';
            }
            if (id.includes('react-router-dom')) {
              return 'react-router-dom';
            }
            // Split other libraries into their own chunks by default
            return id.toString().split('node_modules/')[1].split('/')[0].toString();
          }
        },
      },
    // },
  },
});
