import { motion, useMotionValue, useTransform } from "framer-motion";

export const RetardDrag = () => {
  return (
    <div className="fixed bottom-10 right-10 z-50 group">
      <motion.div
        drag
        dragConstraints={{ left: -300, right: 0, top: -300, bottom: 0 }}
        whileDrag={{ scale: 1.5, rotate: 360 }}
        className="cursor-grab active:cursor-grabbing"
      >
        <img src="/thick_18.png" className="w-32 h-32 drop-shadow-2xl" />
        <div className="absolute -top-10 left-0 bg-white border-2 border-black p-1 text-xs rotate-12 group-hover:block hidden">
            I AM LOST!!
        </div>
      </motion.div>
    </div>
  );
};