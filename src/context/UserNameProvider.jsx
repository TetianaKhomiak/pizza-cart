import { createContext } from "react";
import { useLocalStorage } from "@uidotdev/usehooks";

export const UserContext = createContext(null);

const UserNameProvider = ({ children }) => {
  const [userName, setUserName] = useLocalStorage("userName", "");
  const userValue = {
    userName,
    setUserName,
  };

  return (
    <UserContext.Provider value={userValue}>{children}</UserContext.Provider>
  );
};

export default UserNameProvider;
