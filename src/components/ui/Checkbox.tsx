import React from 'react';

interface CheckboxProps {
  checked?: boolean;
  onCheckedChange?: (checked: boolean) => void;
  disabled?: boolean;
  id?: string;
  className?: string;
}

// Declare Material Web components for TypeScript
declare global {
  namespace JSX {
    interface IntrinsicElements {
      'md-checkbox': any;
    }
  }
}

export function Checkbox({
  checked = false,
  onCheckedChange,
  disabled = false,
  id,
  className = '',
}: CheckboxProps) {
  const handleChange = (event: Event) => {
    const target = event.target as any;
    if (onCheckedChange) {
      onCheckedChange(target.checked);
    }
  };

  return (
    <md-checkbox
      id={id}
      checked={checked}
      disabled={disabled}
      className={`transition-colors duration-200 ${className}`}
      style={{
        '--md-checkbox-selected-container-color': 'rgb(168, 85, 247)',
        '--md-checkbox-selected-hover-container-color': 'rgb(147, 51, 234)',
        '--md-checkbox-selected-pressed-container-color': 'rgb(126, 34, 206)',
        '--md-checkbox-selected-focus-container-color': 'rgb(168, 85, 247)',
        '--md-checkbox-selected-icon-color': 'rgb(255, 255, 255)',
        '--md-checkbox-unselected-outline-color': 'rgb(156, 163, 175)',
        '--md-checkbox-unselected-hover-outline-color': 'rgb(168, 85, 247)',
        '--md-checkbox-unselected-pressed-outline-color': 'rgb(147, 51, 234)',
        '--md-checkbox-unselected-focus-outline-color': 'rgb(168, 85, 247)',
      }}
      onChange={handleChange}
    />
  );
}