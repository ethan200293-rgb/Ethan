import React, { useState, useEffect, useRef } from 'react';
import { motion, useMotionValue, animate, PanInfo, AnimatePresence } from 'framer-motion';
import { NarrativeSection } from './NarrativeSection';
import { ScrollIndicator } from './ScrollIndicator';
import { Brain, Zap, Heart, Users } from 'lucide-react';

// Data Structure
const cardsData = [
  {
    id: 'mind',
    icon: <Brain className="w-6 h-6 md:w-7 md:h-7" />,
    titleEn: 'Mind',
    titleCn: '心智',
    quote: '我习惯先把事情拆成逻辑结构，再决定自己立场。',
    sections: [
      {
        title: '我的心智如何运作',
        items: [
          '愿意接受反驳，因为我清楚反驳的是观点，而不是我个人。',
          '刻意将对话拆解为“逻辑是否成立”和“我是否认同”。',
          '面对复杂问题，先抽象成结构，不急于给结论。',
          '面对新观点，先找反例；若无反例，则修正自己看法。',
          '不确定的信息会查证来源、对比多方说法。',
          '共同决策时，更在意结论是否稳固，而非单纯讨好。'
        ]
      },
      {
        title: '不足与觉察',
        items: [
          '意义不清晰时，可能会延迟行动。',
          '有时因寻找“更优解”而推迟已足够好的决策。',
          '偶尔过度分析他人动机，增加心理负担。',
          '认知结构运行仍需外部节律来辅助稳定。'
        ]
      }
    ]
  },
  {
    id: 'body',
    icon: <Zap className="w-6 h-6 md:w-7 md:h-7" />,
    titleEn: 'Body',
    titleCn: '执行',
    quote: '我不是拖延，我是在判断是否值得动。',
    sections: [
      {
        title: '行动触发机制',
        items: [
          '风控先行：先判断价值与风险，不无条件配合任务。',
          '分级执行：有利且长期的事推进极快；无利但能成长的视风险而定。',
          '主动爆发：对自己认可的“战场”，执行是即时且爆发式的。',
          '成果导向：自然进入结果视角，而非过程消耗。'
        ]
      },
      {
        title: '不足与觉察',
        items: [
          '外部强制任务占比过高时，执行意愿明显下降。',
          '决策空间被压缩时，优先保护可控性而非速度。',
          '执行力高度依赖“是否由我决定做这件事”。'
        ]
      }
    ]
  },
  {
    id: 'emotion',
    icon: <Heart className="w-6 h-6 md:w-7 md:h-7" />,
    titleEn: 'Emotion',
    titleCn: '情绪',
    quote: '我通常用理解和分析来处理情绪，而不是直接表达。',
    sections: [
      {
        title: '情绪真实表现',
        items: [
          '情绪出现时，先试图搞清楚它从哪里来。',
          '极少被情绪牵制，波动中也能保持基本理性。',
          '倾向内部消化，不习惯直接宣泄。',
          '面对他人强烈情绪，先理解其逻辑，而非立刻共情。'
        ]
      },
      {
        title: '不足与觉察',
        items: [
          '有时把情绪当成要“解决”的问题，导致难以共情。',
          '对模糊、无逻辑的情绪表达耐心有限。',
          '恢复依赖“想通”，自我调节路径较窄。'
        ]
      }
    ]
  },
  {
    id: 'relation',
    icon: <Users className="w-6 h-6 md:w-7 md:h-7" />,
    titleEn: 'Relation',
    titleCn: '关系',
    quote: '我更容易在理解中建立关系，而不是在情绪中。',
    sections: [
      {
        title: '关系处理模式',
        items: [
          '出现误解主动澄清，但拒绝反复纠缠。',
          '关系失去建设性时，会果断选择退出。',
          '建立信任门槛高，但一旦建立非常稳定。',
          '更在意被“理解价值”，而非被安抚或赞美。'
        ]
      },
      {
        title: '不足与觉察',
        items: [
          '对“被低估”敏感，却不直说，导致过度表现。',
          '不容忍被控制或指挥，容易直接抽离。',
          '快速退出常被误解为冷漠。',
          '理性管理有时会延后真正的情绪处理。'
        ]
      }
    ]
  }
];

export const PageThreeCards: React.FC = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [containerWidth, setContainerWidth] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);
  const x = useMotionValue(0);

  // Responsive Layout
  const isMobile = containerWidth < 768;
  const cardWidth = isMobile ? containerWidth * 0.85 : 500; // Slightly wider on mobile
  const gap = isMobile ? 15 : 40; 
  
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

  const handleDragEnd = (_: any, { offset, velocity }: PanInfo) => {
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
    <NarrativeSection id="who-am-i-cards" className="bg-stone-100/50" maxWidth="max-w-full">
      <div 
        ref={containerRef}
        className="relative w-full h-[85dvh] flex flex-col justify-center overflow-hidden" 
      >
        
        {/* Page Title */}
        <div className="absolute top-[2vh] md:top-[5vh] left-0 right-0 z-30 flex justify-center pointer-events-none select-none">
          <h2 className="text-3xl md:text-5xl font-serif text-stone-900 tracking-[0.2em] pl-[0.2em] font-medium opacity-90">
            “我是谁”
          </h2>
        </div>

        {/* Carousel Track */}
        <motion.div
          className="absolute top-0 bottom-0 flex items-center cursor-grab active:cursor-grabbing"
          style={{ x, left: 0 }} 
          drag="x"
          dragDirectionLock={true} 
          dragConstraints={{ left: minDrag, right: maxDrag }}
          dragElastic={0.05} // Stiffer elastic to prevent wild dragging
          onDragEnd={handleDragEnd}
          // touch-action: pan-y allows vertical scrolling of the PAGE, 
          // but since we are dragging X, it separates the concerns.
          // However, setting it to 'none' inside the drag area prevents accidental page scrolling while swiping cards.
          // We will use pan-y to allow users to scroll past the section if they touch empty space,
          // but the card itself will capture the drag.
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
                  onClick={() => setActiveIndex(index)}
                />
              </div>
            );
          })}
        </motion.div>

        {/* Pagination Dots */}
        <div className="absolute bottom-[2vh] md:bottom-[6vh] left-0 right-0 flex justify-center gap-4 z-20">
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
      
      <ScrollIndicator />
    </NarrativeSection>
  );
};

const Card: React.FC<{ 
  data: typeof cardsData[0], 
  isActive: boolean, 
  onClick: () => void 
}> = ({ data, isActive, onClick }) => {
  const [hasScrolled, setHasScrolled] = useState(false);
  const dragStart = useRef<{x: number, y: number} | null>(null);

  const handleScroll = (e: React.UIEvent<HTMLDivElement>) => {
    const scrollTop = e.currentTarget.scrollTop;
    if (scrollTop > 10) {
      if (!hasScrolled) setHasScrolled(true);
    } else {
      if (hasScrolled) setHasScrolled(false);
    }
  };

  // Angle Detection Logic
  const onPointerDown = (e: React.PointerEvent) => {
    // Capture the initial touch position
    dragStart.current = { x: e.clientX, y: e.clientY };
  };

  const onPointerMove = (e: React.PointerEvent) => {
    if (!dragStart.current) return;

    const dx = Math.abs(e.clientX - dragStart.current.x);
    const dy = Math.abs(e.clientY - dragStart.current.y);
    
    // Threshold to prevent jitter on tiny movements
    if (dx + dy < 5) return;

    // Angle Check:
    // If dy > dx (Vertical movement dominates), we assume the user is scrolling text.
    // We STOP propagation. This prevents the parent Framer Motion component from receiving the event,
    // so it won't try to drag the card horizontally.
    // Native browser scrolling (handled by touch-action: pan-y) will still work.
    if (dy > dx) {
      e.stopPropagation();
    }
  };

  return (
    <motion.div
      onClick={(e) => { e.stopPropagation(); onClick(); }}
      className={`
        relative bg-white rounded-xl md:rounded-2xl overflow-hidden
        border border-stone-200/60 pointer-events-auto
        /* Mobile optimization: taller cards */
        h-[60dvh] md:h-[550px] flex flex-col w-full
        ${isActive ? 'shadow-2xl shadow-stone-300/50' : 'shadow-none'}
      `}
      animate={{
        scale: isActive ? 1 : 0.9, // Less scaling difference on mobile for stability
        opacity: isActive ? 1 : 0.4, 
        filter: isActive ? 'blur(0px)' : 'blur(2px)',
        zIndex: isActive ? 50 : 10,
      }}
      transition={{ 
        duration: 0.4, 
        ease: "easeOut" 
      }}
    >
      {/* Header */}
      <div className="pt-6 px-6 md:pt-8 md:px-12 pb-4 flex flex-col items-center text-center border-b border-stone-100 bg-stone-50/20 backdrop-blur-sm select-none">
        <div className={`mb-3 p-2 md:p-3 rounded-full ${isActive ? 'bg-stone-100 text-stone-800' : 'bg-stone-50 text-stone-300'} transition-colors duration-500`}>
          {data.icon}
        </div>
        <h3 className="text-xl md:text-3xl font-serif text-stone-900 tracking-wide flex items-baseline gap-3">
          <span className="font-bold">{data.titleEn}</span>
          <span className="w-[1px] h-5 bg-stone-300"></span>
          <span className="font-light">{data.titleCn}</span>
        </h3>
      </div>

      {/* Scrollable Content Area */}
      {/* 
         touch-action: pan-y enables vertical scrolling INSIDE the card.
         onPointerDown/Move implements the "Angle Lock" logic.
      */}
      <div 
        className="flex-1 overflow-y-auto overflow-x-hidden p-6 md:p-12 no-scrollbar scroll-smooth touch-pan-y"
        onScroll={handleScroll}
        onPointerDown={onPointerDown}
        onPointerMove={onPointerMove}
      >
        <div className="mb-8 text-center relative select-none">
           <span className="absolute -top-4 left-0 text-5xl md:text-6xl font-serif text-stone-100 -z-10">“</span>
           <p className="text-base md:text-[22px] font-serif italic leading-loose text-stone-800 font-medium">
            {data.quote}
          </p>
        </div>

        <div className="space-y-8 pb-10">
          {data.sections.map((section, idx) => (
            <div key={idx} className="space-y-3">
              <h4 className="flex items-center gap-3 text-[10px] md:text-sm font-sans font-bold uppercase tracking-[0.2em] text-stone-400 select-none">
                <span className="h-[1px] flex-1 bg-stone-100"></span>
                {section.title}
                <span className="h-[1px] flex-1 bg-stone-100"></span>
              </h4>
              <ul className="space-y-3">
                {section.items.map((item, i) => (
                  <li key={i} className="text-sm md:text-[17px] leading-relaxed text-stone-600 font-sans flex items-start gap-3 group">
                    <span className="block w-1.5 h-1.5 mt-2 rounded-full bg-stone-300 group-hover:bg-stone-400 transition-colors flex-shrink-0" />
                    <span className="text-justify opacity-90">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
      
      <div className="absolute bottom-0 left-0 right-0 h-12 bg-gradient-to-t from-white via-white/80 to-transparent pointer-events-none" />

      <AnimatePresence>
        {isActive && !hasScrolled && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.8, y: [0, 4, 0] }}
            exit={{ opacity: 0 }}
            transition={{ delay: 0.5, duration: 2, repeat: Infinity, ease: "easeInOut" }}
            className="absolute bottom-4 left-0 right-0 flex justify-center items-center z-50 pointer-events-none select-none"
          >
             <span className="text-stone-400 text-[10px] md:text-xs tracking-[0.25em] font-sans px-2 py-1 bg-white/50 rounded-full backdrop-blur-sm">下滑查看更多</span>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};
