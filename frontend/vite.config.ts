// import { defineConfig } from 'vite';
// import react from '@vitejs/plugin-react';

// // https://vitejs.dev/config/
// export default defineConfig({
//   plugins: [react()],
//   build: {
//     // Specify the output directory here
//     outDir: 'build',
//   },
// });

import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import dotenv from 'dotenv';
import dotenvExpand from 'dotenv-expand';

// Initialize dotenv
const myEnv = dotenv.config();
dotenvExpand.expand(myEnv);

export default defineConfig({
  plugins: [react()],
  build: {
    outDir: 'build',
  },
  // Optionally, you can manually specify env variables here if needed.
  // For example, to make sure they are correctly typed and available.
  define: {
    'process.env': process.env,
  },
});
