import { useContext } from "react";
import AuthContext from "../AuthContext";

const useAuth = () => {
  const { user, setUser, loggedIn, setLoggedIn } = useContext(AuthContext);

  return {
    user,
    setUser,
    loggedIn,
    setLoggedIn,
  };
};

export default useAuth;
