import { forwardRef, HTMLAttributes } from 'react';
import { twMerge } from 'tailwind-merge';

export const CardTitle = forwardRef<HTMLParagraphElement, HTMLAttributes<HTMLParagraphElement>>(
  ({ className, ...props }, ref) => (
    <p
      className={twMerge('text-lg font-semibold leading-none tracking-tight', className)}
      {...props}
      ref={ref}
    />
  )
);
CardTitle.displayName = 'CardTitle';
