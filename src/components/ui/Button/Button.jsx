import React from 'react';
import './Button.css';

export default function Button({ children, variant = 'primary', className = '', href, target, rel, onClick, ...props }) {
  const classNames = `btn-${variant} ${className}`;
  if (href) {
    return (
      <a href={href} target={target} rel={rel} className={classNames} {...props}>
        {children}
      </a>
    );
  }
  return (
    <button onClick={onClick} className={classNames} {...props}>
      {children}
    </button>
  );
}
