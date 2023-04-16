// vite.config.js

export default {
    rollupOptions: {
        output: {
            sourcemapPathTransform: (sourcePath, relativePath) => {
                // myScript();
                console.log("hello");
                return sourcePath;
            },
        },
    },
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
}