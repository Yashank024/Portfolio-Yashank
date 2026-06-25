import React from 'react';

export default function Container({ children, className = '', ...props }) {
  return (
    <div className={`section__inner ${className}`} {...props}>
      {children}
    </div>
  );
}
