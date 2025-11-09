import React, { useState, useRef, useEffect, forwardRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Eye, EyeOff, CheckCircle, AlertCircle, Info } from 'lucide-react';

// Design Tokens - 8px Grid System
const SPACING = {
  xs: '4px',
  sm: '8px',
  md: '16px',
  lg: '24px',
  xl: '32px',
  '2xl': '48px',
  '3xl': '64px',
} as const;

const COLORS = {
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
  },
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
  },
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
  },
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
  },
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
  },
} as const;

// Validation Types
export type ValidationRule = {
  required?: boolean;
  minLength?: number;
  maxLength?: number;
  pattern?: RegExp;
  custom?: (value: string) => string | null;
};

export type ValidationState = {
  isValid: boolean;
  message: string;
  type: 'success' | 'error' | 'warning' | 'info';
};

// Form Field Props
export interface FormFieldProps {
  id: string;
  name: string;
  label: string;
  type?: 'text' | 'email' | 'password' | 'tel' | 'url' | 'number' | 'date' | 'time' | 'search';
  placeholder?: string;
  value: string;
  onChange: (value: string) => void;
  onBlur?: () => void;
  onFocus?: () => void;
  validation?: ValidationRule;
  validationState?: ValidationState;
  autoComplete?: string;
  disabled?: boolean;
  required?: boolean;
  helperText?: string;
  showPasswordToggle?: boolean;
  className?: string;
  nextFieldId?: string;
  prevFieldId?: string;
}

// Validation Functions
const validateField = (value: string, rules: ValidationRule): ValidationState => {
  if (rules.required && !value.trim()) {
    return {
      isValid: false,
      message: 'This field is required',
      type: 'error'
    };
  }

  if (value.trim() && rules.minLength && value.length < rules.minLength) {
    return {
      isValid: false,
      message: `Minimum ${rules.minLength} characters required`,
      type: 'error'
    };
  }

  if (rules.maxLength && value.length > rules.maxLength) {
    return {
      isValid: false,
      message: `Maximum ${rules.maxLength} characters allowed`,
      type: 'error'
    };
  }

  if (rules.pattern && !rules.pattern.test(value)) {
    return {
      isValid: false,
      message: 'Invalid format',
      type: 'error'
    };
  }

  if (rules.custom) {
    const customError = rules.custom(value);
    if (customError) {
      return {
        isValid: false,
        message: customError,
        type: 'error'
      };
    }
  }

  return {
    isValid: true,
    message: '',
    type: 'success'
  };
};

// Enhanced Form Field Component
export const FormField = forwardRef<HTMLInputElement, FormFieldProps>(({
  id,
  name,
  label,
  type = 'text',
  placeholder,
  value,
  onChange,
  onBlur,
  onFocus,
  validation,
  validationState,
  autoComplete,
  disabled = false,
  required = false,
  helperText,
  showPasswordToggle = false,
  className = '',
  nextFieldId,
  prevFieldId,
}, ref) => {
  const [isFocused, setIsFocused] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [localValidation, setLocalValidation] = useState<ValidationState | undefined>(validationState);
  const inputRef = useRef<HTMLInputElement>(null);

  // Handle keyboard navigation
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && nextFieldId) {
      e.preventDefault();
      const nextField = document.getElementById(nextFieldId);
      if (nextField) {
        nextField.focus();
      }
    } else if (e.key === 'Tab' && e.shiftKey && prevFieldId) {
      e.preventDefault();
      const prevField = document.getElementById(prevFieldId);
      if (prevField) {
        prevField.focus();
      }
    }
  };

  // Handle validation on blur
  const handleBlur = () => {
    if (validation) {
      const validationResult = validateField(value, validation);
      setLocalValidation(validationResult);
    }
    onBlur?.();
  };

  // Handle focus
  const handleFocus = () => {
    setIsFocused(true);
    onFocus?.();
  };

  // Handle input change
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target.value;
    onChange(newValue);
    
    // Real-time validation for certain fields
    if (validation && (type === 'email' || type === 'password' || type === 'tel')) {
      const validationResult = validateField(newValue, validation);
      setLocalValidation(validationResult);
    }
  };

  // Scroll field into view on mobile
  useEffect(() => {
    if (isFocused && inputRef.current) {
      const rect = inputRef.current.getBoundingClientRect();
      const isVisible = rect.top >= 0 && rect.bottom <= window.innerHeight;
      
      if (!isVisible) {
        inputRef.current.scrollIntoView({
          behavior: 'smooth',
          block: 'center'
        });
      }
    }
  }, [isFocused]);

  const currentValidation = validationState || localValidation;
  const inputType = type === 'password' && showPassword ? 'text' : type;

  return (
    <motion.div
      className={`space-y-2 ${className}`}
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.2 }}
    >
      <label
        htmlFor={id}
        className={`block text-sm font-medium transition-colors duration-200 ${
          currentValidation?.type === 'error' 
            ? 'text-red-700 dark:text-red-400' 
            : isFocused 
              ? 'text-blue-700 dark:text-blue-400' 
              : 'text-gray-700 dark:text-gray-300'
        }`}
      >
        {label}
        {required && <span className="text-red-500 ml-1">*</span>}
      </label>

      <div className="relative">
        <input
          ref={ref || inputRef}
          id={id}
          name={name}
          type={inputType}
          value={value}
          onChange={handleChange}
          onFocus={handleFocus}
          onBlur={handleBlur}
          onKeyDown={handleKeyDown}
          placeholder={placeholder}
          autoComplete={autoComplete}
          disabled={disabled}
          required={required}
          className={`
            block w-full px-4 py-3 text-base leading-6
            border rounded-lg transition-all duration-200
            focus:outline-none focus:ring-2 focus:ring-offset-0
            disabled:opacity-50 disabled:cursor-not-allowed
            ${isFocused ? 'ring-2 ring-blue-500 border-blue-500' : ''}
            ${currentValidation?.type === 'error' 
              ? 'border-red-300 focus:ring-red-500 focus:border-red-500' 
              : currentValidation?.type === 'success'
                ? 'border-green-300 focus:ring-green-500 focus:border-green-500'
                : 'border-gray-300 dark:border-gray-600 focus:ring-blue-500 focus:border-blue-500'
            }
            ${disabled ? 'bg-gray-50 dark:bg-gray-800' : 'bg-white dark:bg-gray-900'}
            text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400
          `}
          style={{
            paddingRight: showPasswordToggle ? '48px' : '16px'
          }}
        />

        {/* Password Toggle */}
        {showPasswordToggle && type === 'password' && (
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute right-3 top-1/2 transform -translate-y-1/2 p-1 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 transition-colors"
            aria-label={showPassword ? 'Hide password' : 'Show password'}
          >
            {showPassword ? (
              <EyeOff size={20} />
            ) : (
              <Eye size={20} />
            )}
          </button>
        )}

        {/* Validation Icon */}
        {currentValidation && (
          <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
            <AnimatePresence>
              {currentValidation.type === 'success' && (
                <motion.div
                  initial={{ scale: 0, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  exit={{ scale: 0, opacity: 0 }}
                  transition={{ duration: 0.2 }}
                >
                  <CheckCircle size={20} className="text-green-500" />
                </motion.div>
              )}
              {currentValidation.type === 'error' && (
                <motion.div
                  initial={{ scale: 0, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  exit={{ scale: 0, opacity: 0 }}
                  transition={{ duration: 0.2 }}
                >
                  <AlertCircle size={20} className="text-red-500" />
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        )}
      </div>

      {/* Helper Text and Validation Messages */}
      <AnimatePresence>
        {(helperText || currentValidation?.message) && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.2 }}
            className={`flex items-start space-x-2 text-sm ${
              currentValidation?.type === 'error' 
                ? 'text-red-600 dark:text-red-400' 
                : currentValidation?.type === 'success'
                  ? 'text-green-600 dark:text-green-400'
                  : 'text-gray-600 dark:text-gray-400'
            }`}
          >
            {currentValidation?.type === 'error' && <AlertCircle size={16} className="mt-0.5 flex-shrink-0" />}
            {currentValidation?.type === 'success' && <CheckCircle size={16} className="mt-0.5 flex-shrink-0" />}
            {!currentValidation && helperText && <Info size={16} className="mt-0.5 flex-shrink-0" />}
            <span>{currentValidation?.message || helperText}</span>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
});

FormField.displayName = 'FormField';

// Form Container Component
export interface FormContainerProps {
  children: React.ReactNode;
  onSubmit: (e: React.FormEvent) => void;
  className?: string;
  autoComplete?: string;
}

export const FormContainer: React.FC<FormContainerProps> = ({
  children,
  onSubmit,
  className = '',
  autoComplete = 'on'
}) => {
  return (
    <motion.form
      onSubmit={onSubmit}
      autoComplete={autoComplete}
      className={`space-y-6 ${className}`}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.3 }}
    >
      {children}
    </motion.form>
  );
};

// Form Button Component
export interface FormButtonProps {
  type?: 'submit' | 'button' | 'reset';
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
  disabled?: boolean;
  loading?: boolean;
  children: React.ReactNode;
  onClick?: () => void;
  className?: string;
  fullWidth?: boolean;
}

export const FormButton: React.FC<FormButtonProps> = ({
  type = 'button',
  variant = 'primary',
  size = 'md',
  disabled = false,
  loading = false,
  children,
  onClick,
  className = '',
  fullWidth = false
}) => {
  const baseClasses = `
    inline-flex items-center justify-center font-medium rounded-lg
    transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2
    disabled:opacity-50 disabled:cursor-not-allowed touch-manipulation
    ${fullWidth ? 'w-full' : ''}
  `;

  const variantClasses = {
    primary: 'bg-blue-600 text-white hover:bg-blue-700 focus:ring-blue-500',
    secondary: 'bg-gray-600 text-white hover:bg-gray-700 focus:ring-gray-500',
    outline: 'border border-gray-300 text-gray-700 hover:bg-gray-50 focus:ring-gray-500 dark:border-gray-600 dark:text-gray-300 dark:hover:bg-gray-800',
    ghost: 'text-gray-700 hover:bg-gray-100 focus:ring-gray-500 dark:text-gray-300 dark:hover:bg-gray-800'
  };

  const sizeClasses = {
    sm: 'px-3 py-2 text-sm',
    md: 'px-4 py-3 text-base',
    lg: 'px-6 py-4 text-lg'
  };

  return (
    <motion.button
      type={type}
      disabled={disabled || loading}
      onClick={onClick}
      className={`${baseClasses} ${variantClasses[variant]} ${sizeClasses[size]} ${className}`}
      whileHover={{ scale: disabled || loading ? 1 : 1.02 }}
      whileTap={{ scale: disabled || loading ? 1 : 0.98 }}
    >
      {loading && (
        <motion.div
          className="mr-2"
          animate={{ rotate: 360 }}
          transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
        >
          <div className="w-4 h-4 border-2 border-current border-t-transparent rounded-full" />
        </motion.div>
      )}
      {children}
    </motion.button>
  );
};

// Form Section Component
export interface FormSectionProps {
  title?: string;
  description?: string;
  children: React.ReactNode;
  className?: string;
}

export const FormSection: React.FC<FormSectionProps> = ({
  title,
  description,
  children,
  className = ''
}) => {
  return (
    <motion.div
      className={`space-y-6 p-6 bg-white dark:bg-gray-900 rounded-xl border border-gray-200 dark:border-gray-700 ${className}`}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      {(title || description) && (
        <div className="space-y-2">
          {title && (
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
              {title}
            </h3>
          )}
          {description && (
            <p className="text-sm text-gray-600 dark:text-gray-400">
              {description}
            </p>
          )}
        </div>
      )}
      <div className="space-y-4">
        {children}
      </div>
    </motion.div>
  );
};

// Form Progress Component
export interface FormProgressProps {
  currentStep: number;
  totalSteps: number;
  steps: string[];
  className?: string;
}

export const FormProgress: React.FC<FormProgressProps> = ({
  currentStep,
  totalSteps,
  steps,
  className = ''
}) => {
  const progress = ((currentStep + 1) / totalSteps) * 100;

  return (
    <div className={`space-y-4 ${className}`}>
      <div className="flex justify-between items-center">
        <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
          Step {currentStep + 1} of {totalSteps}
        </span>
        <span className="text-sm text-gray-500 dark:text-gray-400">
          {Math.round(progress)}% complete
        </span>
      </div>
      
      <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
        <motion.div
          className="bg-blue-600 h-2 rounded-full"
          initial={{ width: 0 }}
          animate={{ width: `${progress}%` }}
          transition={{ duration: 0.5, ease: 'easeOut' }}
        />
      </div>

      <div className="flex justify-between">
        {steps.map((step, index) => (
          <div
            key={index}
            className={`flex flex-col items-center space-y-2 ${
              index <= currentStep ? 'text-blue-600 dark:text-blue-400' : 'text-gray-400 dark:text-gray-500'
            }`}
          >
            <div
              className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium transition-colors ${
                index <= currentStep
                  ? 'bg-blue-600 text-white'
                  : 'bg-gray-200 dark:bg-gray-700 text-gray-400 dark:text-gray-500'
              }`}
            >
              {index + 1}
            </div>
            <span className="text-xs text-center max-w-16">{step}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

// Export validation helpers
export const validationRules = {
  email: {
    required: true,
    pattern: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
    custom: (value: string) => {
      if (!value.includes('@')) return 'Please enter a valid email address';
      if (!value.includes('.')) return 'Please enter a valid email address';
      return null;
    }
  },
  password: {
    required: true,
    minLength: 8,
    custom: (value: string) => {
      if (value.length < 8) return 'Password must be at least 8 characters';
      if (!/(?=.*[a-z])/.test(value)) return 'Password must contain at least one lowercase letter';
      if (!/(?=.*[A-Z])/.test(value)) return 'Password must contain at least one uppercase letter';
      if (!/(?=.*\d)/.test(value)) return 'Password must contain at least one number';
      return null;
    }
  },
  phone: {
    pattern: /^[+]?[1-9][\d]{0,15}$/,
    custom: (value: string) => {
      const cleaned = value.replace(/\D/g, '');
      if (cleaned.length < 10) return 'Please enter a valid phone number';
      return null;
    }
  },
  name: {
    required: true,
    minLength: 2,
    maxLength: 50
  }
};

export { SPACING, COLORS };
