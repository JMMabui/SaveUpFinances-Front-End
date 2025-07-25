import { twMerge } from 'tailwind-merge';

interface CardProps {
  children: React.ReactNode;
  className?: string;
}

interface CardHeaderProps {
  children: React.ReactNode;
  className?: string;
}

interface CardBodyProps {
  children: React.ReactNode;
  className?: string;
}

interface CardFooterProps {
  children: React.ReactNode;
  className?: string;
}

export const Card = ({ children, className }: CardProps) => {
  return (
    <div className={twMerge('bg-white rounded-lg shadow-md overflow-hidden', className)}>
      {children}
    </div>
  );
};

Card.Header = ({ children, className }: CardHeaderProps) => {
  return (
    <div className={twMerge('px-6 py-4 border-b border-gray-200', className)}>
      {children}
    </div>
  );
};

Card.Body = ({ children, className }: CardBodyProps) => {
  return (
    <div className={twMerge('px-6 py-4', className)}>
      {children}
    </div>
  );
};

Card.Footer = ({ children, className }: CardFooterProps) => {
  return (
    <div className={twMerge('px-6 py-4 border-t border-gray-200 bg-gray-50', className)}>
      {children}
    </div>
  );
}; 