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
  return (
    <UserContext.Provider value={{ user, setUser }}>
      {children}
    </UserContext.Provider>
  );
}

export const useUser = () => useContext(UserContext);
