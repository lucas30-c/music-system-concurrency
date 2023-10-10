import React from "react";

import { getToken } from "../utils/auth";

const AuthContext = React.createContext(null);

const AuthProvider = ({ children }) => {
  const token = getToken();

  return (
    <AuthContext.Provider token={token}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;