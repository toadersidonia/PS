import { useState, useRef, useEffect, type ReactNode } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";
import { userService } from "../services/userService";
import { useScore } from "../contexts/ScoreContext";

export const AppShell = ({ children }: { children: ReactNode }) => {
  const location = useLocation();
  const navigate = useNavigate();
  const { user, logout } = useAuth();

  const { refreshKey } = useScore();

  const [score, setScore] = useState(0);
  const [menuOpen, setMenuOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setMenuOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () =>
      document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  useEffect(() => {
    const load = async () => {
      if (!user?.id) return;

      const s = await userService.getUserScore(user.id);
      setScore(s);
    };

    load();
  }, [user, refreshKey]);

  const handleLogout = () => {
    logout();
    setMenuOpen(false);
    navigate("/auth");
  };

  const getInitial = (username?: string) =>
    username ? username.charAt(0).toUpperCase() : "?";

  return (
    <div className="min-h-screen text-gray-800 bg-gradient-to-br from-[#f5e9ff] via-[#fbe4ff] via-[#ffe9e9] to-[#fff3e6] flex flex-col">

      {/* NAVBAR */}
      <header className="h-[70px] sticky top-0 z-50 grid grid-cols-3 items-center px-6 bg-white/60 backdrop-blur-xl border-b border-black/5">

        <div className="font-bold text-xl bg-gradient-to-r from-pink-500 to-purple-500 bg-clip-text text-transparent">
          InstaLite
        </div>

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
            to="/my-posts"
            className={`px-3 py-2 rounded-full transition ${
              location.pathname === "/my-posts"
                ? "bg-gradient-to-br from-pink-500 to-purple-500 text-white"
                : "text-gray-500 hover:bg-pink-100 hover:text-pink-600"
            }`}
          >
            My Posts
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

        {/* USER */}
        <div className="flex justify-end relative" ref={menuRef}>

          <button
            onClick={() => setMenuOpen((p) => !p)}
            className="w-9 h-9 rounded-full bg-gradient-to-br from-pink-400 to-purple-500 text-white font-semibold flex items-center justify-center"
          >
            {getInitial(user?.username)}
          </button>

          {menuOpen && (
            <div className="absolute right-0 top-12 w-56 bg-white rounded-2xl shadow-xl border border-pink-100 overflow-hidden">

              <div className="px-4 py-3 bg-gradient-to-r from-pink-50 to-purple-50">

                <p className="text-sm font-semibold">{user?.username}</p>
                <p className="text-xs text-gray-500">{user?.email}</p>

                <div className="mt-1 text-xs text-gray-500">
                  Score: {score}
                </div>

              </div>

              <button
                onClick={handleLogout}
                className="w-full px-4 py-3 text-left hover:bg-pink-50"
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