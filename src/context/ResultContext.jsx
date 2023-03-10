import { createContext, useContext, useState } from "react";

export const ResultContext = createContext();

export function ResultProvider({ children }) {
  const [result, setResult] = useState();
  return (
    <ResultContext.Provider value={{ result, setResult }}>
      {children}
    </ResultContext.Provider>
  );
}

export const useResult = () => useContext(ResultContext);
