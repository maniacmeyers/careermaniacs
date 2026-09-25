import { useState } from 'react';
import { TextGradient } from './text-gradient';

export default function TextGradientDemo() {
  const [paused, setPaused] = useState(false);
  return <div className="flex min-h-[320px] flex-col items-center justify-center gap-3 bg-background px-6 text-center">
    <TextGradient as="h1" paused={paused} className="text-4xl font-bold tracking-tight sm:text-6xl">The story is the method.</TextGradient>
    <button type="button" className="text-link" aria-pressed={paused} onClick={() => setPaused(!paused)}>{paused ? 'Resume text animation' : 'Pause text animation'}</button>
  </div>;
}
