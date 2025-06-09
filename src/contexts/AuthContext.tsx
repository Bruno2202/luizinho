import React, { createContext, ReactNode, useState } from "react";

interface Props {
    children: ReactNode;
}

interface AuthContextType {
    authToken: string | null;
    setAuthToken: React.Dispatch<React.SetStateAction<string | null>>;
}

export const AuthContext = createContext<AuthContextType | null>(null);

export default function AuthProvider({ children }: Props) {
    const [authToken, setAuthToken] = useState<string | null>(null);

    return (
        <AuthContext.Provider value={{
            authToken,
            setAuthToken
        }}>
            {children}
        </AuthContext.Provider>
    );
}