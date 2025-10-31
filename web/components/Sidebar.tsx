"use client";

import Link from "next/link";
import Home from "../components/icons/Home";
import Discover from "../components/icons/Discover";
import { useState } from "react";

const sideLinks = [
  { title: "Home", link: "/", icon: Home, activeColor: "#BA6FDE" },
  { title: "Discover", link: "/", icon: Discover, activeColor: "#3ADEE6" },
];
const Sidebar = () => {
  const [activelink, setActiveLink] = useState<number>();

  return (
    <nav
      className="
      w-[225px] 
      h-screen 
      hidden
      fixed top-0 left-0 
      border-r border-r-border-subtle 
      bg-background-sidebar 
      px-4 py-6
      md:flex flex-col
      z-20
    "
    >
      <Link href="/" className="flex items-center ">
        <img alt="logo" className="w-12 h-12" src="logo.svg" />
      </Link>

      <div className="flex flex-col text-white font-semibold mt-12 text-sm gap-4">
        {sideLinks.map((item, index) => {
          const Icon = item.icon;
          return (
            <span
              key={index}
              className="flex items-center gap-3 relative cursor-pointer"
              style={{
                color: (index === activelink && item.activeColor) || "",
              }}
              onClick={() => setActiveLink(index)}
            >
              <span
                className="absolute left-0 w-full h-[200%] "
                style={{
                  background:
                    (index === activelink &&
                      `radial-gradient(50% 25% at 0% 50%, ${item.activeColor}33 0%, rgba(19, 241, 255, 0) 100%)`) ||
                    "",
                }}
              ></span>
              <Icon active={index === activelink} />
              {item.title}
            </span>
          );
        })}
      </div>
    </nav>
  );
};

export default Sidebar;
