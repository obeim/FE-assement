"use client";

import { useRouter } from "next/navigation";
import Arrows from "./Arrows";

// hoc that use arrows component and provide back and forward functions
const NavArrows = () => {
  const router = useRouter();
  return <Arrows back={router.back} forward={router.forward} />;
};

export default NavArrows;
