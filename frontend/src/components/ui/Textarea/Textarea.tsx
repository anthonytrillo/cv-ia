import type { TextareaHTMLAttributes } from 'react';
import { classNames } from '../../../utils/classNames';
import styles from './Textarea.module.css';

interface TextareaProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  label?: string;
  error?: string;
  helperText?: string;
  variant?: 'default' | 'error' | 'success';
}

export const Textarea = ({
  label,
  error,
  helperText,
  variant = 'default',
  className = '',
  id,
  rows = 4,
  ...props
}: TextareaProps) => {
  const textareaId = id || `textarea-${Math.random().toString(36).substr(2, 9)}`;
  const hasError = !!error;
  const textareaVariant = hasError ? 'error' : variant;

  return (
    <div className={styles.container}>
      {label && (
        <label htmlFor={textareaId} className={styles.label}>
          {label}
        </label>
      )}
      <textarea
        id={textareaId}
        rows={rows}
        className={classNames(
          styles.textarea,
          styles[textareaVariant],
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