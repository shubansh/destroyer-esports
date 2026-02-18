import type { Config } from 'tailwindcss'

const config: Config = {
    content: [
        './pages/**/*.{js,ts,jsx,tsx,mdx}',
        './components/**/*.{js,ts,jsx,tsx,mdx}',
        './app/**/*.{js,ts,jsx,tsx,mdx}',
    ],
    theme: {
        extend: {
            colors: {
                background: '#050505', // Deeper black
                foreground: '#ffffff',
                primary: {
                    DEFAULT: '#00BFFF', // Deep Sky Blue / Neon
                    hover: '#33CCFF',
                    dim: 'rgba(0, 191, 255, 0.1)',
                },
                secondary: '#121212', // Surface color
                accent: '#7000FF', // Electric Purple
                success: '#00FF9D', // Neon Green for wins/success
            },
            fontFamily: {
                sans: ['var(--font-inter)', 'sans-serif'],
                mono: ['var(--font-roboto-mono)', 'monospace'],
                display: ['var(--font-outfit)', 'sans-serif'],
            },
            backgroundImage: {
                'radial-faded': 'radial-gradient(circle at center, rgba(0, 191, 255, 0.15) 0%, transparent 70%)',
                'gradient-premium': 'linear-gradient(to bottom, transparent, #050505)',
            },
            animation: {
                'pulse-slow': 'pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite',
                'float': 'float 6s ease-in-out infinite',
            },
            keyframes: {
                float: {
                    '0%, 100%': { transform: 'translateY(0)' },
                    '50%': { transform: 'translateY(-10px)' },
                }
            }
        },
    },
    plugins: [],
}
export default config
