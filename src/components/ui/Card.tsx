import type { ReactNode } from 'react';
import { usePointerTilt } from '../../hooks/usePointerTilt';

export function Card({ children, className = '' }: { children: ReactNode; className?: string }) {
  const ref = usePointerTilt(2);
  return <div ref={ref} className={`tilt-card ${className}`}><div className="card-face">{children}</div></div>;
}
