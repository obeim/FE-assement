"use client";
import * as DropdownMenu from "@radix-ui/react-dropdown-menu";
import ThreeDots from "../icons/ThreeDots";

interface DropdownOption {
  label: string;
  onClick: () => void;
}

interface DropdownMenuProps {
  options: DropdownOption[];
  className?: string;
}

export default function CustomDropdownMenu({
  options,
  className,
}: DropdownMenuProps) {
  return (
    <DropdownMenu.Root>
      <DropdownMenu.Trigger asChild>
        <button
          className={`p-2 rounded-full outline-none transition ${className}`}
        >
          <ThreeDots className="fill-white/40 hover:fill-white cursor-pointer h-5" />
        </button>
      </DropdownMenu.Trigger>

      <DropdownMenu.Portal>
        <DropdownMenu.Content
          className="w-52 rounded shadow-lg z-[9999]
            bg-gradient-to-tr from-[#404080] to-[#6B4080]
            animate-in fade-in-0 zoom-in-95 data-[side=bottom]:slide-in-from-top-2"
          sideOffset={8}
          align="end"
        >
          {/* Arrow */}
          <DropdownMenu.Arrow
            className="fill-[hsl(279,23%,46%)]"
            width={10}
            height={5}
          />

          <div className="p-1">
            {options.map((option, i) => (
              <div key={i}>
                <DropdownMenu.Item
                  className="block w-full text-left p-2 text-[14px] text-gray-200 
                    hover:bg-background-accent/30 rounded-md transition outline-none cursor-pointer"
                  onSelect={option.onClick}
                >
                  {option.label}
                </DropdownMenu.Item>
                {i < options.length - 1 && (
                  <div className="bg-gradient-to-r from-white/0 via-white/10 to-white/0 h-[1px] my-[2px] mx-[5px]" />
                )}
              </div>
            ))}
          </div>
        </DropdownMenu.Content>
      </DropdownMenu.Portal>
    </DropdownMenu.Root>
  );
}
