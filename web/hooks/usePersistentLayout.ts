import { useEffect, useState } from "react";
import { Listinglayouts } from "../types/podcast";

const usePersistentLayout = (key: string, defaultLayout: Listinglayouts) => {
  const [layout, setLayout] = useState<Listinglayouts>(defaultLayout);
  const [isInitialized, setIsInitialized] = useState(false);

  // Load from localStorage on mount
  useEffect(() => {
    const savedLayout = localStorage.getItem(key) as Listinglayouts;
    if (savedLayout) {
      setLayout(savedLayout);
    }
    setIsInitialized(true);
  }, [key]);

  // Save to localStorage whenever layout changes (after initialization)
  useEffect(() => {
    if (isInitialized) {
      localStorage.setItem(key, layout);
    }
  }, [layout, key, isInitialized]);

  return { layout, setLayout, isInitialized };
};

export default usePersistentLayout;
