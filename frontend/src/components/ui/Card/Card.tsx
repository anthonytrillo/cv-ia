import type { HTMLAttributes } from 'react';
import { classNames } from '../../../utils/classNames';
import styles from './Card.module.css';

interface CardProps extends HTMLAttributes<HTMLDivElement> {
  variant?: 'default' | 'elevated' | 'outlined';
  padding?: 'sm' | 'md' | 'lg';
}

export const Card = ({
  variant = 'default',
  padding = 'md',
  className = '',
  children,
  ...props
}: CardProps) => {
  return (
    <div
      className={classNames(
        styles.card,
        styles[variant],
        styles[padding],
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
}; 