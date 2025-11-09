// Design System - Centralized Design Tokens
// Following 8px Grid System and WCAG AA Accessibility Standards

// ============================================================================
// SPACING SYSTEM (8px Grid)
// ============================================================================
export const SPACING = {
  // Base spacing units
  xs: '4px',    // 0.25rem
  sm: '8px',    // 0.5rem
  md: '16px',   // 1rem
  lg: '24px',   // 1.5rem
  xl: '32px',   // 2rem
  '2xl': '48px', // 3rem
  '3xl': '64px', // 4rem
  '4xl': '96px', // 6rem
  '5xl': '128px', // 8rem
  
  // Component-specific spacing
  input: {
    padding: '12px 16px', // 0.75rem 1rem
    height: '48px',       // 3rem
    borderRadius: '8px',  // 0.5rem
  },
  button: {
    padding: '12px 24px', // 0.75rem 1.5rem
    height: '48px',       // 3rem
    borderRadius: '8px',  // 0.5rem
  },
  card: {
    padding: '24px',      // 1.5rem
    borderRadius: '12px', // 0.75rem
    gap: '16px',          // 1rem
  },
} as const;

// ============================================================================
// TYPOGRAPHY SYSTEM
// ============================================================================
export const TYPOGRAPHY = {
  // Font Families
  fontFamily: {
    sans: [
      'Inter',
      'system-ui',
      '-apple-system',
      'BlinkMacSystemFont',
      'Segoe UI',
      'Roboto',
      'Helvetica Neue',
      'Arial',
      'sans-serif'
    ].join(', '),
    mono: [
      'JetBrains Mono',
      'Monaco',
      'Consolas',
      'Liberation Mono',
      'Courier New',
      'monospace'
    ].join(', '),
  },
  
  // Font Sizes with Line Heights (ensuring 4.5:1 contrast ratio minimum)
  fontSize: {
    xs: {
      size: '0.75rem',    // 12px
      lineHeight: '1rem', // 16px
      weight: '400',
    },
    sm: {
      size: '0.875rem',   // 14px
      lineHeight: '1.25rem', // 20px
      weight: '400',
    },
    base: {
      size: '1rem',       // 16px
      lineHeight: '1.5rem', // 24px
      weight: '400',
    },
    lg: {
      size: '1.125rem',   // 18px
      lineHeight: '1.75rem', // 28px
      weight: '400',
    },
    xl: {
      size: '1.25rem',    // 20px
      lineHeight: '1.75rem', // 28px
      weight: '500',
    },
    '2xl': {
      size: '1.5rem',     // 24px
      lineHeight: '2rem', // 32px
      weight: '600',
    },
    '3xl': {
      size: '1.875rem',   // 30px
      lineHeight: '2.25rem', // 36px
      weight: '600',
    },
    '4xl': {
      size: '2.25rem',    // 36px
      lineHeight: '2.5rem', // 40px
      weight: '700',
    },
    '5xl': {
      size: '3rem',       // 48px
      lineHeight: '1',    // 48px
      weight: '700',
    },
    '6xl': {
      size: '3.75rem',    // 60px
      lineHeight: '1',    // 60px
      weight: '800',
    },
  },
  
  // Font Weights
  fontWeight: {
    light: '300',
    normal: '400',
    medium: '500',
    semibold: '600',
    bold: '700',
    extrabold: '800',
  },
  
  // Letter Spacing
  letterSpacing: {
    tight: '-0.025em',
    normal: '0em',
    wide: '0.025em',
    wider: '0.05em',
    widest: '0.1em',
  },
} as const;

// ============================================================================
// COLOR SYSTEM
// ============================================================================
export const COLORS = {
  // Primary Brand Colors
  primary: {
    50: '#f0f9ff',
    100: '#e0f2fe',
    200: '#bae6fd',
    300: '#7dd3fc',
    400: '#38bdf8',
    500: '#0ea5e9',
    600: '#0284c7',
    700: '#0369a1',
    800: '#075985',
    900: '#0c4a6e',
    950: '#082f49',
  },
  
  // Neutral Grays
  neutral: {
    50: '#fafafa',
    100: '#f5f5f5',
    200: '#e5e5e5',
    300: '#d4d4d4',
    400: '#a3a3a3',
    500: '#737373',
    600: '#525252',
    700: '#404040',
    800: '#262626',
    900: '#171717',
    950: '#0a0a0a',
  },
  
  // Success Colors
  success: {
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
    950: '#052e16',
  },
  
  // Error Colors
  error: {
    50: '#fef2f2',
    100: '#fee2e2',
    200: '#fecaca',
    300: '#fca5a5',
    400: '#f87171',
    500: '#ef4444',
    600: '#dc2626',
    700: '#b91c1c',
    800: '#991b1b',
    900: '#7f1d1d',
    950: '#450a0a',
  },
  
  // Warning Colors
  warning: {
    50: '#fffbeb',
    100: '#fef3c7',
    200: '#fde68a',
    300: '#fcd34d',
    400: '#fbbf24',
    500: '#f59e0b',
    600: '#d97706',
    700: '#b45309',
    800: '#92400e',
    900: '#78350f',
    950: '#451a03',
  },
  
  // Info Colors
  info: {
    50: '#eff6ff',
    100: '#dbeafe',
    200: '#bfdbfe',
    300: '#93c5fd',
    400: '#60a5fa',
    500: '#3b82f6',
    600: '#2563eb',
    700: '#1d4ed8',
    800: '#1e40af',
    900: '#1e3a8a',
    950: '#172554',
  },
  
  // Semantic Colors for UI
  semantic: {
    text: {
      primary: '#171717',    // neutral-900
      secondary: '#525252',  // neutral-600
      tertiary: '#737373',   // neutral-500
      inverse: '#ffffff',
      disabled: '#a3a3a3',   // neutral-400
    },
    background: {
      primary: '#ffffff',
      secondary: '#fafafa',  // neutral-50
      tertiary: '#f5f5f5',   // neutral-100
      inverse: '#171717',    // neutral-900
    },
    border: {
      primary: '#e5e5e5',    // neutral-200
      secondary: '#d4d4d4',  // neutral-300
      focus: '#0ea5e9',      // primary-500
      error: '#ef4444',      // error-500
      success: '#22c55e',    // success-500
    },
  },
} as const;

// ============================================================================
// BORDER RADIUS SYSTEM
// ============================================================================
export const BORDER_RADIUS = {
  none: '0px',
  sm: '2px',      // 0.125rem
  md: '6px',      // 0.375rem
  lg: '8px',      // 0.5rem
  xl: '12px',     // 0.75rem
  '2xl': '16px',  // 1rem
  '3xl': '24px',  // 1.5rem
  full: '9999px',
} as const;

// ============================================================================
// SHADOW SYSTEM
// ============================================================================
export const SHADOWS = {
  none: 'none',
  sm: '0 1px 2px 0 rgb(0 0 0 / 0.05)',
  md: '0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1)',
  lg: '0 10px 15px -3px rgb(0 0 0 / 0.1), 0 4px 6px -4px rgb(0 0 0 / 0.1)',
  xl: '0 20px 25px -5px rgb(0 0 0 / 0.1), 0 8px 10px -6px rgb(0 0 0 / 0.1)',
  '2xl': '0 25px 50px -12px rgb(0 0 0 / 0.25)',
  inner: 'inset 0 2px 4px 0 rgb(0 0 0 / 0.05)',
  focus: '0 0 0 3px rgb(14 165 233 / 0.5)', // primary-500 with opacity
} as const;

// ============================================================================
// ANIMATION SYSTEM
// ============================================================================
export const ANIMATIONS = {
  duration: {
    fast: '150ms',
    normal: '300ms',
    slow: '500ms',
    slower: '700ms',
  },
  easing: {
    linear: 'linear',
    ease: 'ease',
    easeIn: 'ease-in',
    easeOut: 'ease-out',
    easeInOut: 'ease-in-out',
    bounce: 'cubic-bezier(0.68, -0.55, 0.265, 1.55)',
  },
  keyframes: {
    fadeIn: {
      '0%': { opacity: '0' },
      '100%': { opacity: '1' },
    },
    fadeOut: {
      '0%': { opacity: '1' },
      '100%': { opacity: '0' },
    },
    slideInUp: {
      '0%': { transform: 'translateY(100%)', opacity: '0' },
      '100%': { transform: 'translateY(0)', opacity: '1' },
    },
    slideInDown: {
      '0%': { transform: 'translateY(-100%)', opacity: '0' },
      '100%': { transform: 'translateY(0)', opacity: '1' },
    },
    scaleIn: {
      '0%': { transform: 'scale(0.95)', opacity: '0' },
      '100%': { transform: 'scale(1)', opacity: '1' },
    },
    pulse: {
      '0%, 100%': { opacity: '1' },
      '50%': { opacity: '0.5' },
    },
  },
} as const;

// ============================================================================
// BREAKPOINT SYSTEM
// ============================================================================
export const BREAKPOINTS = {
  xs: '320px',
  sm: '640px',
  md: '768px',
  lg: '1024px',
  xl: '1280px',
  '2xl': '1536px',
} as const;

// ============================================================================
// Z-INDEX SYSTEM
// ============================================================================
export const Z_INDEX = {
  hide: -1,
  auto: 'auto',
  base: 0,
  docked: 10,
  dropdown: 1000,
  sticky: 1100,
  banner: 1200,
  overlay: 1300,
  modal: 1400,
  popover: 1500,
  skipLink: 1600,
  toast: 1700,
  tooltip: 1800,
} as const;

// ============================================================================
// ACCESSIBILITY CONSTANTS
// ============================================================================
export const ACCESSIBILITY = {
  // Focus ring styles
  focusRing: {
    offset: '2px',
    width: '2px',
    color: COLORS.primary[500],
  },
  
  // Minimum touch target size (44px for mobile)
  touchTarget: {
    minSize: '44px',
    minSizeMobile: '48px',
  },
  
  // Color contrast ratios (WCAG AA)
  contrast: {
    normal: 4.5,    // Normal text
    large: 3.0,     // Large text (18pt+ or 14pt+ bold)
    ui: 3.0,        // UI components and graphics
  },
  
  // Reduced motion preferences
  motion: {
    reduced: 'prefers-reduced-motion: reduce',
    safe: 'prefers-reduced-motion: no-preference',
  },
} as const;

// ============================================================================
// COMPONENT-SPECIFIC TOKENS
// ============================================================================
export const COMPONENTS = {
  // Button variants
  button: {
    sizes: {
      sm: {
        padding: '8px 16px',
        fontSize: TYPOGRAPHY.fontSize.sm.size,
        height: '36px',
      },
      md: {
        padding: '12px 24px',
        fontSize: TYPOGRAPHY.fontSize.base.size,
        height: '48px',
      },
      lg: {
        padding: '16px 32px',
        fontSize: TYPOGRAPHY.fontSize.lg.size,
        height: '56px',
      },
    },
    variants: {
      primary: {
        background: COLORS.primary[600],
        color: COLORS.semantic.text.inverse,
        hover: COLORS.primary[700],
        focus: COLORS.primary[500],
      },
      secondary: {
        background: COLORS.neutral[200],
        color: COLORS.semantic.text.primary,
        hover: COLORS.neutral[300],
        focus: COLORS.primary[500],
      },
      outline: {
        background: 'transparent',
        color: COLORS.semantic.text.primary,
        border: `1px solid ${COLORS.semantic.border.primary}`,
        hover: COLORS.neutral[50],
        focus: COLORS.primary[500],
      },
    },
  },
  
  // Input field styles
  input: {
    sizes: {
      sm: {
        padding: '8px 12px',
        fontSize: TYPOGRAPHY.fontSize.sm.size,
        height: '36px',
      },
      md: {
        padding: '12px 16px',
        fontSize: TYPOGRAPHY.fontSize.base.size,
        height: '48px',
      },
      lg: {
        padding: '16px 20px',
        fontSize: TYPOGRAPHY.fontSize.lg.size,
        height: '56px',
      },
    },
    states: {
      default: {
        border: `1px solid ${COLORS.semantic.border.primary}`,
        background: COLORS.semantic.background.primary,
      },
      focus: {
        border: `1px solid ${COLORS.semantic.border.focus}`,
        boxShadow: SHADOWS.focus,
      },
      error: {
        border: `1px solid ${COLORS.semantic.border.error}`,
        background: COLORS.error[50],
      },
      disabled: {
        border: `1px solid ${COLORS.semantic.border.secondary}`,
        background: COLORS.neutral[100],
        opacity: 0.5,
      },
    },
  },
  
  // Card styles
  card: {
    padding: SPACING.card.padding,
    borderRadius: BORDER_RADIUS.xl,
    background: COLORS.semantic.background.primary,
    border: `1px solid ${COLORS.semantic.border.primary}`,
    shadow: SHADOWS.md,
  },
} as const;

// ============================================================================
// UTILITY FUNCTIONS
// ============================================================================

// Color contrast calculation
export const getContrastRatio = (color1: string, color2: string): number => {
  // Simplified contrast calculation - in production, use a proper color library
  const hexToRgb = (hex: string) => {
    const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    return result ? {
      r: parseInt(result[1], 16),
      g: parseInt(result[2], 16),
      b: parseInt(result[3], 16)
    } : null;
  };

  const rgb1 = hexToRgb(color1);
  const rgb2 = hexToRgb(color2);
  
  if (!rgb1 || !rgb2) return 1;
  
  const luminance1 = (0.299 * rgb1.r + 0.587 * rgb1.g + 0.114 * rgb1.b) / 255;
  const luminance2 = (0.299 * rgb2.r + 0.587 * rgb2.g + 0.114 * rgb2.b) / 255;
  
  const lighter = Math.max(luminance1, luminance2);
  const darker = Math.min(luminance1, luminance2);
  
  return (lighter + 0.05) / (darker + 0.05);
};

// Spacing utility
export const getSpacing = (size: keyof typeof SPACING): string | typeof SPACING[keyof typeof SPACING] => {
  return SPACING[size];
};

// Typography utility
export const getTypography = (size: keyof typeof TYPOGRAPHY.fontSize) => {
  return TYPOGRAPHY.fontSize[size];
};

// Responsive breakpoint utility
export const getBreakpoint = (size: keyof typeof BREAKPOINTS): string => {
  return BREAKPOINTS[size];
};

// ============================================================================
// EXPORT ALL TOKENS
// ============================================================================
export const DESIGN_SYSTEM = {
  SPACING,
  TYPOGRAPHY,
  COLORS,
  BORDER_RADIUS,
  SHADOWS,
  ANIMATIONS,
  BREAKPOINTS,
  Z_INDEX,
  ACCESSIBILITY,
  COMPONENTS,
} as const;

export default DESIGN_SYSTEM;
