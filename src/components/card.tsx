import { forwardRef, HTMLAttributes } from 'react';
import { twMerge } from 'tailwind-merge';

export const Card = forwardRef<HTMLDivElement, HTMLAttributes<HTMLDivElement>>(({ className, ...props }, ref) => (
  <div
    className={twMerge('rounded-lg border bg-card text-card-foreground shadow-sm', className)}
    {...props}
    ref={ref}
  />
));
Card.displayName = 'Card';
