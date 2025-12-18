import React, { useState } from 'react';
import { motion, Variants, AnimatePresence } from 'framer-motion';
import { NarrativeSection } from './NarrativeSection';
import { ScrollIndicator } from './ScrollIndicator';
import { MousePointerClick } from 'lucide-react';

const titleVariants: Variants = {
  hidden: { opacity: 0, y: 20, filter: 'blur(8px)' },
  visible: { 
    opacity: 1, 
    y: 0, 
    filter: 'blur(0px)',
    transition: { duration: 1.2, ease: "easeOut" } 
  }
};

const fadeVariants: Variants = {
  hidden: { opacity: 0, y: 10 },
  visible: { 
    opacity: 1, 
    y: 0, 
    transition: { duration: 0.8, ease: "easeOut", delay: 0.2 } 
  },
  exit: { 
    opacity: 0, 
    y: -10, 
    filter: 'blur(4px)',
    transition: { duration: 0.5, ease: "easeIn" } 
  }
};

export const PageOneIntro: React.FC = () => {
  // State to track which content stage we are in
  // false = Stage 1 (Intro Text), true = Stage 2 (Roadmap)
  const [showRoadmap, setShowRoadmap] = useState(false);

  const handleInteraction = () => {
    if (!showRoadmap) {
      setShowRoadmap(true);
    }
  };

  return (
    // Increased maxWidth to max-w-6xl for a fuller page feel
    <NarrativeSection id="intro" maxWidth="max-w-6xl">
      <div 
        onClick={handleInteraction}
        // Changed items-start/justify-start to items-center/justify-center for perfect centering
        // Removed pt-[28vh]
        className={`h-full w-full mx-auto px-4 md:px-0 flex flex-col items-center justify-center transition-colors duration-500 ${!showRoadmap ? 'cursor-pointer' : ''}`}
      >
        {/* Inner container to align text to the left while the block itself is centered */}
        <div className="w-full max-w-5xl flex flex-col items-start">
          
          {/* 
            1. Title Block 
            Fixed position via standard flow, unaffected by AnimatePresence below
          */}
          <div className="relative mb-12 md:mb-16 select-none w-full">
            <motion.h1 
              variants={titleVariants}
              initial="hidden"
              animate="visible"
              className="text-4xl md:text-6xl lg:text-7xl font-serif text-stone-900 leading-[1.2] tracking-tight font-medium"
            >
              我想换一种方式<br />
              把我介绍给你
            </motion.h1>
            <motion.div 
              initial={{ scaleX: 0 }}
              animate={{ scaleX: 1 }}
              transition={{ delay: 1.0, duration: 1.2, ease: "easeInOut" }}
              className="h-[2px] w-24 bg-stone-800 mt-8 origin-left"
            />
          </div>

          {/* 
            2. Dynamic Content Area 
            Using AnimatePresence to handle the swap smoothly
          */}
          <div className="relative min-h-[300px] w-full">
            <AnimatePresence mode="wait">
              {!showRoadmap ? (
                <motion.div 
                  key="stage-1"
                  variants={fadeVariants}
                  initial="hidden"
                  animate="visible"
                  exit="exit"
                  className="space-y-12 max-w-3xl select-none"
                >
                  <div className="space-y-3 text-stone-500 font-light text-lg md:text-xl tracking-wide">
                    <p>没有头衔 &nbsp;/&nbsp; 没有标签</p>
                    <p>也不是用别人替我下的定义</p>
                  </div>

                  <div>
                    <p className="text-xl md:text-2xl font-light leading-relaxed text-stone-800">
                      因为在这个变化越来越快的时代，<br />
                      很多标签，只能解释一个人<br />
                      <span className="italic font-serif text-stone-900 font-medium">“曾经是什么”</span>。
                    </p>
                  </div>

                  {/* Subtle Click Hint */}
                  <motion.div 
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 0.6 }}
                    transition={{ delay: 2.5, duration: 1 }}
                    className="pt-8 flex items-center gap-2 text-stone-400 text-sm font-sans tracking-widest"
                  >
                    <MousePointerClick className="w-4 h-4" />
                    <span>点击继续</span>
                  </motion.div>
                </motion.div>
              ) : (
                <motion.div 
                  key="stage-2"
                  variants={fadeVariants}
                  initial="hidden"
                  animate="visible"
                  exit="exit"
                  className="space-y-8"
                >
                  <p className="text-sm md:text-base tracking-[0.1em] text-stone-500 font-normal">
                    接下来，你会看到三个部分
                  </p>
                  <div className="flex flex-col items-start gap-5 text-2xl md:text-3xl font-serif">
                    {/* Removed underline to resolve visual conflict with title line. Used opacity hierarchy instead. */}
                    <span className="text-stone-900 font-medium">我是谁</span>
                    <span className="text-stone-300">我正在成为谁</span>
                    <span className="text-stone-300">我是如何一步步走到这里的</span>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

        </div>
      </div>

      {/* Only show scroll indicator in the second stage */}
      {showRoadmap && <ScrollIndicator />}
    </NarrativeSection>
  );
};