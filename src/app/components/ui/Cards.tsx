import React, { ComponentType } from 'react';

interface StatCardProps {
  title: string;
  value: string | number;
  icon: ComponentType<React.ComponentProps<'svg'>>;
  color: string;
  bgColor: string;
  description?: string;
  trend?: {
    value: number;
    isPositive: boolean;
  };
  className?: string;
}

export const StatCard: React.FC<StatCardProps> = ({
  title,
  value,
  icon: Icon,
  color,
  bgColor,
  description,
  trend,
  className = ''
}) => {
  return (
    <div className={`ds-card ds-card-body ds-hover-lift ds-transition ${className}`}>
      <div className="flex items-center">
        <div className={`p-3 rounded-lg ${bgColor}`}>
          <Icon className={`w-6 h-6 ${color}`} />
        </div>
        <div className="ml-4 flex-1">
          <p className="ds-text-sm ds-text-gray-600">{title}</p>
          <div className="flex items-center">
            <p className="ds-text-2xl ds-font-bold ds-text-gray-900">{value}</p>
            {trend && (
              <span className={`ml-2 text-xs px-2 py-1 rounded-full ${
                trend.isPositive 
                  ? 'bg-green-100 text-green-800' 
                  : 'bg-red-100 text-red-800'
              }`}>
                {trend.isPositive ? '+' : ''}{trend.value}%
              </span>
            )}
          </div>
        </div>
      </div>
      {description && (
        <p className="ds-text-xs ds-text-gray-500 mt-2">{description}</p>
      )}
    </div>
  );
};

interface QuickActionCardProps {
  title: string;
  description: string;
  icon: ComponentType<React.ComponentProps<'svg'>>;
  href: string;
  color: string;
  hoverColor: string;
  external?: boolean;
  className?: string;
}

export const QuickActionCard: React.FC<QuickActionCardProps> = ({
  title,
  description,
  icon: Icon,
  href,
  color,
  hoverColor,
  external = false,
  className = ''
}) => {
  const CardContent = () => (
    <div className="text-center">
      <div className={`w-16 h-16 ${color} ${hoverColor} rounded-xl flex items-center justify-center mx-auto mb-4 transition-transform duration-200`}>
        <Icon className="w-8 h-8 text-white" />
      </div>
      <h3 className="ds-text-lg ds-font-semibold ds-text-gray-900 mb-2">
        {title}
      </h3>
      <p className="ds-text-sm ds-text-gray-600">
        {description}
      </p>
    </div>
  );

  if (external) {
    return (
      <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        className={`ds-card ds-card-body ds-hover-lift ds-transition group block ${className}`}
      >
        <CardContent />
      </a>
    );
  }

  return (
    <a
      href={href}
      className={`ds-card ds-card-body ds-hover-lift ds-transition group block ${className}`}
    >
      <CardContent />
    </a>
  );
};

interface ActivityItemProps {
  type: 'category' | 'menu-item' | 'update';
  title: string;
  timeAgo: string;
  className?: string;
}

export const ActivityItem: React.FC<ActivityItemProps> = ({
  type,
  title,
  timeAgo,
  className = ''
}) => {
  const getIconAndColor = () => {
    switch (type) {
      case 'category':
        return {
          icon: '📁',
          bgColor: 'bg-blue-50',
          textColor: 'text-blue-600'
        };
      case 'menu-item':
        return {
          icon: '🍽️',
          bgColor: 'bg-green-50',
          textColor: 'text-green-600'
        };
      case 'update':
        return {
          icon: '✏️',
          bgColor: 'bg-orange-50',
          textColor: 'text-orange-600'
        };
      default:
        return {
          icon: '📝',
          bgColor: 'bg-gray-50',
          textColor: 'text-gray-600'
        };
    }
  };

  const { icon, bgColor, textColor } = getIconAndColor();

  return (
    <div className={`flex items-center p-4 ${bgColor} rounded-lg ${className}`}>
      <span className={`text-2xl mr-3 ${textColor}`}>{icon}</span>
      <div>
        <p className="ds-text-sm ds-font-medium ds-text-gray-900">
          {title}
        </p>
        <p className="ds-text-xs ds-text-gray-600">
          {timeAgo}
        </p>
      </div>
    </div>
  );
};
