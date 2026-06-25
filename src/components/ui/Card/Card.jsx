import React from 'react';
import './Card.css';

export default function Card({ children, className = '', hoverable = true, ...props }) {
  const classNames = `glass-card ${hoverable ? 'card-hoverable' : ''} ${className}`;
  return (
    <div className={classNames} {...props}>
      {children}
    </div>
  );
}
