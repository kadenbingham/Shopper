import React, { useEffect, useState } from "react";
import AuthContext from "../AuthContext";
import { fetchMe } from "../api/auth";

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState({ username: "guest" });
  const [loggedIn, setLoggedIn] = useState(false);

  useEffect(() => {
    const getUser = async () => {
      try {
        const me = await fetchMe();
        if (me && me.username) {
          setUser(me);
          setLoggedIn(true);
        } else {
          setUser({ username: "guest" });
          setLoggedIn(false);
        }
      } catch (error) {
        setUser({ username: "guest" });
        setLoggedIn(false);
      }
    };

    getUser();
  }, []);

  return (
    <AuthContext.Provider
      value={{
        user,
        setUser,
        loggedIn,
        setLoggedIn,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
