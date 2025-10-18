'use client';

import React from 'react';

export interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  className?: string;
  hover?: boolean;
  shadow?: 'xs' | 'sm' | 'md' | 'lg' | 'xl' | '2xl';
}

export interface CardHeaderProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  className?: string;
}

export interface CardBodyProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  className?: string;
}

export interface CardFooterProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  className?: string;
}

export interface CardTitleProps extends React.HTMLAttributes<HTMLHeadingElement> {
  children: React.ReactNode;
  className?: string;
  as?: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6';
}

export interface CardSubtitleProps extends React.HTMLAttributes<HTMLParagraphElement> {
  children: React.ReactNode;
  className?: string;
}

export interface CardTextProps extends React.HTMLAttributes<HTMLParagraphElement> {
  children: React.ReactNode;
  className?: string;
}

export const Card: React.FC<CardProps> = ({
  children,
  className = '',
  hover = true,
  shadow = 'sm',
  ...props
}) => {
  const baseClasses = 'ds-card';
  
  const shadowClasses = {
    xs: 'ds-shadow-xs',
    sm: 'ds-shadow-sm',
    md: 'ds-shadow-md',
    lg: 'ds-shadow-lg',
    xl: 'ds-shadow-xl',
    '2xl': 'ds-shadow-2xl'
  };

  const hoverClasses = hover ? 'ds-hover-lift' : '';

  const classes = [
    baseClasses,
    shadowClasses[shadow],
    hoverClasses,
    className
  ].filter(Boolean).join(' ');

  return (
    <div className={classes} {...props}>
      {children}
    </div>
  );
};

export const CardHeader: React.FC<CardHeaderProps> = ({
  children,
  className = '',
  ...props
}) => {
  return (
    <div className={`ds-card-header ${className}`} {...props}>
      {children}
    </div>
  );
};

export const CardBody: React.FC<CardBodyProps> = ({
  children,
  className = '',
  ...props
}) => {
  return (
    <div className={`ds-card-body ${className}`} {...props}>
      {children}
    </div>
  );
};

export const CardFooter: React.FC<CardFooterProps> = ({
  children,
  className = '',
  ...props
}) => {
  return (
    <div className={`ds-card-footer ${className}`} {...props}>
      {children}
    </div>
  );
};

export const CardTitle: React.FC<CardTitleProps> = ({
  children,
  className = '',
  as: Component = 'h3',
  ...props
}) => {
  return (
    <Component className={`ds-card-title ${className}`} {...props}>
      {children}
    </Component>
  );
};

export const CardSubtitle: React.FC<CardSubtitleProps> = ({
  children,
  className = '',
  ...props
}) => {
  return (
    <p className={`ds-card-subtitle ${className}`} {...props}>
      {children}
    </p>
  );
};

export const CardText: React.FC<CardTextProps> = ({
  children,
  className = '',
  ...props
}) => {
  return (
    <p className={`ds-card-text ${className}`} {...props}>
      {children}
    </p>
  );
};

export default Card;
