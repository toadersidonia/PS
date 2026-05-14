import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import Moderator from "./pages/Moderator";
import NotFound from "./pages/NotFound";
import Auth from "./pages/Auth";
import { AppShell } from "./components/AppShell";
import { AuthProvider } from "./contexts/AuthContexts";
import { ProtectedRoute } from "./components/ProtectedRoute";

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/auth" element={<Auth />} />

          <Route
            path="/"
            element={
              <ProtectedRoute>
                <AppShell>
                  <Index />
                </AppShell>
              </ProtectedRoute>
            }
          />

          <Route
            path="/moderator"
            element={
              <ProtectedRoute>
                <AppShell>
                  <Moderator />
                </AppShell>
              </ProtectedRoute>
            }
          />

          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;