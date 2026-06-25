import React from 'react';
import './Badge.css';

export default function Badge({ children, className = '', variant = 'accent', ...props }) {
  const classNames = `badge badge-${variant} ${className}`;
  return (
    <span className={classNames} {...props}>
      {children}
    </span>
  );
}
