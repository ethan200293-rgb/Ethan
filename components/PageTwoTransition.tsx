import React from 'react';
import { motion, Variants } from 'framer-motion';
import { NarrativeSection } from './NarrativeSection';
import { ScrollIndicator } from './ScrollIndicator';

const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.6,
      delayChildren: 0.2
    }
  }
};

const itemVariants: Variants = {
  hidden: { opacity: 0, scale: 0.98, y: 10 },
  visible: { 
    opacity: 1, 
    scale: 1,
    y: 0,
    transition: { duration: 1, ease: "easeOut" } 
  }
};

export const PageTwoTransition: React.FC = () => {
  return (
    <NarrativeSection id="who-am-i-intro" className="bg-stone-50/50">
      <motion.div 
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        className="max-w-2xl w-full mx-auto text-center flex flex-col items-center justify-center gap-12 md:gap-14"
      >
        {/* Title Group */}
        <motion.div variants={itemVariants} className="relative py-4 w-full flex justify-center items-center">
          {/* Decorative background text */}
          {/* Increased visibility: text-stone-200 and adjusted opacity */}
           <span className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-[5rem] md:text-[9rem] text-stone-200 font-serif pointer-events-none whitespace-nowrap z-0 select-none opacity-80">
            Identity
          </span>
          {/* 
            Optical Centering Fix: 
            tracking-[0.2em] adds space to the right of every char.
            pl-[0.2em] adds equal padding to the left to balance the visual center.
          */}
          <h2 className="relative z-10 text-4xl md:text-5xl font-serif text-stone-900 tracking-[0.2em] pl-[0.2em] font-medium">
            “我是谁”
          </h2>
        </motion.div>

        {/* The Disclaimer */}
        <motion.div variants={itemVariants} className="space-y-4 text-stone-500 font-light text-base md:text-lg tracking-wide">
          <p>下面不是性格测试</p>
          <p>也不是人格标签</p>
        </motion.div>

        {/* The Core Concept */}
        <motion.div variants={itemVariants} className="py-2">
          <p className="text-xl md:text-2xl leading-loose font-light text-stone-800">
            它只是我在长期观察自己后<br />
            总结出的四个<span className="font-medium text-stone-900 mx-1 border-b border-stone-800 pb-1">稳定运作方式</span>
          </p>
        </motion.div>

        {/* The Ask */}
        <motion.div variants={itemVariants} className="mt-4 space-y-8">
          <div className="space-y-2 text-stone-400 text-sm md:text-base font-sans tracking-widest uppercase scale-95">
            <p>你不需要完全理解</p>
            <p>只需要感受</p>
          </div>
          
          <p className="text-stone-800 text-lg md:text-xl font-serif italic">
            这是不是<br className="md:hidden" />
            你想用来认识一个人的方式
          </p>
        </motion.div>

      </motion.div>

      <ScrollIndicator />
    </NarrativeSection>
  );
};