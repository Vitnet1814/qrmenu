'use client';

import React from 'react';

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'accent' | 'outline' | 'ghost' | 'success' | 'warning' | 'error';
  size?: 'sm' | 'md' | 'lg' | 'xl';
  children: React.ReactNode;
  className?: string;
  loading?: boolean;
  disabled?: boolean;
}

export const Button: React.FC<ButtonProps> = ({
  variant = 'primary',
  size = 'md',
  children,
  className = '',
  loading = false,
  disabled = false,
  ...props
}) => {
  const baseClasses = 'ds-btn ds-transition ds-hover-scale ds-hover-shadow ds-focus:ring';
  
  const variantClasses = {
    primary: 'ds-btn-primary',
    secondary: 'ds-btn-secondary',
    accent: 'ds-btn-accent',
    outline: 'ds-btn-outline',
    ghost: 'ds-btn-ghost',
    success: 'ds-btn-success',
    warning: 'ds-btn-warning',
    error: 'ds-btn-error'
  };

  const sizeClasses = {
    sm: 'ds-btn-sm',
    md: '',
    lg: 'ds-btn-lg',
    xl: 'ds-btn-xl'
  };

  const classes = [
    baseClasses,
    variantClasses[variant],
    sizeClasses[size],
    className
  ].filter(Boolean).join(' ');

  return (
    <button
      className={classes}
      disabled={disabled || loading}
      {...props}
    >
      {loading && (
        <div className="ds-spinner ds-mr-2" />
      )}
      {children}
    </button>
  );
};

export default Button;
