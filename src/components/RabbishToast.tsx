import { Toaster, toast } from 'react-hot-toast';
import { motion } from 'framer-motion';

export const RabbishToastProvider = () => {
  return (
    <Toaster position="top-right">
      {(t) => (
        <motion.div
          initial={{ y: -20, opacity: 0, scale: 0.9, rotate: -2 }}
          animate={{ y: 0, opacity: 1, scale: 1, rotate: t.visible ? 0 : -2 }}
          exit={{ opacity: 0, scale: 0.5 }}
          className="relative px-6 py-4 min-w-[200px]"
        >
          {/* Hand-drawn SVG Background Overlay */}
          <svg className="absolute inset-0 w-full h-full -z-10" viewBox="0 0 200 60" preserveAspectRatio="none">
            <path
              d="M5,10 Q10,5 100,8 T190,12 Q195,30 192,50 T100,55 Q10,52 8,30 T5,10"
              fill="white"
              stroke="#1e293b"
              strokeWidth="2"
            />
          </svg>
          
          <div className="font-sketch text-brand-ink flex items-center gap-2">
            {t.type === 'success' ? '✓' : '⚠'}
            {t.message as string}
          </div>
        </motion.div>
      )}
    </Toaster>
  );
};