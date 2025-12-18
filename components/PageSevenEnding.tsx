import React from 'react';
import { motion } from 'framer-motion';
import { NarrativeSection } from './NarrativeSection';

export const PageSevenEnding: React.FC = () => {
  return (
    <NarrativeSection id="ending" className="bg-stone-50" maxWidth="max-w-4xl">
      <div className="h-full w-full flex flex-col justify-center items-center">
        <motion.div
           initial={{ opacity: 0, y: 20 }}
           whileInView={{ opacity: 1, y: 0 }}
           viewport={{ once: true }}
           transition={{ duration: 1.2, ease: "easeOut" }}
           className="text-center space-y-16"
        >
            <div className="space-y-6 md:space-y-8">
                <h2 className="text-3xl md:text-5xl font-serif text-stone-900 tracking-wide font-medium">
                    如果你正在找路
                </h2>
                <h2 className="text-3xl md:text-5xl font-serif text-stone-400 tracking-wide font-medium">
                    也许我们走在相似的方向上
                </h2>
            </div>
            
            <motion.div 
              initial={{ scaleY: 0 }}
              whileInView={{ scaleY: 1 }}
              transition={{ delay: 0.8, duration: 1 }}
              className="h-20 w-[1px] bg-gradient-to-b from-stone-200 to-transparent mx-auto" 
            />

            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ delay: 1.5, duration: 1 }}
            >
                <p className="text-lg md:text-xl font-serif text-stone-800 tracking-widest flex items-center justify-center gap-4">
                    <span className="text-stone-400 font-light text-base">你的朋友</span>
                    <span className="w-8 h-[1px] bg-stone-300"></span>
                    <span>李金容</span>
                </p>
            </motion.div>
        </motion.div>
      </div>
    </NarrativeSection>
  );
};