import React from 'react';
import { SectionProps } from '../types';

export const NarrativeSection: React.FC<SectionProps> = ({ children, className = "", id, maxWidth = "max-w-3xl" }) => {
  return (
    <section 
      id={id}
      className={`h-screen w-full snap-start flex flex-col justify-center items-center relative overflow-hidden px-6 md:px-20 py-12 ${className}`}
    >
      <div className={`${maxWidth} w-full z-10`}>
        {children}
      </div>
    </section>
  );
};