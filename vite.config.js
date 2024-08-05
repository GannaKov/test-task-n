import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

//base: "/your_repo_name/",
// https://vitejs.dev/config/
// export default defineConfig({
//   plugins: [react()],
//   server: {
//     proxy: {
//       "/api": {
//         target:
//           "https://cors-anywhere.herokuapp.com/https://live.devnimble.com/api/v1",
//         changeOrigin: true,
//         rewrite: (path) => path.replace(/^\/api/, ""),
//       },
//     },
//   },
// });
export default defineConfig({
  base: "/test-task-n/",
  plugins: [react()],
  server: {
    proxy: {
      "/api": {
        target: "https://live.devnimble.com/api/v1",
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, ""),
        secure: false,
      },
    },
  },
});
