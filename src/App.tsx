import { WhitelistFlow } from './components/WhitelistFlow';
import { BackgroundChaos } from './components/Scribbles';
import { motion } from 'framer-motion';
import { RabbishToastProvider } from './components/RabbishToast';

function App() {
  return (
    <div className="min-h-screen relative py-8 px-4 lg:py-12 lg:px-20 overflow-x-hidden">
      <BackgroundChaos />
      <RabbishToastProvider />

      {/* Brand Header: Huge, Messy, Colorful */}
<header className="relative z-10 flex flex-col items-center mb-6 lg:mb-12">
  <motion.div 
    initial={{ scale: 0.5, rotate: -20 }}
    animate={{ scale: 1, rotate: -3 }}
    className="relative p-5 overflow-hidden"
  >
    {/* 4. THE HEADER TEXT */}
 <h1 
  className="relative z-10 text-6xl lg:text-8xl font-black tracking-tighter text-black uppercase leading-none px-12 py-8 transition-all"
  style={{
    filter: 'url(#inkBleed)',
    backgroundColor: '#ffffff',
    // This creates the heavy gritty texture seen in your reference
    backgroundImage: `url("https://www.transparenttextures.com/patterns/asfalt-dark.png"), url("https://www.transparenttextures.com/patterns/dust.png")`,
    backgroundBlendMode: 'multiply',
    // The "Paper Tear" shape from your reference
    boxShadow: '10px 10px 0px rgba(0,0,0,0.1)'
  }}
>
  Rabbish
</h1>
  </motion.div>
  
  <div className="mt-4 bg-[#40262F] text-white px-6 py-2 text-2xl font-sketch rotate-2 shadow-lg z-30">
   Experimenting Trash.
  </div>
</header>
      {/* Main Grid: Responsive column handling */}
      <main className="relative z-10 grid grid-cols-1  gap-12 lg:gap-8 items-end">

        {/* ART SECTION: Responsive Character anchoring */}


        {/* FLOW SECTION: Centered on mobile, tilted on desktop */}
        <div className="lg:col-span-5 mb-12 lg:mb-0">
          <div className="lg:rotate-3 lg:scale-105 transform-gpu">
            <WhitelistFlow />
          </div>
        </div>

      </main>

      {/* Floating Interactive Trash Piece: Scaled for mobile */}
      <motion.div
        drag
        dragConstraints={{ left: -20, right: 20, top: -20, bottom: 20 }}
        whileDrag={{ scale: 1.2, rotate: 360 }}
        className="fixed bottom-6 right-6 lg:bottom-10 lg:right-10 w-24 h-24 lg:w-32 h-32 cursor-grab active:cursor-grabbing z-50 group"
      >
        <img src="/logo.png" className="w-full drop-shadow-2xl" alt="trash friend" />
        <div className="absolute -top-4 -right-4 bg-white border-2 border-black rounded-full px-2 py-1 text-[10px] lg:text-xs font-bold opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
          HEY RETARD!
        </div>
      </motion.div>
      <svg className="hidden">
  <filter id="inkBleed">
    <feTurbulence type="fractalNoise" baseFrequency="0.03" numOctaves="4" result="noise" />
    <feDisplacementMap in="SourceGraphic" in2="noise" scale="8" />
  </filter>
</svg>
    </div>
  );
}

export default App;