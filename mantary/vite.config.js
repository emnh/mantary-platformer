// vite.config.js

export default {
    build: {
      watch: {
        include: ["src/**/*", "node_modules/**/*"],
        exclude: ["node_modules/**/*.{ts,tsx}"],
        usePolling: true
      },
    },
    watch: {
        include: ["src/**/*", "node_modules/**/*"],
        exclude: ["node_modules/**/*.{ts,tsx}"],
        usePolling: true
    },
  };