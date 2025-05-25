import { createContext, useContext } from "react";
import { useLocalStorage } from "@uidotdev/usehooks";
import type {
  UserNameProviderProps,
  UserNameContextType,
} from "../types/types.ts";

const UserNameContext = createContext<UserNameContextType | null>(null);

export const useUserNameContext = () => {
  const context = useContext(UserNameContext);
  if (!context) {
    throw new Error(
      "useUserNameContext must be used within a UserNameProvider"
    );
  }
  return context;
};

const UserNameProvider = ({ children }: UserNameProviderProps) => {
  const [userName, setUserName] = useLocalStorage<string>("userName", "");

  return (
    <UserNameContext.Provider value={{ userName, setUserName }}>
      {children}
    </UserNameContext.Provider>
  );
};

export default UserNameProvider;
