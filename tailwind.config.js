/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  important: true, // Ensures Tailwind classes take precedence inside MUI Dialogs & Portals
  theme: {
    extend: {
      colors: {
        // ── 1. Global Standard Tailwind Tokens ──────────────────────────────────
        primary: {
          DEFAULT: '#0b4668',
          hover: '#08354f',
          foreground: '#FFFFFF',
          light: '#f0f7fa',
          subtle: '#eef4f6',
          50: '#f0f7fa',
          100: '#dbebf2',
          200: '#bad9e6',
          300: '#8ac0d4',
          400: '#53a0bf',
          500: '#457b8d',
          600: '#3483a5',
          700: '#276a8a',
          800: '#225571',
          900: '#0b4668',
          950: '#08354f',
        },
        'primary-hover': '#08354f',
        'primary-foreground': '#FFFFFF',
        'primary-light': '#f0f7fa',
        'primary-subtle': '#eef4f6',

        secondary: {
          DEFAULT: '#457b8d',
          hover: '#366270',
          foreground: '#FFFFFF',
          light: '#eef4f6',
        },
        'secondary-hover': '#366270',
        'secondary-foreground': '#FFFFFF',
        'secondary-light': '#eef4f6',

        muted: {
          DEFAULT: '#6B7280',
          foreground: '#45464D',
          bg: '#f1f1f1',
          light: '#f8fafc',
        },
        'muted-foreground': '#45464D',
        'muted-bg': '#f1f1f1',
        'muted-light': '#f8fafc',

        accent: {
          DEFAULT: '#457b8d',
          hover: '#366270',
          foreground: '#FFFFFF',
          light: '#eef4f6',
        },
        destructive: {
          DEFAULT: '#b22b32',
          foreground: '#FFFFFF',
          text: '#991b1b',
          bg: '#fee2e2',
          dot: '#b22b32',
        },
        'destructive-foreground': '#FFFFFF',
        'destructive-text': '#991b1b',
        'destructive-bg': '#fee2e2',

        warning: {
          DEFAULT: '#fbbf24',
          foreground: '#92400e',
          text: '#92400e',
          bg: '#fef3c7',
          dot: '#fbbf24',
        },
        'warning-foreground': '#92400e',
        'warning-text': '#92400e',
        'warning-bg': '#fef3c7',

        success: {
          DEFAULT: '#4edea3',
          foreground: '#065f46',
          text: '#065f46',
          bg: '#e6f9f2',
          dot: '#4edea3',
        },
        'success-foreground': '#065f46',
        'success-text': '#065f46',
        'success-bg': '#e6f9f2',

        error: {
          DEFAULT: '#b22b32',
          foreground: '#FFFFFF',
          text: '#991b1b',
          bg: '#fee2e2',
          dot: '#b22b32',
        },

        // ── 2. Standard Surface & Background Aliases ────────────────────────────
        background: '#f1f1f1',
        app: '#f1f1f1',
        surface: '#FFFFFF',
        'surface-hover': '#f8fafc',
        card: '#FFFFFF',
        border: '#E2E8F0',
        ring: '#0b4668',

        // ── 3. Application Domain Specific Aliases ──────────────────────────────
        brand: {
          DEFAULT: '#0b4668',
          hover: '#08354f',
          dark: '#08354f',
          light: '#f0f7fa',
          subtle: '#eef4f6',
          accent: '#457b8d',
        },
        'brand-hover': '#08354f',
        'brand-accent': '#457b8d',
        navy: {
          DEFAULT: '#0b4668',
          900: '#08354f',
        },
        vibrant: {
          DEFAULT: '#457b8d',
          hover: '#366270',
          light: '#eef4f6',
        },
        'vibrant-hover': '#366270',
        neutralDark: {
          DEFAULT: '#45464D',
          text: '#45464D',
          muted: '#6B7280',
        },
        neutralLight: {
          DEFAULT: '#f1f1f1',
          hover: '#e5e7eb',
        },
        sidebar: {
          DEFAULT: '#FFFFFF',
          border: '#E2E8F0',
          active: '#0b4668',
          'active-foreground': '#FFFFFF',
        },
      },
      fontFamily: {
        sans: ['Inter', 'Poppins', 'system-ui', '-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'Roboto', 'sans-serif'],
        display: ['"Bodoni Moda"', '"Libre Bodoni"', '"Bodoni Bk BT"', 'Georgia', 'serif'],
        heading: ['Inter', 'Poppins', 'sans-serif'],
        poppins: ['Poppins', 'Inter', 'sans-serif'],
      },
      fontSize: {
        'd1': ['32px', { lineHeight: '40px', fontWeight: '700' }],         // Display Large (Inter Bold 32px)
        'h1': ['24px', { lineHeight: '32px', fontWeight: '600' }],         // Headline Large (Inter Semibold 24px)
        'h2': ['18px', { lineHeight: '26px', fontWeight: '600' }],         // Title Large (Inter Semibold 18px)
        'h3': ['16px', { lineHeight: '24px', fontWeight: '500' }],         // Title Medium / Heading Small (Inter Medium 16px)
        'body-lg': ['14px', { lineHeight: '20px', fontWeight: '400' }],   // Body Large (Inter Regular 14px)
        'body-sm': ['12px', { lineHeight: '16px', fontWeight: '400' }],   // Body Small (Inter Regular 12px)
        'caption': ['10px', { lineHeight: '14px', fontWeight: '400' }],   // Label Small / Caption (Inter Regular 10px)
      },
      borderRadius: {
        none: '0px',
        xs: '4px',
        sm: '8px',
        DEFAULT: '8px',
        md: '8px',
        lg: '8px',
        xl: '8px',
        '2xl': '8px',
        '3xl': '8px',
        pill: '9999px',
        full: '9999px',
      },
      boxShadow: {
        '2xs': '0 1px 2px 0 rgba(16, 24, 40, 0.05)',
        'xs': '0 1px 2px 0 rgba(16, 24, 40, 0.06), 0 1px 3px 0 rgba(16, 24, 40, 0.10)',
        'card': '0px 4px 4px -1px rgba(12, 12, 13, 0.08), 0px 2px 4px -1px rgba(12, 12, 13, 0.04)',
        'card-hover': '0 12px 24px -4px rgba(11, 70, 104, 0.12)',
      },
    },
  },
  plugins: [],
}
