import React from 'react';
import { motion } from 'framer-motion';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'ghost' | 'danger';
  size?: 'sm' | 'md' | 'lg';
  isLoading?: boolean;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
}

// Declare Material Web components for TypeScript
declare global {
  namespace JSX {
    interface IntrinsicElements {
      'md-filled-button': any;
      'md-outlined-button': any;
      'md-text-button': any;
      'md-icon-button': any;
    }
  }
}

export function Button({
  children,
  variant = 'primary',
  size = 'md',
  isLoading = false,
  leftIcon,
  rightIcon,
  className = '',
  disabled,
  onClick,
  ...props
}: ButtonProps) {
  const sizeClasses = {
    sm: 'text-sm min-h-[36px] px-3',
    md: 'text-sm min-h-[40px] px-4',
    lg: 'text-base min-h-[44px] px-6',
  };

  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    if (onClick && !disabled && !isLoading) {
      onClick(e);
    }
  };

  // For Material Web components, we'll use a wrapper approach
  const buttonContent = (
    <>
      {isLoading && (
        <div className="w-4 h-4 mr-2 border-2 border-current border-t-transparent rounded-full animate-spin" />
      )}
      {!isLoading && leftIcon && <span className="mr-2">{leftIcon}</span>}
      {children}
      {!isLoading && rightIcon && <span className="ml-2">{rightIcon}</span>}
    </>
  );

  // Use Material Web components based on variant
  if (variant === 'primary') {
    return (
      <motion.div
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        className={className}
      >
        <md-filled-button
          disabled={disabled || isLoading}
          onClick={handleClick}
          className={`${sizeClasses[size]} transition-all duration-200`}
          {...props}
        >
          {buttonContent}
        </md-filled-button>
      </motion.div>
    );
  }

  if (variant === 'secondary') {
    return (
      <motion.div
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        className={className}
      >
        <md-outlined-button
          disabled={disabled || isLoading}
          onClick={handleClick}
          className={`${sizeClasses[size]} transition-all duration-200`}
          {...props}
        >
          {buttonContent}
        </md-outlined-button>
      </motion.div>
    );
  }

  if (variant === 'ghost') {
    return (
      <motion.div
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        className={className}
      >
        <md-text-button
          disabled={disabled || isLoading}
          onClick={handleClick}
          className={`${sizeClasses[size]} transition-all duration-200`}
          {...props}
        >
          {buttonContent}
        </md-text-button>
      </motion.div>
    );
  }

  // Fallback to custom styled button for danger variant
  const baseClasses = 'inline-flex items-center justify-center font-medium rounded-lg transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-dark-950 disabled:opacity-50 disabled:cursor-not-allowed';
  
  const variantClasses = {
    danger: 'bg-red-600 hover:bg-red-700 text-white focus:ring-red-500',
  };

  return (
    <motion.button
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      className={`${baseClasses} ${variantClasses.danger} ${sizeClasses[size]} ${className}`}
      disabled={disabled || isLoading}
      onClick={handleClick}
      {...props}
    >
      {buttonContent}
    </motion.button>
  );
}