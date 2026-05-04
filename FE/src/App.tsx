import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import Moderator from "./pages/Moderator";
import NotFound from "./pages/NotFound";
import { AppShell } from "./components/AppShell";

function App() {
  return (
    <BrowserRouter>
      <AppShell>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/moderator" element={<Moderator />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </AppShell>
    </BrowserRouter>
  );
}

export default App;