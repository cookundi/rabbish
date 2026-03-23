import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { SketchButton } from './SketchButton';
import toast from 'react-hot-toast';

const STEPS = [
  { id: 'x_username', label: 'Follow @RabbishETH', taskUrl: 'https://x.com/RabbishETH', placeholder: 'X Username' },
  { id: 'rt_link', label: 'Like + RT Pinned', taskUrl: 'https://x.com/post/1', placeholder: 'Paste RT Link' },
  { id: 'comment_link', label: 'Comment EVM + Tag 2', taskUrl: 'https://x.com/post/1/comments', placeholder: 'Paste Comment Link' },
  { id: 'wallet', label: 'Submit EVM Wallet', taskUrl: null, placeholder: '0x...' }
];

export const WhitelistFlow = () => {
  const [currentStep, setStep] = useState(0);
  const [verifying, setVerifying] = useState(false);
  const [unlocked, setUnlocked] = useState(false);
  const [val, setVal] = useState('');
  const [refLink, setRefLink] = useState('');
  const [userData, setUserData] = useState({ x_username: '', wallet: '', rt_link: '', comment_link: '' });

  const [referrer, setReferrer] = useState<string | null>(null);
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const ref = params.get('ref');
    if (ref) setReferrer(ref);
  }, []);

  // Sync val with stored data when moving between steps
  useEffect(() => {
    const stepId = STEPS[currentStep].id as keyof typeof userData;
    setVal(userData[stepId] || '');
    
    // Auto-prefix @ for username if we just unlocked it
    if (currentStep === 0 && unlocked && !userData.x_username) {
      setVal('@');
    }
  }, [currentStep, unlocked]);

  const isStepValid = () => {
    if (currentStep === 0) return val.startsWith('@') && val.length > 3;
    if (currentStep === 1 || currentStep === 2) return val.includes('x.com') || val.includes('t.co');
    if (currentStep === 3) return /^0x[a-fA-F0-9]{40}$/.test(val);
    return false;
  };

  const handleTaskClick = (url: string) => {
    window.open(url, '_blank');
    setVerifying(true);
    toast("DIGGING IN THE TRASH...", { icon: '🔥' });
    setTimeout(() => {
      setVerifying(false);
      setUnlocked(true);
      toast.success("INPUT UNLOCKED!");
    }, 3000);
  };

  const next = async () => {
    if (!isStepValid()) {
      toast.error("Don't cheat the trash!");
      return;
    }

    // 1. SAVE the current value into the correct field
    const stepId = STEPS[currentStep].id;
    const updatedData = { ...userData, [stepId]: val };
    setUserData(updatedData);

    if (currentStep < STEPS.length - 1) {
      setStep(currentStep + 1);
      // We don't setVal('') here anymore; the useEffect handles it
      setUnlocked(currentStep + 1 === 3); 
    } else {
      // FINAL SUBMISSION
      setVerifying(true);
      try {
        const response = await fetch('/.netlify/functions/submit', {
          method: 'POST',
          body: JSON.stringify({
            wallet: updatedData.wallet,
            x_username: updatedData.x_username,
            rt_link: updatedData.rt_link,
            comment_link: updatedData.comment_link,
            referred_by: referrer
          }),
        });
        const data = await response.json();
        
        if (data.success) {
          const baseUrl = window.location.origin;
          const cleanUsername = updatedData.x_username.replace('@', '');
          setRefLink(`${baseUrl}/?ref=${cleanUsername}`);
          toast.success('DUMPED INTO THE LANDFILL!');
        } else {
          throw new Error(data.error);
        }
      } catch (err) {
        toast.error("Database is full of actual trash. Try again.");
      } finally {
        setVerifying(false);
      }
    }
  };

  const back = () => {
    if (currentStep > 0) {
      setStep(currentStep - 1);
      setUnlocked(true); // Since they already did the task
    }
  };

  if (refLink) {
    return (
      <div className="p-10 bg-[#C5BAB3] paper-tear burning-edge text-center shadow-2xl rotate-1">
        <h2 className="text-4xl font-black mb-4">YOU ARE TRASH NOW</h2>
        <p className="mb-4">Invite more Rabbishes to the pile:</p>
        <div className="bg-black text-yellow-400 p-4 break-all mb-6 font-mono text-sm">
          {refLink}
        </div>
        <SketchButton className="w-full" onClick={() => {navigator.clipboard.writeText(refLink); toast.success("COPIED")}}>
          COPY REF LINK
        </SketchButton>
      </div>
    );
  }

  return (
    <div className="relative group max-w-lg mx-auto">
      <motion.div initial={{ rotate: 8 }} className="relative p-1 bg-gradient-to-br from-red-600 via-orange-500 to-black paper-tear burning-edge shadow-2xl">
        <div className="p-10 bg-[#C5BAB3] paper-tear min-h-[480px] flex flex-col justify-between relative overflow-hidden">
          <div className="relative z-10">
            <h2 className="text-3xl md:text-4xl font-black text-black uppercase -rotate-2 mb-8">
              Get <span className="bg-[#40262F] text-white px-2 italic">Rabbished</span>
            </h2>
            
            <AnimatePresence mode="wait">
              <motion.div key={currentStep} initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }}>
                <p className="text-2xl font-bold border-b-4 border-dashed border-[#40262F] pb-1 mb-8">
                    {STEPS[currentStep].label}
                </p>
                
                {verifying ? (
                  <div className="py-12 text-center italic text-2xl text-red-600 animate-pulse">
                    VERIFYING...
                  </div>
                ) : (
                  <div className="space-y-6">
                    {!unlocked && STEPS[currentStep].taskUrl && !val && (
                        <SketchButton className="w-full py-8 text-2xl" onClick={() => handleTaskClick(STEPS[currentStep].taskUrl!)}>
                            OPEN X.COM
                        </SketchButton>
                    )}

                    {(unlocked || currentStep === 3 || val) && (
                      <input 
                        autoFocus
                        placeholder={STEPS[currentStep].placeholder}
                        className="w-full bg-transparent border-b-8 border-black p-4 text-2xl font-black focus:outline-none placeholder:opacity-20"
                        value={val}
                        onChange={(e) => setVal(e.target.value)}
                      />
                    )}
                  </div>
                )}
              </motion.div>
            </AnimatePresence>
          </div>

          <div className="flex items-center justify-between pt-10">
            {currentStep > 0 && (
              <button onClick={back} className="underline text-red-600 font-bold">BACK</button>
            )}
            <SketchButton 
              onClick={next} 
              disabled={!isStepValid() || verifying}
              className={`flex-1 ml-4 text-2xl ${!isStepValid() ? 'opacity-20' : ''}`}
            >
              {currentStep === STEPS.length - 1 ? 'DUMP IT' : 'VERIFY →'}
            </SketchButton>
          </div>
        </div>
      </motion.div>
    </div>
  );
};