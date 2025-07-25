import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown } from 'lucide-react';

interface DropdownItem {
  label: string;
  value: string;
  icon?: React.ReactNode;
  disabled?: boolean;
  onClick?: () => void;
}

interface DropdownProps {
  trigger: React.ReactNode;
  items: DropdownItem[];
  onSelect?: (item: DropdownItem) => void;
  position?: 'left' | 'right';
  className?: string;
  disabled?: boolean;
}

export function Dropdown({
  trigger,
  items,
  onSelect,
  position = 'left',
  className = '',
  disabled = false
}: DropdownProps) {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleItemClick = (item: DropdownItem) => {
    if (item.disabled) return;
    
    if (item.onClick) {
      item.onClick();
    }
    
    if (onSelect) {
      onSelect(item);
    }
    
    setIsOpen(false);
  };

  const positionClasses = {
    left: 'left-0',
    right: 'right-0'
  };

  return (
    <div className={`relative ${className}`} ref={dropdownRef}>
      <div
        onClick={() => !disabled && setIsOpen(!isOpen)}
        className={`cursor-pointer ${disabled ? 'opacity-50 cursor-not-allowed' : ''}`}
      >
        {trigger}
      </div>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -10, scale: 0.95 }}
            transition={{ duration: 0.15 }}
            className={`
              absolute top-full mt-2 min-w-48 bg-gray-900 border border-gray-700 
              rounded-xl shadow-2xl z-dropdown overflow-hidden ${positionClasses[position]}
            `}
          >
            <div className="py-2">
              {items.map((item) => (
                <button
                  key={item.value}
                  onClick={() => handleItemClick(item)}
                  disabled={item.disabled}
                  className={`
                    w-full px-4 py-2 text-left flex items-center space-x-3 transition-colors
                    ${item.disabled 
                      ? 'text-gray-500 cursor-not-allowed' 
                      : 'text-gray-300 hover:text-white hover:bg-gray-800'
                    }
                  `}
                >
                  {item.icon && (
                    <span className="flex-shrink-0">{item.icon}</span>
                  )}
                  <span className="flex-1">{item.label}</span>
                </button>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
```