import { createContext, useContext, useState } from "react";

export const UserContext = createContext();

export const initialUserState = {
  name: "",
  email: "",
  admin: "",
  token: "",
};

export function UserProvider({ children }) {
  const [user, setUser] = useState(initialUserState);
  const [token, setToken] = useState("");
  return (
    <UserContext.Provider value={{ user, setUser, token, setToken }}>
      {children}
    </UserContext.Provider>
  );
}

export const useUser = () => useContext(UserContext);
