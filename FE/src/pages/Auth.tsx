import { useState, type FormEvent } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";

type Mode = "login" | "register";

const inputClass =
  "w-full px-4 py-3 rounded-2xl border border-pink-200 bg-white/50 focus:outline-none focus:ring-2 focus:ring-pink-400 focus:border-transparent transition-all font-sans tracking-wider";

export default function Auth() {
  const navigate = useNavigate();
  const { login, register } = useAuth();

  const [mode, setMode] = useState<Mode>("login");
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const switchMode = (newMode: Mode) => {
    setMode(newMode);
    setError(null);
    setPassword("");
    setConfirmPassword("");
  };

  const validateForm = (): string | null => {
    if (!username.trim()) return "Username is required";
    if (username.length < 3) return "Username must be at least 3 characters";

    if (mode === "register") {
      if (!email.trim()) return "Email is required";
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(email)) return "Please enter a valid email";
    }

    if (!password) return "Password is required";
    if (password.length < 6) return "Password must be at least 6 characters";

    if (mode === "register" && password !== confirmPassword) {
      return "Passwords do not match";
    }

    return null;
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError(null);

    const validationError = validateForm();
    if (validationError) {
      setError(validationError);
      return;
    }

    setIsSubmitting(true);
    try {
      if (mode === "login") {
        await login({ username, password });
      } else {
        await register({ username, email, password });
      }
      navigate("/");
    } catch (err) {
        let message = err instanceof Error ? err.message : "Something went wrong";
        if (message.toLowerCase().includes("banned")) {
          message = "Your account has been banned. Please contact a moderator.";
        } else if (message.includes("Failed to fetch") || message.includes("500")) {
          message = "Invalid username or password";
        }
        setError(message);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-pink-100 via-rose-50 to-purple-100 px-4 py-12">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold bg-gradient-to-r from-pink-500 to-purple-500 bg-clip-text text-transparent">
            InstaLite
          </h1>
          <p className="mt-2 text-gray-600">
            {mode === "login" ? "Welcome back!" : "Create your account"}
          </p>
        </div>

        <div className="bg-white/80 backdrop-blur-sm rounded-3xl shadow-xl p-8 border border-pink-100">
          <div className="flex gap-2 mb-6 p-1 bg-pink-50 rounded-full">
            <button
              type="button"
              onClick={() => switchMode("login")}
              className={`flex-1 py-2 rounded-full text-sm font-medium transition-all ${
                mode === "login"
                  ? "bg-gradient-to-r from-pink-500 to-purple-500 text-white shadow-md"
                  : "text-gray-600 hover:text-pink-600"
              }`}
            >
              Sign In
            </button>
            <button
              type="button"
              onClick={() => switchMode("register")}
              className={`flex-1 py-2 rounded-full text-sm font-medium transition-all ${
                mode === "register"
                  ? "bg-gradient-to-r from-pink-500 to-purple-500 text-white shadow-md"
                  : "text-gray-600 hover:text-pink-600"
              }`}
            >
              Sign Up
            </button>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label
                htmlFor="username"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Username
              </label>
              <input
                id="username"
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="Enter your username"
                className={inputClass}
                disabled={isSubmitting}
              />
            </div>

            {mode === "register" && (
              <div>
                <label
                  htmlFor="email"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  Email
                </label>
                <input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="you@example.com"
                  className={inputClass}
                  disabled={isSubmitting}
                />
              </div>
            )}

            <div>
              <label
                htmlFor="password"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Password
              </label>
              <input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="At least 6 characters"
                className={inputClass}
                disabled={isSubmitting}
              />
            </div>

            {mode === "register" && (
              <div>
                <label
                  htmlFor="confirmPassword"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  Confirm Password
                </label>
                <input
                  id="confirmPassword"
                  type="password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  placeholder="Repeat your password"
                  className={inputClass}
                  disabled={isSubmitting}
                />
              </div>
            )}

            {error && (
              <div className="bg-red-50 border border-red-200 text-red-700 text-sm rounded-2xl px-4 py-3">
                {error}
              </div>
            )}

            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full py-3 rounded-2xl bg-gradient-to-r from-pink-500 to-purple-500 text-white font-semibold shadow-lg hover:shadow-xl transform transition-all hover:scale-[1.02] disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100"
            >
              {isSubmitting
                ? "Please wait..."
                : mode === "login"
                ? "Sign In"
                : "Create Account"}
            </button>
          </form>

          <p className="text-center mt-6 text-sm text-gray-600">
            {mode === "login" ? (
              <>
                Don't have an account?{" "}
                <button
                  type="button"
                  onClick={() => switchMode("register")}
                  className="text-pink-600 font-medium hover:text-pink-700 hover:underline"
                >
                  Sign up
                </button>
              </>
            ) : (
              <>
                Already have an account?{" "}
                <button
                  type="button"
                  onClick={() => switchMode("login")}
                  className="text-pink-600 font-medium hover:text-pink-700 hover:underline"
                >
                  Sign in
                </button>
              </>
            )}
          </p>
        </div>
      </div>
    </div>
  );
}