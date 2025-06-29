import React from 'react';

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
  variant?: 'filled' | 'outlined';
}

export function Input({
  label,
  error,
  leftIcon,
  rightIcon,
  variant = 'filled',
  className = '',
  ...props
}: InputProps) {
  const variants = {
    filled: `
      bg-md3-surface-container rounded-t-md border-b-2 border-md3-outline
      focus:border-md3-primary focus:bg-md3-surface-container-high
      hover:bg-md3-surface-container-high
    `,
    outlined: `
      bg-transparent border border-md3-outline rounded-md
      focus:border-2 focus:border-md3-primary
      hover:border-md3-on-surface
    `,
  };

  return (
    <div className="w-full">
      {label && (
        <label className="block text-body-small font-medium text-md3-on-surface-variant mb-2">
          {label}
        </label>
      )}
      <div className="relative">
        {leftIcon && (
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-md3-on-surface-variant">
            {leftIcon}
          </div>
        )}
        <input
          className={`
            block w-full px-4 py-3 text-md3-on-surface placeholder-md3-on-surface-variant
            transition-all duration-200 focus:outline-none text-body-large
            ${variants[variant]}
            ${leftIcon ? 'pl-10' : ''}
            ${rightIcon ? 'pr-10' : ''}
            ${error ? 'border-md3-error focus:border-md3-error' : ''}
            ${className}
          `}
          {...props}
        />
        {rightIcon && (
          <div className="absolute inset-y-0 right-0 pr-3 flex items-center text-md3-on-surface-variant">
            {rightIcon}
          </div>
        )}
      </div>
      {error && (
        <p className="mt-1 text-body-small text-md3-error">{error}</p>
      )}
    </div>
  );
}