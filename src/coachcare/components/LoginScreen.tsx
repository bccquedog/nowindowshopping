import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useAuth } from '../context';
import { UserRole } from '../types';
import { 
  FormField, 
  FormContainer, 
  FormButton, 
  FormSection,
  validationRules 
} from '../../components/FormComponents';

export const LoginScreen: React.FC = () => {
  const { login, register } = useAuth();
  const [isLogin, setIsLogin] = useState(true);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    role: 'client' as UserRole,
  });
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [validationStates, setValidationStates] = useState<Record<string, any>>({});
  const [rememberMe, setRememberMe] = useState(false);
  
  // Refs for keyboard navigation
  const emailRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);
  const nameRef = useRef<HTMLInputElement>(null);

  // Auto-focus email field on mount
  useEffect(() => {
    if (emailRef.current) {
      emailRef.current.focus();
    }
  }, []);

  // Handle form data changes
  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    setError(''); // Clear errors when user starts typing
    
    // Real-time validation for certain fields
    if (field === 'email' || field === 'password') {
      const rules = field === 'email' ? validationRules.email : validationRules.password;
      const validationResult = validateField(value, rules);
      setValidationStates(prev => ({
        ...prev,
        [field]: validationResult
      }));
    }
  };

  // Validation function
  const validateField = (value: string, rules: any) => {
    if (rules.required && !value.trim()) {
      return {
        isValid: false,
        message: 'This field is required',
        type: 'error'
      };
    }

    if (value.trim() && rules.pattern && !rules.pattern.test(value)) {
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

  // Handle form submission
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');

    try {
      // Ensure role is always 'client' for new registrations
      const submissionData = isLogin ? formData : { ...formData, role: 'client' as UserRole };
      
      console.log('Attempting authentication with:', { 
        email: submissionData.email, 
        password: '***',
        isLogin,
        role: submissionData.role 
      });
      
      let success = false;
      
      if (isLogin) {
        success = await login(submissionData.email, submissionData.password);
        console.log('Login result:', success);
      } else {
        success = await register(submissionData);
        console.log('Register result:', success);
      }

      if (!success) {
        setError(isLogin ? 'Invalid email or password' : 'Registration failed. Please try again.');
        console.log('Authentication failed');
      } else {
        console.log('Authentication successful');
        // Save remember me preference
        if (rememberMe) {
          localStorage.setItem('rememberMe', 'true');
        }
      }
    } catch (error) {
      console.error('Authentication error:', error);
      setError('An error occurred. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };



  // Toggle between login and register
  const toggleMode = () => {
    setIsLogin(!isLogin);
    setError('');
    setValidationStates({});
    setFormData({
      name: '',
      email: '',
      password: '',
      role: 'client',
    });
    
    // Focus appropriate field after toggle
    setTimeout(() => {
      if (!isLogin && nameRef.current) {
        nameRef.current.focus();
      } else if (emailRef.current) {
        emailRef.current.focus();
      }
    }, 100);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-blue-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 flex items-center justify-center py-6 px-4 sm:py-12 sm:px-6 lg:px-8">
      <motion.div 
        className="max-w-md w-full space-y-8"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        {/* Header */}
        <div className="text-center">
          <motion.div 
            className="mx-auto h-16 w-16 bg-gradient-to-br from-blue-600 to-blue-700 rounded-2xl flex items-center justify-center shadow-lg"
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.2, type: 'spring', stiffness: 200 }}
          >
            <span className="text-white text-2xl font-bold">CC</span>
          </motion.div>
          
          <motion.h2 
            className="mt-6 text-3xl font-bold text-gray-900 dark:text-white"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
          >
            {isLogin ? 'Welcome back' : 'Create your account'}
          </motion.h2>
          
          <motion.p 
            className="mt-2 text-sm text-gray-600 dark:text-gray-400"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
          >
            {isLogin ? 'Sign in to access your dashboard' : 'Join CoachCare to get started'}
          </motion.p>
        </div>

        {/* Form */}
        <FormContainer onSubmit={handleSubmit} autoComplete="on">
          <FormSection>
            <AnimatePresence mode="wait">
              {!isLogin && (
                <motion.div
                  key="name-field"
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  exit={{ opacity: 0, height: 0 }}
                  transition={{ duration: 0.3 }}
                >
                  <FormField
                    ref={nameRef}
                    id="name"
                    name="name"
                    label="Full Name"
                    type="text"
                    value={formData.name}
                    onChange={(value) => handleInputChange('name', value)}
                    validation={validationRules.name}
                    validationState={validationStates.name}
                    autoComplete="name"
                    required={!isLogin}
                    placeholder="Enter your full name"
                    nextFieldId="email"
                    helperText="We'll use this to personalize your experience"
                  />
                </motion.div>
              )}
            </AnimatePresence>

            <FormField
              ref={emailRef}
              id="email"
              name="email"
              label="Email Address"
              type="email"
              value={formData.email}
              onChange={(value) => handleInputChange('email', value)}
              validation={validationRules.email}
              validationState={validationStates.email}
              autoComplete="email"
              required
              placeholder="Enter your email address"
              nextFieldId="password"
              prevFieldId={!isLogin ? "name" : undefined}
            />

            {/* Role is automatically set to 'client' for new registrations */}
            {!isLogin && (
              <motion.div
                key="role-info"
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ duration: 0.3 }}
              >
                <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-700 rounded-lg p-4">
                  <div className="flex">
                    <div className="flex-shrink-0">
                      <svg className="h-5 w-5 text-blue-400" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
                      </svg>
                    </div>
                    <div className="ml-3">
                      <p className="text-sm text-blue-800 dark:text-blue-200">
                        <strong>Client Registration:</strong> You're registering as a client seeking coaching services. 
                        Coach and administrator accounts are managed separately.
                      </p>
                    </div>
                  </div>
                </div>
              </motion.div>
            )}

            <FormField
              ref={passwordRef}
              id="password"
              name="password"
              label="Password"
              type="password"
              value={formData.password}
              onChange={(value) => handleInputChange('password', value)}
              validation={validationRules.password}
              validationState={validationStates.password}
              autoComplete={isLogin ? "current-password" : "new-password"}
              required
              placeholder="Enter your password"
              showPasswordToggle
              prevFieldId="email"
              helperText={!isLogin ? "Must be at least 8 characters with uppercase, lowercase, and number" : undefined}
            />

            {/* Remember Me & Forgot Password */}
            <div className="flex items-center justify-between">
              <label className="flex items-center">
                <input
                  type="checkbox"
                  checked={rememberMe}
                  onChange={(e) => setRememberMe(e.target.checked)}
                  className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                />
                <span className="ml-2 text-sm text-gray-700 dark:text-gray-300">
                  Remember me
                </span>
              </label>
              
              {isLogin && (
                <button
                  type="button"
                  className="text-sm text-blue-600 hover:text-blue-500 dark:text-blue-400 dark:hover:text-blue-300 transition-colors"
                >
                  Forgot password?
                </button>
              )}
            </div>

            {/* Error Message */}
            <AnimatePresence>
              {error && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  exit={{ opacity: 0, height: 0 }}
                  transition={{ duration: 0.2 }}
                  className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-700 rounded-lg p-4"
                >
                  <div className="flex">
                    <div className="flex-shrink-0">
                      <svg className="h-5 w-5 text-red-400" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                      </svg>
                    </div>
                    <div className="ml-3">
                      <p className="text-sm text-red-800 dark:text-red-200">{error}</p>
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Submit Button */}
            <FormButton
              type="submit"
              variant="primary"
              size="lg"
              disabled={isLoading}
              loading={isLoading}
              fullWidth
            >
              {isLogin ? 'Sign In' : 'Create Account'}
            </FormButton>
          </FormSection>
        </FormContainer>

        {/* Toggle Mode */}
        <motion.div 
          className="text-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
        >
          <p className="text-sm text-gray-600 dark:text-gray-400">
            {isLogin ? "Don't have an account?" : "Already have an account?"}{' '}
            <button
              type="button"
              onClick={toggleMode}
              className="font-medium text-blue-600 hover:text-blue-500 dark:text-blue-400 dark:hover:text-blue-300 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 rounded"
            >
              {isLogin ? 'Create one now' : 'Sign in here'}
            </button>
          </p>
        </motion.div>

        {/* Security Notice */}
        <motion.div 
          className="text-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6 }}
        >
          <p className="text-xs text-gray-500 dark:text-gray-400">
            Your data is protected with enterprise-grade security
          </p>
        </motion.div>
      </motion.div>
    </div>
  );
}; 