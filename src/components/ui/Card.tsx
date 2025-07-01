import React from 'react';
import { motion } from 'framer-motion';

interface CardProps {
  children: React.ReactNode;
  className?: string;
  hover?: boolean;
  onClick?: () => void;
}

export function Card({ children, className = '', hover = false, onClick }: CardProps) {
  const Component = onClick ? motion.div : 'div';
  
  return (
    <Component
      className={`
        bg-gray-900/50 backdrop-blur-sm border border-gray-700 rounded-xl p-3 sm:p-4 lg:p-6
        card-responsive
        ${hover ? 'hover:bg-gray-800/50 hover:border-purple-500/50 transition-all duration-300 cursor-pointer' : ''}
        ${className}
      `}
      onClick={onClick}
      {...(onClick && {
        whileHover: { scale: 1.02, y: -2 },
        whileTap: { scale: 0.98 }
      })}
    >
      {children}
    </Component>
  );
}