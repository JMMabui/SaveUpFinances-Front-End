import { twMerge } from 'tailwind-merge';

interface ParagraphProps {
  children: React.ReactNode;
  size?: 'sm' | 'md' | 'lg';
  weight?: 'normal' | 'medium' | 'semibold';
  className?: string;
}

export const Paragraph = ({
  children,
  size = 'md',
  weight = 'normal',
  className,
}: ParagraphProps) => {
  const sizeClasses = {
    sm: 'text-sm',
    md: 'text-base',
    lg: 'text-lg',
  };

  const weightClasses = {
    normal: 'font-normal',
    medium: 'font-medium',
    semibold: 'font-semibold',
  };

  return (
    <p
      className={twMerge(
        'text-gray-700 leading-relaxed',
        sizeClasses[size],
        weightClasses[weight],
        className
      )}
    >
      {children}
    </p>
  );
}; 