import { ReactNode } from 'react';
import { useLenis } from '../hooks/useLenis';

interface LenisSmoothScrollProps {
  children: ReactNode;
}

export function LenisSmoothScroll({ children }: LenisSmoothScrollProps) {
  useLenis();
  return <>{children}</>;
}
