import { useState, useRef, useEffect, type ReactNode } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";

export const AppShell = ({ children }: { children: ReactNode }) => {
  const location = useLocation();
  const navigate = useNavigate();
  const { user, logout } = useAuth();

  const [menuOpen, setMenuOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setMenuOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleLogout = () => {
    logout();
    setMenuOpen(false);
    navigate("/auth");
  };

  const getInitial = (username?: string): string => {
    return username ? username.charAt(0).toUpperCase() : "?";
  };

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

        {/* RIGHT - User Menu */}
        <div className="flex justify-end relative" ref={menuRef}>
          <button
            type="button"
            onClick={() => setMenuOpen((prev) => !prev)}
            className="w-9 h-9 rounded-full bg-gradient-to-br from-pink-400 to-purple-500 text-white font-semibold flex items-center justify-center shadow-md hover:shadow-lg transition-shadow"
            aria-label="User menu"
          >
            {getInitial(user?.username)}
          </button>

          {menuOpen && (
            <div className="absolute right-0 top-12 w-56 bg-white rounded-2xl shadow-xl border border-pink-100 overflow-hidden">
              <div className="px-4 py-3 bg-gradient-to-r from-pink-50 to-purple-50 border-b border-pink-100">
                <p className="text-sm font-semibold text-gray-800 truncate">
                  {user?.username}
                </p>
                <p className="text-xs text-gray-500 truncate">{user?.email}</p>
                <div className="mt-1 flex items-center gap-2">
                  <span className="inline-block px-2 py-0.5 text-xs font-medium rounded-full bg-pink-100 text-pink-700">
                    {user?.role}
                  </span>
                  <span className="text-xs text-gray-500">
                    Score: {user?.score ?? 0}
                  </span>
                </div>
              </div>

              <button
                type="button"
                onClick={handleLogout}
                className="w-full text-left px-4 py-3 text-sm text-gray-700 hover:bg-pink-50 transition-colors"
              >
                Sign Out
              </button>
            </div>
          )}
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