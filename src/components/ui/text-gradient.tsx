"use client";

import { useEffect, useMemo, useState, type ElementType, type JSX } from 'react';
import { motion, useAnimationControls, type Transition } from 'framer-motion';
import { cn } from '@/lib/utils';

export type TextGradientProps = {
  children: string;
  as?: ElementType;
  className?: string;
  colors?: string[];
  duration?: number;
  angle?: number;
  transition?: Transition;
  paused?: boolean;
};

export function TextGradient({
  children, as: Component = 'p', className,
  colors = ['#6ce4bf', '#8bdafa', '#ffd3ad', '#6ce4bf'],
  duration = 8, angle = 135, transition, paused = false,
}: TextGradientProps) {
  const MotionComponent = useMemo(() => motion.create(Component as keyof JSX.IntrinsicElements), [Component]);
  const controls = useAnimationControls();
  const [reducedMotion, setReducedMotion] = useState(false);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const preference = window.matchMedia('(prefers-reduced-motion: reduce)');
    const update = () => setReducedMotion(preference.matches);
    update();
    preference.addEventListener('change', update);
    return () => preference.removeEventListener('change', update);
  }, []);

  useEffect(() => {
    if (reducedMotion) controls.set({ backgroundPosition: '0% 50%' });
    else if (visible && !paused) {
      void controls.start({ backgroundPosition: ['0% 50%', '100% 50%', '0% 50%'] });
    }
    return () => controls.stop();
  }, [controls, paused, reducedMotion, visible]);

  return <MotionComponent
    initial={false} animate={controls}
    onViewportEnter={() => setVisible(true)} onViewportLeave={() => setVisible(false)}
    className={cn('text-gradient inline-block bg-clip-text', className)}
    style={{
      color: 'transparent',
      backgroundImage: `linear-gradient(${angle}deg, ${[...colors, ...colors].join(', ')})`,
      backgroundSize: `${Math.max(colors.length, 1) * 100}% 100%`,
      backgroundPosition: '0% 50%',
    }}
    transition={{ duration, ease: 'linear', repeat: Infinity, ...transition }}
  >{children}</MotionComponent>;
}

export default TextGradient;
