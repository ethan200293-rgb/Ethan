import React from 'react';
import { SectionProps } from '../types';

export const NarrativeSection: React.FC<SectionProps> = ({ children, className = "", id, maxWidth = "max-w-3xl" }) => {
  return (
    <section 
      id={id}
      // h-[100dvh]: Fixes mobile address bar resizing issues
      // snap-stop-always: FORCE the scroll to stop at this section. 
      // This prevents a fast swipe from skipping Page 6 or Page 3 entirely.
      className={`h-[100dvh] w-full snap-start snap-stop-always flex flex-col justify-center items-center relative overflow-hidden px-6 md:px-20 py-12 ${className}`}
    >
      <div className={`${maxWidth} w-full z-10`}>
        {children}
      </div>
    </section>
  );
};
