"use client";

import { useRouter } from "next/navigation";
import Arrow from "./icons/Arrow";

const NavArrows = () => {
  const router = useRouter();
  return (
    <nav className="flex gap-3">
      <button onClick={router.back}>
        <Arrow className="w-5 h-5" />
      </button>
      <button onClick={router.forward}>
        <Arrow className="w-5 h-5 rotate-180" />
      </button>
    </nav>
  );
};

export default NavArrows;
