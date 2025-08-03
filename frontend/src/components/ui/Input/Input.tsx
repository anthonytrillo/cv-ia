import type { InputHTMLAttributes } from 'react';
import { classNames } from '../../../utils/classNames';
import styles from './Input.module.css';

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  helperText?: string;
  variant?: 'default' | 'error' | 'success';
}

export const Input = ({
  label,
  error,
  helperText,
  variant = 'default',
  className = '',
  id,
  ...props
}: InputProps) => {
  const inputId = id || `input-${Math.random().toString(36).substr(2, 9)}`;
  const hasError = !!error;
  const inputVariant = hasError ? 'error' : variant;

  return (
    <div className={styles.container}>
      {label && (
        <label htmlFor={inputId} className={styles.label}>
          {label}
        </label>
      )}
      <input
        id={inputId}
        className={classNames(
          styles.input,
          styles[inputVariant],
          className
        )}
        {...props}
      />
      {(error || helperText) && (
        <p className={classNames(
          styles.helperText,
          hasError && styles.error
        )}>
          {error || helperText}
        </p>
      )}
    </div>
  );
}; 