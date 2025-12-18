import { ReactNode } from 'react';

export interface SectionProps {
  children: ReactNode;
  className?: string;
  id?: string;
  maxWidth?: string;
}

export interface AnimatedTextProps {
  text: string | string[];
  delay?: number;
  className?: string;
  highlight?: boolean;
}