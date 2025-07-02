import React from 'react';

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
  variant?: 'filled' | 'outlined';
}

// Declare Material Web components for TypeScript
declare global {
  namespace JSX {
    interface IntrinsicElements {
      'md-filled-text-field': any;
      'md-outlined-text-field': any;
    }
  }
}

export function Input({
  label,
  error,
  leftIcon,
  rightIcon,
  variant = 'outlined',
  className = '',
  ...props
}: InputProps) {
  const Component = variant === 'filled' ? 'md-filled-text-field' : 'md-outlined-text-field';

  return (
    <div className={`w-full ${className}`}>
      <div className="relative">
        {leftIcon && (
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-gray-400 z-10">
            {leftIcon}
          </div>
        )}
        
        <Component
          label={label}
          error={!!error}
          error-text={error}
          className={`
            w-full min-h-[56px] transition-colors duration-200
            ${leftIcon ? 'pl-10' : ''}
            ${rightIcon ? 'pr-10' : ''}
            ${error ? 'error' : ''}
          `}
          style={{
            '--md-filled-text-field-container-color': 'rgb(38, 38, 38)',
            '--md-filled-text-field-label-text-color': 'rgb(156, 163, 175)',
            '--md-filled-text-field-input-text-color': 'rgb(255, 255, 255)',
            '--md-filled-text-field-active-indicator-color': 'rgb(168, 85, 247)',
            '--md-filled-text-field-focus-active-indicator-color': 'rgb(168, 85, 247)',
            '--md-filled-text-field-hover-active-indicator-color': 'rgb(168, 85, 247)',
            '--md-outlined-text-field-outline-color': 'rgb(75, 85, 99)',
            '--md-outlined-text-field-focus-outline-color': 'rgb(168, 85, 247)',
            '--md-outlined-text-field-hover-outline-color': 'rgb(168, 85, 247)',
            '--md-outlined-text-field-label-text-color': 'rgb(156, 163, 175)',
            '--md-outlined-text-field-input-text-color': 'rgb(255, 255, 255)',
            '--md-outlined-text-field-container-color': 'transparent',
          }}
          {...props}
        />
        
        {rightIcon && (
          <div className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 z-10">
            {rightIcon}
          </div>
        )}
      </div>
    </div>
  );
}