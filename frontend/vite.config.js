import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from '@tailwindcss/vite';
import autoprefixer from 'autoprefixer';

// https://vitejs.dev/config/
export default defineConfig({
    plugins: [
        react(),
        tailwindcss([
            {
                content: [
                    "./index.html",
                    "./src/**/*.{js,jsx,ts,tsx}",
                    "./src/views/**/*.{js,jsx,ts,tsx}",
                    "./src/components/**/*.{js,jsx,ts,tsx}",
                    "./src/pages/**/*.{js,jsx,ts,tsx}",
                    "./src/layouts/**/*.{js,jsx,ts,tsx}"
                ],
                theme: {
                    extend: {},
                },
                plugins: [
                    autoprefixer(),
                ],
            }
        ])

    ]
});
