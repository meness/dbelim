import { forwardRef, HTMLAttributes } from 'react';
import { twMerge } from 'tailwind-merge';

export const CardHeader = forwardRef<HTMLDivElement, HTMLAttributes<HTMLDivElement>>(({ className, ...props }, ref) => (
  <div
    className={twMerge('flex flex-col space-y-1.5 p-6', className)}
    {...props}
    ref={ref}
  />
));
CardHeader.displayName = 'CardHeader';
