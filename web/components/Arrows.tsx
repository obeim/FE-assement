"use client";

import Arrow from "../icons/Arrow";

interface ArrowsProps {
  back: () => void;
  forward: () => void;
}
const Arrows = ({ back, forward }: ArrowsProps) => {
  return (
    <nav className="flex gap-3">
      <button onClick={back}>
        <Arrow className="w-5 h-5" />
      </button>
      <button onClick={forward}>
        <Arrow className="w-5 h-5 rotate-180" />
      </button>
    </nav>
  );
};

export default Arrows;
