import { useRef, useState, useEffect, useCallback } from "react";

export function useCustomScrollbar(deps: any[] = []) {
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const [scrollPercentage, setScrollPercentage] = useState(0);
  const [showScrollbar, setShowScrollbar] = useState(false);
  const [isDragging, setIsDragging] = useState(false);
  const [containerRect, setContainerRect] = useState<DOMRect | null>(null);

  useEffect(() => {
    const container = scrollContainerRef.current;
    if (!container) return;

    const handleScroll = () => {
      const scrollLeft = container.scrollLeft;
      const maxScrollLeft = container.scrollWidth - container.clientWidth;

      if (maxScrollLeft <= 0) {
        setScrollPercentage(0);
        return;
      }

      const percentage = (scrollLeft / maxScrollLeft) * 100;
      setScrollPercentage(Math.min(100, Math.max(0, percentage)));
    };

    const updatePosition = () => {
      const rect = container.getBoundingClientRect();
      setContainerRect(rect);
      setShowScrollbar(container.scrollWidth > container.clientWidth);
      handleScroll();
    };

    // Initial update
    updatePosition();

    // Watch for size changes
    const resizeObserver = new ResizeObserver(() => {
      updatePosition();
    });

    resizeObserver.observe(container);

    container.addEventListener("scroll", handleScroll);
    window.addEventListener("resize", updatePosition);
    window.addEventListener("scroll", updatePosition, true);

    return () => {
      resizeObserver.disconnect();
      container.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", updatePosition);
      window.removeEventListener("scroll", updatePosition, true);
    };
  }, deps);

  const handleScrollbarClick = useCallback(
    (e: React.MouseEvent<HTMLDivElement>) => {
      const container = scrollContainerRef.current;
      if (!container || isDragging) return;

      const scrollbarTrack = e.currentTarget;
      const clickPosition =
        e.clientX - scrollbarTrack.getBoundingClientRect().left;
      const trackWidth = scrollbarTrack.offsetWidth;
      const scrollPercentage = clickPosition / trackWidth;
      const scrollLeft =
        (container.scrollWidth - container.clientWidth) * scrollPercentage;

      container.scrollTo({ left: scrollLeft, behavior: "smooth" });
    },
    [isDragging]
  );

  const handleScroll = (direction: "forward" | "back") => {
    const container = scrollContainerRef.current;
    if (!container) return;

    // Scroll by 80% of visible width (adjust percentage as needed)
    const scrollAmount = container.clientWidth * 0.8;

    container.scrollBy({
      left: direction === "forward" ? scrollAmount : -scrollAmount,
      behavior: "smooth",
    });
  };

  const handleThumbMouseDown = useCallback(
    (e: React.MouseEvent) => {
      e.preventDefault();
      e.stopPropagation();
      setIsDragging(true);

      const container = scrollContainerRef.current;
      if (!container || !containerRect) return;

      const startX = e.clientX;
      const startScrollLeft = container.scrollLeft;
      const scrollWidth = container.scrollWidth - container.clientWidth;

      const handleMouseMove = (moveEvent: MouseEvent) => {
        const deltaX = moveEvent.clientX - startX;
        const deltaPercentage = (deltaX / containerRect.width) * 100;
        const newScrollLeft =
          startScrollLeft + (scrollWidth * deltaPercentage) / 100;
        container.scrollLeft = Math.max(
          0,
          Math.min(scrollWidth, newScrollLeft)
        );
      };

      const handleMouseUp = () => {
        setIsDragging(false);
        document.removeEventListener("mousemove", handleMouseMove);
        document.removeEventListener("mouseup", handleMouseUp);
      };

      document.addEventListener("mousemove", handleMouseMove);
      document.addEventListener("mouseup", handleMouseUp);
    },
    [containerRect]
  );

  const getThumbWidth = useCallback(() => {
    const container = scrollContainerRef.current;
    if (!container) return 10;

    const visibleWidth = container.clientWidth; // Visible area
    const totalWidth = container.scrollWidth; // Total scrollable width

    const visibleRatio = visibleWidth / totalWidth;
    const thumbWidth = visibleRatio * 100;

    // Minimum 5% width, maximum 100%
    return Math.max(1, Math.min(100, thumbWidth));
  }, []);

  useEffect(() => {
    const container = scrollContainerRef.current;
    if (!container) return;
  }, [scrollPercentage]);

  return {
    scrollContainerRef,
    scrollPercentage,
    showScrollbar,
    handleScrollbarClick,
    handleScroll,
    handleThumbMouseDown,
    getThumbWidth,
    containerRect,
    isDragging,
  };
}
