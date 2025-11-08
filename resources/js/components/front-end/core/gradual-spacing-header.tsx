import { AnimatePresence, motion, useInView } from 'motion/react';
import { useRef } from 'react';

function GradualSpacingHeader({ text, className }: { text: string; className?: string }) {
    const ref = useRef(null);
    const isInView = useInView(ref);
    return (
        <div className="flex justify-center space-x-1">
            <AnimatePresence>
                {text.split('').map((char, i) => (
                    <motion.p
                        ref={ref}
                        key={i}
                        initial={{ opacity: 0, x: -18 }}
                        animate={isInView ? { opacity: 1, x: 0 } : {}}
                        exit="hidden"
                        transition={{ duration: 0.5, delay: i * 0.1 }}
                        className={`font-merriweather mb-20 text-center text-4xl font-bold tracking-tighter sm:text-4xl md:text-6xl md:leading-[4rem] ${className ? className : ''}`}
                    >
                        {char === ' ' ? <span>&nbsp;</span> : char}
                    </motion.p>
                ))}
            </AnimatePresence>
        </div>
    );
}

export default GradualSpacingHeader;
