import { twMerge } from 'tailwind-merge';

interface AvatarProps {
  src?: string;
  alt?: string;
  size?: 'sm' | 'md' | 'lg';
  className?: string;
}

export const Avatar = ({ src, alt = '', size = 'md', className }: AvatarProps) => {
  const sizeClasses = {
    sm: 'w-8 h-8 text-sm',
    md: 'w-12 h-12 text-base',
    lg: 'w-16 h-16 text-lg',
  };

  const getInitials = (name: string) => {
    return name
      .split(' ')
      .map((n) => n[0])
      .join('')
      .toUpperCase();
  };

  if (!src) {
    return (
      <div
        className={twMerge(
          'flex items-center justify-center rounded-full bg-gray-200 text-gray-600 font-medium',
          sizeClasses[size],
          className
        )}
      >
        {alt ? getInitials(alt) : '?'}
      </div>
    );
  }

  return (
    <img
      src={src}
      alt={alt}
      className={twMerge('rounded-full object-cover', sizeClasses[size], className)}
    />
  );
}; 