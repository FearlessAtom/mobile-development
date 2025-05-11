import React, { useState } from "react";

const AuthContext = React.createContext();

export const AuthProvider = ({ children }) => 
{
    const [loggedInUser, setLoggedInUser] = useState();

    return <AuthContext.Provider value={{ loggedInUser, setLoggedInUser }}>
        { children }
    </AuthContext.Provider>
}

export const useAuth = () => React.useContext(AuthContext);
