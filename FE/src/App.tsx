import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import Moderator from "./pages/Moderator";
import NotFound from "./pages/NotFound";
import Auth from "./pages/Auth";
import { AppShell } from "./components/AppShell";
import { AuthProvider } from "./contexts/AuthContexts";
import { ProtectedRoute } from "./components/ProtectedRoute";
import MyPosts from "./pages/MyPosts";


//definim componenta principala a aplicatiei, care contine rutele si contextul de autentificare
function App() {
  return (
    <AuthProvider> 
      <BrowserRouter> 
        <ToastContainer position="bottom-right" />
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
              path="/my-posts"
              element={
                <ProtectedRoute>
                  <AppShell>
                    <MyPosts />
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