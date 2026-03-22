import { motion } from 'framer-motion';

export const SketchButton = ({ onClick, children, className = "" }: any) => (
  <motion.button
    whileHover={{ scale: 1.02, rotate: -1 }}
    whileTap={{ scale: 0.98 }}
    onClick={onClick}
    className={`rough-border px-6 py-2 font-bold bg-white hover:bg-[#F2E9E4] transition-colors jitter ${className}`}
  >
    {children}
  </motion.button>
);