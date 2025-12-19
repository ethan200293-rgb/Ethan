import React from 'react';
import { motion } from 'framer-motion';
import { NarrativeSection } from './NarrativeSection';

const journeyData = [
  {
    text: [
      "我并不是天生就想清楚这些事。",
      "相反，很长一段时间里，",
      "我只是努力学习、认真准备、",
      "希望把未来变得更稳一点。",
      "",
      "那时候我相信：",
      "只要技能足够多，",
      "生活就会慢慢站在我这边。"
    ]
  },
  {
    text: [
      "世界开始变快了，",
      "而努力，",
      "不再自动等于安全。",
      "",
      "有些技能，",
      "你刚学会，",
      "环境已经变了。",
      "你不是做错了什么，",
      "只是原来的规则，",
      "悄悄失效了。"
    ]
  },
  {
    text: [
      "也是从那时开始，",
      "我第一次认真问自己一个问题：",
      "如果我永远没办法提前准备好，",
      "那我到底该依靠什么？",
      "",
      "答案不是新的技能，",
      "也不是更狠的自律，",
      "而是——",
      "我如何判断、选择、应对变化。"
    ]
  },
  {
    text: [
      "后来发生的事情，",
      "并不戏剧化，",
      "但一次次重复：",
      "",
      "我开始更谨慎地行动，",
      "不再轻易投入无意义的事情。",
      "我开始远离消耗型关系，",
      "只保留能真正交流的连接。",
      "我开始意识到，",
      "与其把事情做对，",
      "不如站在对的位置上。",
      "",
      "慢慢地，",
      "我变成了现在这样的人。"
    ]
  },
  {
    isEnd: true,
    text: [
      "所以你现在看到的，",
      "不是一个成功故事，",
      "也不是一套方法论。",
      "",
      "而是一个人，",
      "在旧路径失效之后，",
      "一步步摸索出来的新走法。"
    ]
  }
];

export const PageSixJourney: React.FC = () => {
  return (
    // NarrativeSection usually has h-screen. 
    // We keep it to define the viewport frame.
    <NarrativeSection id="journey" className="!p-0 bg-stone-50" maxWidth="max-w-full">
      
      {/* 
        SCROLL CONTAINER
        1. overscroll-contain: Prevents scroll from leaking to parent (Page 7) immediately.
        2. h-full: Fills the NarrativeSection.
        3. touch-pan-y: Improves touch gesture handling.
      */}
      <div className="h-full w-full overflow-y-auto overflow-x-hidden snap-y snap-mandatory scroll-smooth no-scrollbar relative overscroll-contain touch-pan-y">
        
        {/* 
          Sticky Header 
          Fixed height to h-screen so it occupies the full view initially.
        */}
        <section className="h-screen w-full flex flex-col justify-center items-center text-center p-8 snap-start sticky top-0 -z-10 pointer-events-none">
           <motion.div
             initial={{ opacity: 0, y: 20 }}
             whileInView={{ opacity: 1, y: 0 }}
             viewport={{ once: true }}
             transition={{ duration: 1 }}
             className="max-w-2xl space-y-10 mt-[-10vh]" // Slight visual offset upwards
           >
              <h2 className="text-3xl md:text-5xl font-serif text-stone-900 leading-normal font-medium">
                我不是一开始<br/>
                就知道自己是谁的
              </h2>
              
              <div className="space-y-4">
                <div className="w-12 h-[1px] bg-stone-300 mx-auto mb-6"></div>
                <p className="text-stone-500 font-light text-sm md:text-base tracking-[0.1em]">
                  如果你也是这样<br/>
                  这页可能会对你有用
                </p>
              </div>

              {/* Animated Scroll Hint */}
              <motion.div 
                animate={{ y: [0, 8, 0], opacity: [0.3, 0.8, 0.3] }}
                transition={{ duration: 2, repeat: Infinity }}
                className="pt-20"
              >
                <p className="text-[10px] uppercase tracking-widest text-stone-400">Scroll to Explore</p>
              </motion.div>
           </motion.div>
        </section>

        {/* 
          Spacer 
          Increased to 85vh. This pushes the white content card WAY down.
          User must scroll 85% of the screen height before the card starts covering the title.
          This creates the "Pull Up" feel.
        */}
        <div className="h-[85vh] w-full pointer-events-none"></div>

        {/* 
          Scrolling Content (The White Card)
          Added min-h-screen to ensure it covers the previous content fully.
        */}
        <div className="relative w-full max-w-5xl mx-auto px-6 pb-20 bg-stone-50 z-10 min-h-screen rounded-t-[3rem] shadow-[0_-20px_60px_-15px_rgba(0,0,0,0.1)] border-t border-stone-100">
            
            {/* Timeline Line */}
            <div className="absolute left-8 md:left-1/2 top-24 bottom-48 w-[1px] bg-stone-200 md:-translate-x-1/2 hidden md:block" />
            <div className="absolute left-8 top-24 bottom-48 w-[1px] bg-stone-200 md:hidden" />

            <div className="pt-24 space-y-24 md:space-y-32">
              {journeyData.map((item, idx) => {
                const isEven = idx % 2 === 0;
                
                return (
                  <div 
                    key={idx} 
                    className={`
                      relative flex w-full
                      ${item.isEnd ? 'justify-center' : (isEven ? 'md:justify-end' : 'md:justify-start')}
                    `}
                  >
                     {/* Timeline Dot */}
                     {!item.isEnd && (
                       <>
                         <div className="absolute left-[28px] md:left-1/2 top-6 w-2 h-2 bg-stone-400 rounded-full md:-translate-x-1/2 z-20 border border-stone-50 transform md:-translate-y-1/2" />
                       </>
                     )}

                     <div className={`
                       w-full pl-16 md:pl-0 
                       ${item.isEnd ? 'md:w-2/3 text-center !pl-0' : 'md:w-5/12'}
                       ${!item.isEnd && isEven ? 'md:pl-12' : ''}
                       ${!item.isEnd && !isEven ? 'md:pr-12 md:text-right' : ''}
                     `}>
                        <motion.div
                          initial={{ opacity: 0, y: 30 }}
                          whileInView={{ opacity: 1, y: 0 }}
                          viewport={{ margin: "-10% 0px -20% 0px", once: true }}
                          transition={{ duration: 0.8, ease: "easeOut" }}
                          className={`${item.isEnd ? 'bg-stone-100 p-8 md:p-12 rounded-2xl shadow-inner' : ''}`}
                        >
                          {item.text.map((line, i) => (
                            <p 
                              key={i} 
                              className={`
                                font-serif text-lg md:text-[22px] text-stone-800 leading-[1.8]
                                ${line === "" ? "h-6" : ""}
                                ${item.isEnd && i < 3 ? "text-stone-400 text-sm md:text-base mb-1 block font-sans tracking-wide" : ""}
                                ${item.isEnd && line === "" ? "h-8" : ""}
                                ${item.isEnd && i > 3 ? "text-xl md:text-2xl font-medium" : ""}
                              `}
                            >
                              {line}
                            </p>
                          ))}
                        </motion.div>
                     </div>
                  </div>
                );
              })}
            </div>

            {/* 
               Bottom Buffer Area
               Huge space at the bottom to ensure the user finishes reading
               before the scroll limit is hit.
            */}
            <div className="h-[40vh] flex flex-col items-center justify-center opacity-60">
              <div className="w-[1px] h-16 bg-stone-300 mb-4"></div>
              <span className="text-xs text-stone-400 tracking-widest uppercase">Continue Journey</span>
            </div>
        </div>

      </div>
    </NarrativeSection>
  );
}
