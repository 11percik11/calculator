// Components/UI/Portal/Portal.tsx
import { useEffect, useState } from 'react';
import { createPortal } from 'react-dom';

interface PortalProps {
  children: React.ReactNode;
}

export const Portal = ({ children }: PortalProps) => {
  const [container] = useState(() => document.createElement('div'));

  useEffect(() => {
    document.body.appendChild(container);
    document.body.style.overflow = 'hidden'; // Блокируем скролл фона
    
    return () => {
      document.body.removeChild(container);
      document.body.style.overflow = 'unset';
    };
  }, [container]);

  return createPortal(children, container);
};