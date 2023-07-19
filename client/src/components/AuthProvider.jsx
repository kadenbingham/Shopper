import React, { useEffect, useState } from "react";
import AuthContext from "../AuthContext";
import { fetchMe } from "../api/auth";

export default function AuthProvider({ children }) {
  // FINISH LOGIC
  return <AuthContext.Provider value={{}}>{children}</AuthContext.Provider>;
}
