import { createContext, useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { tokenStorage } from "../api/tokenStorage";

interface AuthContextType {
  isAuthenticated: boolean;
  role: string | null;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | null>(null);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const navigate = useNavigate();
  const [isAuthenticated, setIsAuthenticated] = useState(
    () => !tokenStorage.isExpired()
  );
  const [role, setRole] = useState(() => tokenStorage.get()?.role ?? null);

  useEffect(() => {
    const handleExpired = () => {
      setIsAuthenticated(false);
      setRole(null);
      navigate("/login");
    };

    window.addEventListener("auth:expired", handleExpired);
    window.addEventListener("auth:logout", handleExpired);

    return () => {
      window.removeEventListener("auth:expired", handleExpired);
      window.removeEventListener("auth:logout", handleExpired);
    };
  }, [navigate]);

  const logout = () => {
    tokenStorage.clear();
    setIsAuthenticated(false);
    setRole(null);
    navigate("/login");
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, role, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth debe usarse dentro de AuthProvider");
  return ctx;
}