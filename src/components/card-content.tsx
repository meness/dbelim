import { forwardRef, HTMLAttributes } from 'react';
import { twMerge } from 'tailwind-merge';

export const CardContent = forwardRef<HTMLDivElement, HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => (
    <div
      className={twMerge('p-6 pt-0', className)}
      {...props}
      ref={ref}
    />
  )
);
CardContent.displayName = 'CardContent';
