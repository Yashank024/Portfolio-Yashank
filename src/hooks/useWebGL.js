import { useEffect, useState } from 'react';

export function useWebGL() {
  const [isSupported, setIsSupported] = useState(false);

  useEffect(() => {
    try {
      const canvas = document.createElement('canvas');
      setIsSupported(!!(window.WebGLRenderingContext && (canvas.getContext('webgl') || canvas.getContext('experimental-webgl'))));
    } catch (e) {
      setIsSupported(false);
    }
  }, []);

  return isSupported;
}
