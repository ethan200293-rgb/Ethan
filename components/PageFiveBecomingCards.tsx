import React, { useState, useEffect, useRef } from 'react';
import { motion, useMotionValue, animate, PanInfo, AnimatePresence } from 'framer-motion';
import { NarrativeSection } from './NarrativeSection';
import { ScrollIndicator } from './ScrollIndicator';
import { Brain, Zap, Heart, Users } from 'lucide-react';

// Data Structure for Page 5 (Becoming)
const cardsData = [
  {
    id: 'mind',
    icon: <Brain className="w-6 h-6 md:w-7 md:h-7" />,
    titleEn: 'Mind',
    titleCn: '心智',
    quote: '我允许不完整地开始，用结构来驱动思考。',
    sections: [
      {
        title: '新的运作方式',
        items: [
          '不再用“是否有足够意义”来决定是否开始，用“是否可逆、是否低成本”来决定是否开始。',
          '我默认接受“次优但可推进”的解法，并把优化权留给下一轮。',
          '只在“对我决策有直接影响”的场景下分析他人意图。',
          '思考不再依赖临场状态，而是由外部结构自动触发。'
        ]
      }
    ]
  },
  {
    id: 'body',
    icon: <Zap className="w-6 h-6 md:w-7 md:h-7" />,
    titleEn: 'Body',
    titleCn: '执行',
    quote: '让行动不再被“判断成本”拖慢。',
    sections: [
      {
        title: '新的运作方式',
        items: [
          '把行动前的判断压缩到“是否可逆 + 是否低成本”，其余判断延后。',
          '不管多忙，都保留一个不可被占用的行动窗口。',
          '让“高效”成为结构结果，而不是情绪奖励。'
        ]
      }
    ]
  },
  {
    id: 'emotion',
    icon: <Heart className="w-6 h-6 md:w-7 md:h-7" />,
    titleEn: 'Emotion',
    titleCn: '情绪',
    quote: '我不再靠压住情绪来保持稳定，而是用更早的觉察与更清晰的边界来减少消耗。',
    sections: [
      {
        title: '新的运作方式',
        items: [
          '更早识别情绪信号，而不是等它累积成负担。',
          '情绪出现时，不急着“想通”，先承认：我现在确实不舒服。',
          '区分“需要撤离的冲突”和“值得校准的摩擦”。',
          '我不再用忍受低估来证明自己的稳定。',
          '我的稳定来自边界与节律，而不是压缩情绪。'
        ]
      }
    ]
  },
  {
    id: 'relation',
    icon: <Users className="w-6 h-6 md:w-7 md:h-7" />,
    titleEn: 'Relation',
    titleCn: '关系',
    quote: '我的关系以清晰和一致为基础，而不是靠忍耐和猜测维持。',
    sections: [
      {
        title: '新的运作方式',
        items: [
          '我把关系筛选前移，而不是靠后期抽离止损。',
          '我允许自己不维持没有信息增量的关系。',
          '我能在不升级冲突的前提下，清晰地退出关系。',
          '把“被理解”当作结构设计，而不是期待。'
        ]
      }
    ]
  }
];

export const PageFiveBecomingCards: React.FC = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [containerWidth, setContainerWidth] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);
  const x = useMotionValue(0);

  // Responsive Layout
  const isMobile = containerWidth < 768;
  const cardWidth = isMobile ? containerWidth * 0.8 : 500; 
  const gap = isMobile ? 10 : 40; 
  
  const centerOffset = (containerWidth - cardWidth) / 2;
  const maxDrag = centerOffset;
  const minDrag = centerOffset - ((cardsData.length - 1) * (cardWidth + gap));

  useEffect(() => {
    const handleResize = () => {
      if (containerRef.current) {
        setContainerWidth(containerRef.current.offsetWidth);
      }
    };
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Sync animation when index changes
  useEffect(() => {
    if (containerWidth === 0) return;
    
    // Formula: Center - (Index * Stride)
    const targetX = centerOffset - (activeIndex * (cardWidth + gap));
    
    animate(x, targetX, {
      type: "spring",
      stiffness: 200,
      damping: 25,
      mass: 0.8
    });
  }, [activeIndex, containerWidth, cardWidth, gap, centerOffset, x]);

  const handleDragEnd = (e: any, { offset, velocity }: PanInfo) => {
    const swipeThreshold = 30; // Min distance to consider a swipe
    const velocityThreshold = 0.2; // Min velocity to consider a fast swipe

    // Logic: ONE card at a time.
    if (offset.x < -swipeThreshold || velocity.x < -velocityThreshold) {
      setActiveIndex((prev) => Math.min(prev + 1, cardsData.length - 1));
    } 
    else if (offset.x > swipeThreshold || velocity.x > velocityThreshold) {
      setActiveIndex((prev) => Math.max(prev - 1, 0));
    }
  };

  return (
    <NarrativeSection id="becoming-cards" className="bg-stone-100/50" maxWidth="max-w-full">
      <div 
        ref={containerRef}
        className="relative w-full h-[85vh] flex flex-col justify-center overflow-hidden" 
      >
        
        {/* Page Title "我成为" */}
        <div className="absolute top-[2vh] md:top-[5vh] left-0 right-0 z-30 flex justify-center pointer-events-none select-none">
          <h2 className="text-3xl md:text-5xl font-serif text-stone-900 tracking-[0.2em] pl-[0.2em] font-medium opacity-90">
            “我成为”
          </h2>
        </div>

        {/* Carousel Track */}
        <motion.div
          className="absolute top-0 bottom-0 flex items-center cursor-grab active:cursor-grabbing touch-pan-y"
          style={{ x, left: 0 }} 
          drag="x"
          dragConstraints={{ left: minDrag, right: maxDrag }}
          dragElastic={0.1}
          onDragEnd={handleDragEnd}
        >
          {cardsData.map((card, index) => {
            const isActive = index === activeIndex;
            return (
              <div 
                key={card.id} 
                style={{ 
                  width: cardWidth, 
                  marginRight: index === cardsData.length - 1 ? 0 : gap 
                }}
                className="flex-shrink-0 h-full flex items-center justify-center pointer-events-none" 
              >
                <Card 
                  data={card} 
                  isActive={isActive} 
                  width={cardWidth}
                  onClick={() => setActiveIndex(index)}
                />
              </div>
            );
          })}
        </motion.div>

        {/* Pagination Dots */}
        <div className="absolute bottom-[6vh] left-0 right-0 flex justify-center gap-4 z-20">
          {cardsData.map((_, idx) => (
            <button
              key={idx}
              onClick={() => setActiveIndex(idx)}
              className={`h-2 rounded-full transition-all duration-500 ease-out cursor-pointer ${
                idx === activeIndex 
                  ? 'bg-stone-800 w-8 md:w-10' 
                  : 'bg-stone-300 w-2 hover:bg-stone-400'
              }`}
            />
          ))}
        </div>
      </div>
      
      {/* Scroll Indicator (optional if this is the last page, but keeping for consistency) */}
      <ScrollIndicator />
    </NarrativeSection>
  );
};

const Card: React.FC<{ 
  data: typeof cardsData[0], 
  isActive: boolean, 
  width: number,
  onClick: () => void 
}> = ({ data, isActive, width, onClick }) => {
  // Track scroll state to hide/show hint
  const [hasScrolled, setHasScrolled] = useState(false);

  const handleScroll = (e: React.UIEvent<HTMLDivElement>) => {
    const scrollTop = e.currentTarget.scrollTop;
    if (scrollTop > 10) {
      if (!hasScrolled) setHasScrolled(true);
    } else {
      if (hasScrolled) setHasScrolled(false);
    }
  };

  return (
    <motion.div
      onClick={(e) => { e.stopPropagation(); onClick(); }}
      className={`
        relative bg-white rounded-xl md:rounded-2xl overflow-hidden
        border border-stone-200/60 pointer-events-auto
        /* Reduced base height to accommodate 1.1x scale without clipping */
        h-[55vh] md:h-[550px] flex flex-col w-full
        ${isActive ? 'shadow-2xl shadow-stone-300/50' : 'shadow-none'}
      `}
      animate={{
        scale: isActive ? 1.1 : 0.75,
        opacity: isActive ? 1 : 0.3, 
        filter: isActive ? 'blur(0px)' : 'blur(4px)',
        zIndex: isActive ? 50 : 10,
      }}
      transition={{ 
        duration: 0.5, 
        ease: "easeOut" 
      }}
    >
      {/* Header */}
      <div className="pt-8 px-8 md:px-12 pb-6 flex flex-col items-center text-center border-b border-stone-100 bg-stone-50/20 backdrop-blur-sm">
        <div className={`mb-4 p-3 rounded-full ${isActive ? 'bg-stone-100 text-stone-800' : 'bg-stone-50 text-stone-300'} transition-colors duration-500`}>
          {data.icon}
        </div>
        <h3 className="text-2xl md:text-3xl font-serif text-stone-900 tracking-wide flex items-baseline gap-3">
          <span className="font-bold">{data.titleEn}</span>
          <span className="w-[1px] h-5 bg-stone-300"></span>
          <span className="font-light">{data.titleCn}</span>
        </h3>
      </div>

      {/* Scrollable Content Area */}
      <div 
        className="flex-1 overflow-y-auto overflow-x-hidden p-6 md:p-12 no-scrollbar scroll-smooth"
        onScroll={handleScroll}
      >
        {/* Quote */}
        <div className="mb-10 text-center relative">
           <span className="absolute -top-4 left-0 text-6xl font-serif text-stone-100 -z-10">“</span>
           <p className="text-lg md:text-[22px] font-serif italic leading-loose text-stone-800 font-medium">
            {data.quote}
          </p>
        </div>

        {/* Sections */}
        <div className="space-y-10">
          {data.sections.map((section, idx) => (
            <div key={idx} className="space-y-4">
              <h4 className="flex items-center gap-3 text-xs md:text-sm font-sans font-bold uppercase tracking-[0.2em] text-stone-400">
                <span className="h-[1px] flex-1 bg-stone-100"></span>
                {section.title}
                <span className="h-[1px] flex-1 bg-stone-100"></span>
              </h4>
              <ul className="space-y-4">
                {section.items.map((item, i) => (
                  <li key={i} className="text-base md:text-[17px] leading-relaxed text-stone-600 font-sans flex items-start gap-4 group">
                    <span className="block w-1.5 h-1.5 mt-2.5 rounded-full bg-stone-300 group-hover:bg-stone-400 transition-colors flex-shrink-0" />
                    <span className="text-justify opacity-90">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
          <div className="h-4" />
        </div>
      </div>
      
      {/* Fading bottom overlay */}
      <div className="absolute bottom-0 left-0 right-0 h-16 bg-gradient-to-t from-white via-white/80 to-transparent pointer-events-none" />

      {/* Slide Down Hint */}
      <AnimatePresence>
        {isActive && !hasScrolled && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.8, y: [0, 4, 0] }}
            exit={{ opacity: 0 }}
            transition={{ delay: 0.5, duration: 2, repeat: Infinity, ease: "easeInOut" }}
            className="absolute bottom-6 left-0 right-0 flex justify-center items-center z-50 pointer-events-none select-none"
          >
             <span className="text-stone-400 text-[10px] md:text-xs tracking-[0.25em] font-sans px-2 py-1">下滑</span>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};