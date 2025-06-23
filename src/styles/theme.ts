export const theme = {
  colors: {
    // Minecraft-inspired color palette
    primary: {
      grass: '#7CB342',      // Grass block green
      dirt: '#8B4513',       // Dirt brown
      stone: '#696969',      // Stone gray
      cobblestone: '#5A5A5A', // Darker stone
      wood: '#DEB887',       // Wood planks
      leaves: '#228B22',     // Darker green for leaves
    },
    secondary: {
      diamond: '#00BFFF',    // Diamond blue
      gold: '#FFD700',       // Gold
      iron: '#C0C0C0',       // Iron gray
      redstone: '#DC143C',   // Redstone red
      lapis: '#4169E1',      // Lapis lazuli blue
    },
    ui: {
      background: '#2F2F2F',     // Dark background
      surface: '#3F3F3F',       // Card/surface color
      surfaceLight: '#4F4F4F',  // Lighter surface
      border: '#5F5F5F',        // Border color
      text: '#FFFFFF',          // Primary text
      textSecondary: '#CCCCCC', // Secondary text
      textMuted: '#999999',     // Muted text
      success: '#4CAF50',       // Success green
      warning: '#FF9800',       // Warning orange
      error: '#F44336',         // Error red
      accent: '#00E676',        // Bright accent green
    },
    typing: {
      correct: '#4CAF50',       // Correct character
      incorrect: '#F44336',     // Incorrect character
      current: '#FFD700',       // Current character highlight
      pending: '#999999',       // Pending characters
      completed: '#81C784',     // Completed text
    }
  },
  
  fonts: {
    // Minecraft-style pixelated fonts
    primary: '"Courier New", "Monaco", "Menlo", monospace',
    heading: '"Courier New", "Monaco", "Menlo", monospace',
    mono: '"Courier New", "Monaco", "Menlo", monospace',
  },
  
  fontSizes: {
    xs: '0.75rem',    // 12px
    sm: '0.875rem',   // 14px
    base: '1rem',     // 16px
    md: '1rem',       // 16px (alias for base)
    lg: '1.125rem',   // 18px
    xl: '1.25rem',    // 20px
    '2xl': '1.5rem',  // 24px
    '3xl': '1.875rem', // 30px
    '4xl': '2.25rem', // 36px
    '5xl': '3rem',    // 48px
  },
  
  spacing: {
    xs: '0.25rem',    // 4px
    sm: '0.5rem',     // 8px
    md: '1rem',       // 16px
    lg: '1.5rem',     // 24px
    xl: '2rem',       // 32px
    '2xl': '3rem',    // 48px
    '3xl': '4rem',    // 64px
  },
  
  borderRadius: {
    none: '0',
    sm: '2px',        // Slightly pixelated
    md: '4px',        // Block-like
    lg: '6px',
    full: '9999px',
  },
  
  shadows: {
    sm: '0 1px 2px rgba(0, 0, 0, 0.3)',
    md: '0 2px 4px rgba(0, 0, 0, 0.3)',
    lg: '0 4px 8px rgba(0, 0, 0, 0.3)',
    xl: '0 8px 16px rgba(0, 0, 0, 0.3)',
    inset: 'inset 0 2px 4px rgba(0, 0, 0, 0.3)',
  },
  
  breakpoints: {
    sm: '640px',
    md: '768px',
    lg: '1024px',
    xl: '1280px',
    '2xl': '1536px',
  },
  
  zIndex: {
    dropdown: 1000,
    sticky: 1020,
    fixed: 1030,
    modal: 1040,
    popover: 1050,
    tooltip: 1060,
  },
  
  transitions: {
    fast: '150ms ease-in-out',
    normal: '250ms ease-in-out',
    slow: '350ms ease-in-out',
  },
} as const;

export type Theme = typeof theme;
