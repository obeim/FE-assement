import { useEffect, useState } from "react";
import { Listinglayouts } from "../types/podcast";

const usePersistentLayout = (key: string, defaultLayout: Listinglayouts) => {
  const [layout, setLayout] = useState<Listinglayouts>();

  useEffect(() => {
    setLayout((localStorage.getItem(key) as Listinglayouts) || defaultLayout);
  }, [key, defaultLayout]);

  return {
    layout,
    setLayout: (value: Listinglayouts) => {
      setLayout(value);
      localStorage.setItem(key, value);
    },
  };
};

export default usePersistentLayout;
