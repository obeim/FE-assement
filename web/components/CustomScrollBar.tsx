import { createPortal } from "react-dom";
import { useEffect, useState } from "react";

interface CustomScrollbarProps {
  scrollPercentage: number;
  thumbWidth: number;
  onScrollbarClick: (e: React.MouseEvent<HTMLDivElement>) => void;
  onThumbMouseDown: (e: React.MouseEvent<HTMLDivElement>) => void;
  containerRect: DOMRect | null;
  isDragging: boolean;
}
export function CustomScrollbar({
  scrollPercentage,
  thumbWidth,
  onScrollbarClick,
  onThumbMouseDown,
  containerRect,
  isDragging,
}: CustomScrollbarProps) {
  const [mounted, setMounted] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted || !containerRect) return null;

  // Calculate actual pixel widths
  const trackWidth = containerRect.width;
  const thumbWidthPx = (thumbWidth / 100) * trackWidth;
  const maxTranslatePx = trackWidth - thumbWidthPx;
  const translateXPx = (scrollPercentage / 100) * maxTranslatePx;

  return createPortal(
    <div
      className="fixed bg-white/5 rounded-full cursor-pointer z-50 transition-all duration-200"
      style={{
        left: `${containerRect.left}px`,
        top: `${containerRect.bottom + 16}px`,
        width: `${trackWidth}px`,
        height: isHovered || isDragging ? "8px" : "4px", // Smaller when not hovered
      }}
      onClick={onScrollbarClick}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div
        className={`h-full bg-white/20 rounded-full transition-all duration-200 bg-gradient-to-bl 
            from-[#533E7D] to-[#6B4080]
          ${isDragging ? "cursor-grabbing" : "cursor-grab"}`}
        style={{
          width: `${thumbWidthPx}px`,
          transform: `translateX(${translateXPx}px)`,
          transition: isDragging ? "none" : "all 0.2s",
        }}
        onMouseDown={onThumbMouseDown}
      />
    </div>,
    document.body
  );
}
