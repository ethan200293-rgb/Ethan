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

export const PageFourBecoming: React.FC = () => {
  return (
    <NarrativeSection id="becoming-intro" className="bg-stone-50/50">
      <motion.div 
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        className="max-w-2xl w-full mx-auto text-center flex flex-col items-center justify-center gap-10 md:gap-14"
      >
        {/* Title Group */}
        <motion.div variants={itemVariants} className="relative py-4 w-full flex justify-center items-center">
          {/* Decorative background text */}
           <span className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-[4.5rem] md:text-[8rem] text-stone-200 font-serif pointer-events-none whitespace-nowrap z-0 select-none opacity-80">
            Becoming
          </span>
          <h2 className="relative z-10 text-4xl md:text-5xl font-serif text-stone-900 tracking-[0.2em] pl-[0.2em] font-medium">
            “我成为”
          </h2>
        </motion.div>

        {/* The Negation / Clarification */}
        <motion.div variants={itemVariants} className="space-y-4 text-stone-500 font-light text-base md:text-lg tracking-wide">
          <p>这不是一个目标清单</p>
          <p>也不是未来蓝图</p>
        </motion.div>

        {/* The Core Belief & Definition */}
        <motion.div variants={itemVariants} className="py-2 space-y-8">
          <p className="text-lg md:text-xl font-light leading-relaxed text-stone-800">
            我并不相信<br />
            人可以被一次性规划完成
          </p>

          <p className="text-xl md:text-2xl leading-loose font-light text-stone-800">
            我所说的「成为」<br />
            指的是在真实世界中<br />
            <span className="font-medium text-stone-900 mx-1 border-b border-stone-800 pb-1">不断修正方向</span>的过程
          </p>
        </motion.div>

        {/* The Invitation */}
        <motion.div variants={itemVariants} className="mt-4">
          <p className="text-stone-800 text-lg md:text-xl font-serif italic leading-relaxed">
            如果你愿意<br />
            我可以把这些变化<br />
            慢慢讲给你听
          </p>
        </motion.div>

      </motion.div>

      <ScrollIndicator />
    </NarrativeSection>
  );
};