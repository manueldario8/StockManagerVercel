import { createContext, useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { tokenStorage } from "../api/tokenStorage";

interface AuthContextType {
  isAuthenticated: boolean;
  role: string | null;
  login: (data: { role: string }) => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | null>(null);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const navigate = useNavigate();
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [role, setRole] = useState<string | null>(null);

  useEffect(() => {
    const auth = tokenStorage.get();

    if (auth && !tokenStorage.isExpired()) {
      setIsAuthenticated(true);
      setRole(auth.role);
    } else {
      tokenStorage.clear();
      setIsAuthenticated(false);
      setRole(null);
    }
  }, []);

  useEffect(() => {
    const handleLogout = () => {
      tokenStorage.clear();
      setIsAuthenticated(false);
      setRole(null);
      navigate("/login");
    };

    window.addEventListener("auth:logout", handleLogout);

    return () => {
      window.removeEventListener("auth:logout", handleLogout);
    };
  }, [navigate]);

  const login = (data: { role: string }) => {
    setIsAuthenticated(true);
    setRole(data.role);
    navigate("/");
  };

  const logout = () => {
    tokenStorage.clear();
    setIsAuthenticated(false);
    setRole(null);
    navigate("/login");
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, role, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth debe usarse dentro de AuthProvider");
  return ctx;
}
