import React from 'react';

export default function Providers({ children }) {
  // Wrap context providers (e.g., Theme, GSAP registers) here
  return <>{children}</>;
}
