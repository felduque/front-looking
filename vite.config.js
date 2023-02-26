import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// se configura para ssr

export default defineConfig({
  plugins: [react()],
  ssr: {
    noExternal: ["react", "react-dom"],
  },
});
