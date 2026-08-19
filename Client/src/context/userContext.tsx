import { createContext, useContext, useState, type ReactNode } from "react";

interface UserContextType {
  token: string | null;
  setToken: (token: string | null) => void;
  sideBar: boolean;
  setSideBar: (sidebar: boolean) => void;
}

interface UserContextProviderProps {
  children: ReactNode;
}

export const UserContext = createContext<UserContextType | undefined>(
  undefined,
);

export const UserContextProvider = ({ children }: UserContextProviderProps) => {
  const [token, setToken] = useState<string | null>(
    localStorage.getItem("token"),
  );

  const [sideBar, setSideBar] = useState<boolean>(false);

  const value: UserContextType = { token, setToken, sideBar, setSideBar };

  return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
};

export const useUserContext = () => {
  const context = useContext(UserContext);

  if (!context) {
    throw new Error("useUserContext must be used inside UserContextProvider");
  }

  return context;
};
