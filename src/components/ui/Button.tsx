import React from 'react';
import { motion } from 'framer-motion';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'filled' | 'outlined' | 'text' | 'elevated' | 'tonal' | 'danger';
  size?: 'sm' | 'md' | 'lg';
  isLoading?: boolean;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
}

export function Button({
  children,
  variant = 'filled',
  size = 'md',
  isLoading = false,
  leftIcon,
  rightIcon,
  className = '',
  disabled,
  ...props
}: ButtonProps) {
  const baseClasses = 'inline-flex items-center justify-center font-medium transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-md3-background disabled:opacity-50 disabled:cursor-not-allowed state-layer ripple';
  
  const variants = {
    filled: 'bg-md3-primary text-md3-on-primary hover:shadow-elevation-1 focus:ring-md3-primary/50 rounded-full shadow-elevation-0',
    outlined: 'bg-transparent text-md3-primary border border-md3-outline hover:bg-md3-primary/8 focus:ring-md3-primary/50 rounded-full',
    text: 'bg-transparent text-md3-primary hover:bg-md3-primary/8 focus:ring-md3-primary/50 rounded-full',
    elevated: 'bg-md3-surface-container-low text-md3-primary shadow-elevation-1 hover:shadow-elevation-2 focus:ring-md3-primary/50 rounded-full',
    tonal: 'bg-md3-primary-container text-md3-on-primary-container hover:shadow-elevation-1 focus:ring-md3-primary/50 rounded-full',
    danger: 'bg-md3-error text-md3-on-error hover:shadow-elevation-1 focus:ring-md3-error/50 rounded-full shadow-elevation-0',
  };

  const sizes = {
    sm: 'px-4 py-2 text-label-medium min-h-[32px]',
    md: 'px-6 py-3 text-label-large min-h-[40px]',
    lg: 'px-8 py-4 text-label-large min-h-[48px]',
  };

  return (
    <motion.button
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      className={`${baseClasses} ${variants[variant]} ${sizes[size]} ${className}`}
      disabled={disabled || isLoading}
      {...props}
    >
      {isLoading && (
        <div className="w-4 h-4 mr-2 border-2 border-current border-t-transparent rounded-full animate-spin" />
      )}
      {!isLoading && leftIcon && <span className="mr-2">{leftIcon}</span>}
      <span className="md3-label-large">{children}</span>
      {!isLoading && rightIcon && <span className="ml-2">{rightIcon}</span>}
    </motion.button>
  );
}