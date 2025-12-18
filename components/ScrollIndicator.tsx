import React from 'react';
import { motion } from 'framer-motion';
import { ChevronDown } from 'lucide-react';

export const ScrollIndicator: React.FC = () => {
  return (
    <motion.div 
      className="absolute bottom-8 left-0 right-0 mx-auto w-fit z-40 flex flex-col items-center gap-2 cursor-pointer mix-blend-multiply"
      initial="hidden"
      whileInView="visible"
      viewport={{ once: false }}
      variants={{
        hidden: { opacity: 0 },
        visible: { 
          opacity: 1,
          transition: {
            opacity: { delay: 5, duration: 1 }
          }
        }
      }}
    >
      <motion.div
        animate={{ y: [0, 8, 0] }}
        transition={{ 
          repeat: Infinity, 
          duration: 2.5, 
          ease: "easeInOut",
          delay: 5 // Sync start of animation with opacity appearance
        }}
        className="flex flex-col items-center gap-2"
      >
        <span className="text-[10px] tracking-[0.2em] font-sans uppercase text-stone-500">Scroll</span>
        <ChevronDown className="w-5 h-5 text-stone-500" />
      </motion.div>
    </motion.div>
  );
};