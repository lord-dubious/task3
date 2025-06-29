import React from 'react';
import { motion } from 'framer-motion';

interface CardProps {
  children: React.ReactNode;
  className?: string;
  variant?: 'elevated' | 'filled' | 'outlined';
  hover?: boolean;
  onClick?: () => void;
}

export function Card({ 
  children, 
  className = '', 
  variant = 'elevated',
  hover = false, 
  onClick 
}: CardProps) {
  const Component = onClick ? motion.div : 'div';
  
  const variants = {
    elevated: 'bg-md3-surface-container shadow-elevation-1 hover:shadow-elevation-2',
    filled: 'bg-md3-surface-container-highest',
    outlined: 'bg-md3-surface border border-md3-outline-variant',
  };
  
  const baseClasses = `
    rounded-xl p-6 transition-all duration-300 state-layer
    ${variants[variant]}
    ${hover ? 'hover:shadow-elevation-3 cursor-pointer' : ''}
    ${onClick ? 'cursor-pointer' : ''}
    ${className}
  `;
  
  return (
    <Component
      className={baseClasses}
      onClick={onClick}
      {...(onClick && {
        whileHover: { scale: 1.01, y: -2 },
        whileTap: { scale: 0.99 },
        initial: { opacity: 0, y: 20 },
        animate: { opacity: 1, y: 0 },
        transition: { duration: 0.2 }
      })}
    >
      {children}
    </Component>
  );
}