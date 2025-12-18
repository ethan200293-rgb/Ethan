import React from 'react';
import { PageOneIntro } from './components/PageOneIntro';
import { PageTwoTransition } from './components/PageTwoTransition';
import { PageThreeCards } from './components/PageThreeCards';
import { PageFourBecoming } from './components/PageFourBecoming';
import { PageFiveBecomingCards } from './components/PageFiveBecomingCards';
import { PageSixJourney } from './components/PageSixJourney';
import { PageSevenEnding } from './components/PageSevenEnding';

const App: React.FC = () => {
  return (
    // Updated for Light Theme: bg-stone-50, text-stone-800
    // Added selection colors for better UX
    <main className="relative h-screen w-full overflow-y-scroll snap-y snap-mandatory scroll-smooth bg-stone-50 text-stone-800 no-scrollbar selection:bg-stone-200 selection:text-stone-900">
      
      {/* Texture Overlay */}
      <div className="fixed inset-0 z-50 pointer-events-none opacity-[0.03] bg-texture mix-blend-multiply"></div>

      {/* Page 1: Introduction */}
      <PageOneIntro />

      {/* Page 2: Transition to 'Who Am I' */}
      <PageTwoTransition />

      {/* Page 3: The 4 Cards (Mind, Body, Emotion, Relation) */}
      <PageThreeCards />

      {/* Page 4: Transition to 'Becoming' */}
      <PageFourBecoming />

      {/* Page 5: Becoming Cards (Mind, Body, Emotion, Relation) */}
      <PageFiveBecomingCards />

      {/* Page 6: How I got here (Inner Scroll) */}
      <PageSixJourney />

      {/* Page 7: Ending */}
      <PageSevenEnding />
      
    </main>
  );
};

export default App;