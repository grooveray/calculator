import { createContext, useContext, useState } from "react";

const LoadingContext = createContext();

export function LoadingProvider({ children }) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  // init
  const initState = () => {
    setLoading(false);
    setError(false);
  };
  // Loading
  const loadingState = () => {
    setLoading(true);
    setError(false);
  };
  // Error
  const errorState = () => {
    setLoading(false);
    setError(true);
  };

  return (
    <LoadingContext.Provider
      value={{ loading, error, initState, loadingState, errorState }}
    >
      {children}
    </LoadingContext.Provider>
  );
}

export const useLoading = () => useContext(LoadingContext);
