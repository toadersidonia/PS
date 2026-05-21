import { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import { userService } from "../services/userService";
import { useAuth } from "../hooks/useAuth";
import type { User } from "../types";

export default function Moderator() {
  const { user: currentUser } = useAuth();
  const [users, setUsers] = useState<User[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [actionLoading, setActionLoading] = useState<string | null>(null);

  useEffect(() => {
    loadUsers();
  }, []);

  const loadUsers = async () => {
    setIsLoading(true);
    setError(null);
    try {
      const data = await userService.getAllUsers();
      setUsers(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to load users");
    } finally {
      setIsLoading(false);
    }
  };

  const handleBan = async (userId: string) => {
    setActionLoading(userId);
    try {
      const updated = await userService.banUser(userId);
      setUsers((prev) => prev.map((u) => (u.id === userId ? updated : u)));
    } catch (err) {
      alert(err instanceof Error ? err.message : "Failed to ban user");
    } finally {
      setActionLoading(null);
    }
  };

  const handleUnban = async (userId: string) => {
    setActionLoading(userId);
    try {
      const updated = await userService.unbanUser(userId);
      setUsers((prev) => prev.map((u) => (u.id === userId ? updated : u)));
    } catch (err) {
      alert(err instanceof Error ? err.message : "Failed to unban user");
    } finally {
      setActionLoading(null);
    }
  };

  // Permite acces doar la useri cu rol MODERATOR sau ADMIN
  if (currentUser && currentUser.role !== "MODERATOR" && currentUser.role !== "ADMIN") {
    return <Navigate to="/" replace />;
  }

  if (isLoading) {
    return (
      <div className="flex items-center justify-center py-20">
        <div className="text-center">
          <div className="mb-4 h-12 w-12 mx-auto animate-spin rounded-full border-4 border-pink-500 border-t-transparent"></div>
          <p className="text-pink-700">Loading users...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="text-center">
        <h1 className="text-3xl font-bold bg-gradient-to-r from-pink-500 to-purple-500 bg-clip-text text-transparent">
          Moderator Panel
        </h1>
        <p className="mt-2 text-gray-600">Manage users and content</p>
      </div>

      {error && (
        <div className="bg-red-50 border border-red-200 text-red-700 text-sm rounded-2xl px-4 py-3">
          {error}
        </div>
      )}

      <div className="bg-white/80 backdrop-blur-sm rounded-3xl shadow-xl border border-pink-100 overflow-hidden">
        <div className="px-6 py-4 bg-gradient-to-r from-pink-50 to-purple-50 border-b border-pink-100">
          <h2 className="text-lg font-semibold text-gray-800">
            All Users ({users.length})
          </h2>
        </div>

        <div className="divide-y divide-pink-50">
          {users.map((u) => (
            <div
              key={u.id}
              className={`flex items-center justify-between gap-4 px-6 py-4 transition-colors ${
                u.banned ? "bg-red-50/50" : "hover:bg-pink-50/50"
              }`}
            >
              <div className="flex items-center gap-4 flex-1 min-w-0">
                <div className="w-12 h-12 rounded-full bg-gradient-to-br from-pink-400 to-purple-500 text-white font-semibold flex items-center justify-center shadow-md shrink-0">
                  {u.username.charAt(0).toUpperCase()}
                </div>
                <div className="min-w-0 flex-1">
                  <div className="flex items-center gap-2">
                    <p className="font-semibold text-gray-800 truncate">
                      {u.username}
                    </p>
                    {u.banned && (
                      <span className="px-2 py-0.5 text-xs font-medium rounded-full bg-red-100 text-red-700">
                        Banned
                      </span>
                    )}
                    <span className={`px-2 py-0.5 text-xs font-medium rounded-full ${
                      u.role === "MODERATOR" || u.role === "ADMIN"
                        ? "bg-purple-100 text-purple-700"
                        : "bg-pink-100 text-pink-700"
                    }`}>
                      {u.role}
                    </span>
                  </div>
                  <p className="text-sm text-gray-500 truncate">{u.email}</p>
                  <p className="text-xs text-gray-400 mt-0.5">
                    Score: {u.score}
                  </p>
                </div>
              </div>

              <div className="shrink-0">
                {u.id === currentUser?.id ? (
                  <span className="text-xs text-gray-400 italic">You</span>
                ) : u.banned ? (
                  <button
                    type="button"
                    onClick={() => handleUnban(u.id)}
                    disabled={actionLoading === u.id}
                    className="px-4 py-2 rounded-2xl bg-gradient-to-r from-green-500 to-emerald-500 text-white text-sm font-medium shadow hover:shadow-lg transition-all disabled:opacity-50"
                  >
                    {actionLoading === u.id ? "..." : "Unban"}
                  </button>
                ) : (
                  <button
                    type="button"
                    onClick={() => handleBan(u.id)}
                    disabled={actionLoading === u.id}
                    className="px-4 py-2 rounded-2xl bg-gradient-to-r from-red-500 to-rose-500 text-white text-sm font-medium shadow hover:shadow-lg transition-all disabled:opacity-50"
                  >
                    {actionLoading === u.id ? "..." : "Ban"}
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}