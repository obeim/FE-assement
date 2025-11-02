"use client";

import { debounce } from "../utils/helpers";
import { useRef } from "react";
import { useSearchStore } from "../store/searchStore";
import { useSearchParams } from "next/navigation";

export default function SearchBar() {
  const { setTerm } = useSearchStore();
  const searchParams = useSearchParams();

  const debouncedSearch = useRef(
    debounce((value: string) => {
      setTerm(value);
    }, 400)
  ).current;

  return (
    <input
      type="text"
      placeholder="Search through over 70 million podcasts and episodes..."
      onChange={(e) => {
        debouncedSearch(e.target.value);
      }}
      defaultValue={searchParams?.get("q") || ""}
      onFocus={(e) => {
        if (!e.target.value) debouncedSearch(e.target.value);
      }}
      className="
      xl:w-[90%] md:w-[70%] w-full rounded-[10px] py-1 h-8 text-center text-white outline-none
      border border-white/30 bg-background-input placeholder:text-sm
      placeholder:text-white/40
      focus:border-border-accent focus:bg-white/5 focus:placeholder:opacity-0
    "
    />
  );
}
