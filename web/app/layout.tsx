import "./globals.css";
import type { Metadata } from "next";
import SearchBar from "../components/SearchBar";
import NavArrows from "../components/NavArrows";
import ThreeDots from "../icons/ThreeDots";

import Sidebar from "../components/Sidebar";

export const metadata: Metadata = {
  title: "Podcast Search",
  description: "Search for your favorite podcasts",
  icons: { icon: { url: "./favicon.svg" } },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="min-h-screen bg-background text-white/70 flex">
        {/* Sidebar */}
        <Sidebar />
        {/* Main content */}
        <div className="flex-1 md:ml-[225px] flex flex-col">
          {/* Header */}
          <div className="flex gap-3 py-2 px-4 items-center sticky z-20 bg-background top-0">
            <NavArrows />
            <SearchBar />
            <div className="md:flex hidden gap-2 text-[13px] ml-auto md:!w-[168px] items-center">
              <button className="btn-gradient py-1 flex-1">Log in</button>
              <button className="btn-gradient  py-1 flex-1">Sign up</button>
            </div>
            <span>
              <ThreeDots className="h-full fill-white/70 hover:fill-white cursor-pointer" />
            </span>
          </div>

          {/* Page content */}
          <main className="flex-1  py-6 w-[calc(100vw-20px)] md:max-w-[calc(100vw-250px)]">
            {children}
          </main>
        </div>
      </body>
    </html>
  );
}
