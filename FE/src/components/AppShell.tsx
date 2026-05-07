import { ReactNode } from "react";
import { Link, useLocation } from "react-router-dom";
import "../styles/App.css";

export const AppShell = ({ children }: { children: React.ReactNode }) => {
  const location = useLocation();

  return (
    <div className="min-h-screen text-gray-800 bg-gradient-to-br from-[#f5e9ff] via-[#fbe4ff] via-[#ffe9e9] to-[#fff3e6] flex flex-col">

      {/* NAVBAR */}
     <header className="h-[70px] sticky top-0 z-50 grid grid-cols-3 items-center px-6 bg-white/60 backdrop-blur-xl border-b border-black/5">

        {/* LEFT */}
        <div className="font-bold text-xl bg-gradient-to-r from-pink-500 to-purple-500 bg-clip-text text-transparent">
          InstaLite
        </div>

        {/* CENTER */}
        <nav className="flex justify-center gap-3">
          <Link
            to="/"
            className={`px-3 py-2 rounded-full transition ${
              location.pathname === "/"
                ? "bg-gradient-to-br from-pink-500 to-purple-500 text-white"
                : "text-gray-500 hover:bg-pink-100 hover:text-pink-600"
            }`}
          >
            Feed
          </Link>

          <Link
            to="/moderator"
            className={`px-3 py-2 rounded-full transition ${
              location.pathname === "/moderator"
                ? "bg-gradient-to-br from-pink-500 to-purple-500 text-white"
                : "text-gray-500 hover:bg-pink-100 hover:text-pink-600"
            }`}
          >
            Moderator
          </Link>
        </nav>

        {/* RIGHT */}
        <div className="flex justify-end">
          <div className="w-9 h-9 rounded-full bg-gradient-to-br from-pink-400 to-purple-500" />
        </div>
      </header>

      {/* CONTENT */}
      <main className="flex-1 overflow-y-auto">
        <div className="max-w-2xl mx-auto px-4 py-6">
          {children}
        </div>
      </main>

    </div>
  );
};