import { createContext, useContext, useState, ReactNode } from "react";

type ScoreContextType = {
  refreshScore: () => void;
  refreshKey: number;
};

const ScoreContext = createContext<ScoreContextType | undefined>(undefined);

export const ScoreProvider = ({ children }: { children: ReactNode }) => {
  const [refreshKey, setRefreshKey] = useState(0);

  const refreshScore = () => {
    setRefreshKey((prev) => prev + 1);
  };

  return (
    <ScoreContext.Provider value={{ refreshScore, refreshKey }}>
      {children}
    </ScoreContext.Provider>
  );
};

export const useScore = () => {
  const ctx = useContext(ScoreContext);
  if (!ctx) throw new Error("useScore must be used inside ScoreProvider");
  return ctx;
};