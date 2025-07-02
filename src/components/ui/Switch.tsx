import React from 'react';

interface SwitchProps {
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
      'md-switch': any;
    }
  }
}

export function Switch({
  checked = false,
  onCheckedChange,
  disabled = false,
  id,
  className = '',
}: SwitchProps) {
  const handleChange = (event: Event) => {
    const target = event.target as any;
    if (onCheckedChange) {
      onCheckedChange(target.selected);
    }
  };

  return (
    <md-switch
      id={id}
      selected={checked}
      disabled={disabled}
      className={`transition-colors duration-200 ${className}`}
      style={{
        '--md-switch-selected-track-color': 'rgb(168, 85, 247)',
        '--md-switch-selected-hover-track-color': 'rgb(147, 51, 234)',
        '--md-switch-selected-pressed-track-color': 'rgb(126, 34, 206)',
        '--md-switch-selected-focus-track-color': 'rgb(168, 85, 247)',
        '--md-switch-selected-handle-color': 'rgb(255, 255, 255)',
        '--md-switch-unselected-track-color': 'rgb(75, 85, 99)',
        '--md-switch-unselected-hover-track-color': 'rgb(107, 114, 128)',
        '--md-switch-unselected-pressed-track-color': 'rgb(55, 65, 81)',
        '--md-switch-unselected-focus-track-color': 'rgb(107, 114, 128)',
        '--md-switch-unselected-handle-color': 'rgb(156, 163, 175)',
        '--md-switch-disabled-selected-track-color': 'rgb(55, 65, 81)',
        '--md-switch-disabled-unselected-track-color': 'rgb(31, 41, 55)',
        '--md-switch-disabled-selected-handle-color': 'rgb(107, 114, 128)',
        '--md-switch-disabled-unselected-handle-color': 'rgb(75, 85, 99)',
      }}
      onChange={handleChange}
    />
  );
}