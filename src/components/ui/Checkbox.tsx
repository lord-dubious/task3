import React from 'react';
import * as CheckboxPrimitive from '@radix-ui/react-checkbox';
import { Check } from 'lucide-react';

const Checkbox = React.forwardRef<
  React.ElementRef<typeof CheckboxPrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof CheckboxPrimitive.Root>
>(({ className, ...props }, ref) => (
  <CheckboxPrimitive.Root
    ref={ref}
    className={`
      peer h-4 w-4 shrink-0 rounded-sm border border-gray-600 bg-gray-800 ring-offset-background 
      focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-purple-500 
      focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 
      data-[state=checked]:bg-purple-600 data-[state=checked]:border-purple-600 
      data-[state=checked]:text-white hover:border-purple-500 transition-colors ${className}
    `}
    {...props}
  >
    <CheckboxPrimitive.Indicator className="flex items-center justify-center text-current">
      <Check className="h-3 w-3" />
    </CheckboxPrimitive.Indicator>
  </CheckboxPrimitive.Root>
));
Checkbox.displayName = CheckboxPrimitive.Root.displayName;

export { Checkbox };