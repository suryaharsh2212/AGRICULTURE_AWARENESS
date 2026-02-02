/** @type {import('tailwindcss').Config} */
export default {
    content: [
        "./index.html",
        "./src/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
        extend: {
            colors: {
                // Earthy green palette
                primary: {
                    50: '#f0fdf4',
                    100: '#dcfce7',
                    200: '#bbf7d0',
                    300: '#86efac',
                    400: '#4ade80',
                    500: '#22c55e',
                    600: '#16a34a',
                    700: '#15803d',
                    800: '#166534',
                    900: '#14532d',
                },
                // Earthy brown palette
                secondary: {
                    50: '#faf8f5',
                    100: '#f5f1ea',
                    200: '#e8dfd0',
                    300: '#d4c4a8',
                    400: '#b8a080',
                    500: '#9d7d5f',
                    600: '#8b6f52',
                    700: '#725a44',
                    800: '#5e4a39',
                    900: '#4d3d2f',
                },
                // Accent colors
                accent: {
                    orange: '#fb923c',
                    yellow: '#fbbf24',
                    sky: '#38bdf8',
                }
            },
            fontFamily: {
                sans: ['Inter', 'system-ui', 'sans-serif'],
                display: ['Poppins', 'sans-serif'],
            },
            boxShadow: {
                'soft': '0 2px 15px -3px rgba(0, 0, 0, 0.07), 0 10px 20px -2px rgba(0, 0, 0, 0.04)',
            },
        },
    },
    plugins: [],
}
