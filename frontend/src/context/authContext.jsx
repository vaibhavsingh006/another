import {
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";
const BASE_URL = import.meta.env.VITE_API_URL || "http://localhost:5000/api";

import { logoutUser } from "../services/api";

const AuthContext = createContext();

export const AuthProvider = ({
  children,
}) => {

  const [user, setUser] = useState(null);

  const [loading, setLoading] =
    useState(true);

  const fetchUser = async () => {
    try {
      const response = await fetch(
        `${BASE_URL}/auth/me`,
        {
          credentials: "include",
        }
      );

      const data = await response.json();

      if (response.ok) {
        setUser(data.user);
      } else {
        setUser(null);
      }
    } catch (error) {
      console.log(error);
      setUser(null);
    } finally {
      setLoading(false);
    }
  };

  const logout = async () => {
    try {
      await logoutUser();
    } catch (error) {
      console.error("Logout error:", error);
    } finally {
      setUser(null);
    }
  };

  useEffect(() => {
    fetchUser();
  }, []);

  return (
    <AuthContext.Provider
      value={{
        user,
        setUser,
        loading,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () =>
  useContext(AuthContext);