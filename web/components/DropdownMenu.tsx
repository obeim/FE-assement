"use client";
import { useState, useRef, useEffect } from "react";
import ThreeDots from "./icons/ThreeDots";

interface DropdownOption {
  label: string;
  onClick: () => void;
}

interface DropdownMenuProps {
  options: DropdownOption[];
  className?: string;
}

export default function DropdownMenu({
  options,
  className,
}: DropdownMenuProps) {
  const [open, setOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className={`relative inline-block ${className}`} ref={menuRef}>
      <button
        onClick={() => setOpen((prev) => !prev)}
        className="p-2 rounded-full transition"
      >
        <ThreeDots className="fill-white/40 hover:fill-white cursor-pointer h-5 z-10" />
      </button>
      <div
        className={`absolute top-7 right-1 mt-2 w-52 origin-top-right rounded shadow-lg z-50
          bg-gradient-to-tr from-[#404080] to-[#6B4080] transform-gpu
          transition-all duration-150 ease-out will-change-transform
          ${
            open
              ? "opacity-100 scale-100 translate-y-0 pointer-events-auto"
              : "opacity-0 scale-95 -translate-y-1 pointer-events-none"
          }`}
      >
        <span
          aria-hidden="true"
          className="pointer-events-none"
          style={{
            position: "absolute",
            bottom: "100%",
            right: "10px",
            width: 0,
            height: 0,
            borderStyle: "solid",
            borderWidth: "5px",
            borderColor: "rgba(136, 183, 213, 0)",
            borderBottomColor: "hsl(279, 23%, 46%)",
          }}
        />
        <ul className="p-1">
          {options.map((option, i) => (
            <Option
              {...option}
              onClick={() => {
                option.onClick();
                setOpen(false);
              }}
              isLast={i < options.length - 1}
              key={i}
            />
          ))}
        </ul>
      </div>
    </div>
  );
}

interface OptionProps extends DropdownOption {
  isLast: boolean;
}
const Option = ({ isLast, onClick, label }: OptionProps) => {
  return (
    <li>
      <button
        onClick={() => {
          onClick();
        }}
        className="block w-full text-left p-2 text-[14px] text-gray-200 
               hover:bg-background-accent/30 rounded-md transition"
      >
        {label}
      </button>
      {isLast && (
        <div className="bg-gradient-to-r from-white/0 via-white/10 to-white/0 h-[1px] my-[2px] mx-[5px]"></div>
      )}
    </li>
  );
};
