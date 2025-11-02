"use client";

import Link from "next/link";
import Home from "../icons/Home";
import Discover from "../icons/Discover";
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
      px-4 py-4
      md:flex flex-col
      z-20
    "
    >
      <Link href="/" className="flex items-center ">
        <img alt="logo" className="w-[45px] h-[49.45]" src="logo.svg" />
      </Link>

      <div className="flex flex-col text-white font-semibold mt-[38px] text-sm gap-4">
        {sideLinks.map((item, index) => {
          return (
            <SidebarItem
              key={index}
              item={item}
              index={index}
              activeItem={activelink}
              onClick={() => setActiveLink(index)}
            />
          );
        })}
      </div>
    </nav>
  );
};

export default Sidebar;

function SidebarItem({
  item,
  activeItem,
  index,
  onClick,
}: {
  item: (typeof sideLinks)[0];
  onClick: () => void;
  activeItem: number | undefined;
  index: number;
}) {
  const Icon = item.icon;

  return (
    <span
      key={index}
      className="flex items-center gap-[10px] relative cursor-pointer text-[14px] px-1"
      style={{
        color: (index === activeItem && item.activeColor) || "",
      }}
      onClick={onClick}
    >
      <span
        className="absolute left-0 w-full h-[200%] "
        style={{
          background:
            (index === activeItem &&
              `radial-gradient(50% 25% at 0% 50%, ${item.activeColor}33 0%, rgba(19, 241, 255, 0) 100%)`) ||
            "",
        }}
      ></span>
      <Icon active={index === activeItem} />
      {item.title}
    </span>
  );
}
