import React from 'react';
import { ArrowPathIcon } from '@heroicons/react/24/outline';

interface LoadingSpinnerProps {
  size?: 'sm' | 'md' | 'lg';
  text?: string;
  className?: string;
}

export const LoadingSpinner: React.FC<LoadingSpinnerProps> = ({ 
  size = 'md', 
  text = 'Завантаження...', 
  className = '' 
}) => {
  const sizeClasses = {
    sm: 'w-4 h-4',
    md: 'w-8 h-8',
    lg: 'w-12 h-12'
  };

  return (
    <div className={`flex flex-col items-center justify-center ${className}`}>
      <div className={`ds-spinner ${sizeClasses[size]} mb-2`}></div>
      {text && <p className="text-gray-600 dark:text-gray-400 text-sm">{text}</p>}
    </div>
  );
};

interface ErrorStateProps {
  title?: string;
  message?: string;
  onRetry?: () => void;
  className?: string;
}

export const ErrorState: React.FC<ErrorStateProps> = ({ 
  title = 'Помилка завантаження',
  message = 'Сталася неочікувана помилка',
  onRetry,
  className = ''
}) => {
  return (
    <div className={`ds-card ds-card-body text-center max-w-md mx-auto dark:bg-gray-800 dark:border-gray-700 ${className}`}>
      <ArrowPathIcon className="w-16 h-16 text-red-500 dark:text-red-400 mx-auto mb-4" />
      <h2 className="ds-text-2xl ds-font-bold ds-text-gray-900 dark:ds-text-gray-100 mb-2">{title}</h2>
      <p className="ds-text-gray-600 dark:ds-text-gray-400 mb-6">{message}</p>
      {onRetry && (
        <button
          onClick={onRetry}
          className="ds-btn ds-btn-primary"
        >
          <ArrowPathIcon className="w-5 h-5" />
          Спробувати знову
        </button>
      )}
    </div>
  );
};

interface EmptyStateProps {
  title?: string;
  message?: string;
  icon?: React.ComponentType<React.ComponentProps<'svg'>>;
  action?: {
    label: string;
    onClick: () => void;
  };
  className?: string;
}

export const EmptyState: React.FC<EmptyStateProps> = ({ 
  title = 'Немає даних',
  message = 'Поки що немає інформації для відображення',
  icon: Icon,
  action,
  className = ''
}) => {
  return (
    <div className={`ds-card ds-card-body text-center max-w-md mx-auto dark:bg-gray-800 dark:border-gray-700 ${className}`}>
      {Icon && <Icon className="w-16 h-16 text-gray-400 dark:text-gray-500 mx-auto mb-4" />}
      <h2 className="ds-text-xl ds-font-semibold ds-text-gray-900 dark:ds-text-gray-100 mb-2">{title}</h2>
      <p className="ds-text-gray-600 dark:ds-text-gray-400 mb-6">{message}</p>
      {action && (
        <button
          onClick={action.onClick}
          className="ds-btn ds-btn-primary"
        >
          {action.label}
        </button>
      )}
    </div>
  );
};
