//Aquí  el estado global del login.
import {
  createContext,
  useEffect,
  useState,
} from "react";

import { User } from "../models/User";

import {
  getCurrentUser,
  initializeUsers,
  login,
  logout,
  register,
} from "../services/authService";

interface AuthContextType {
  user: User | null;

  loginUser: (
    email: string,
    password: string
  ) => void;

  registerUser: (
    name: string,
    email: string,
    password: string
  ) => void;

  logoutUser: () => void;
}

export const AuthContext =
  createContext<AuthContextType | null>(null);

export const AuthProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [user, setUser] = useState<User | null>(
    null
  );

  useEffect(() => {
    initializeUsers();

    const loggedUser = getCurrentUser();

    if (loggedUser) {
      setUser(loggedUser);
    }
  }, []);

  const loginUser = (
    email: string,
    password: string
  ) => {
    const loggedUser = login(email, password);

    setUser(loggedUser);
  };

  const registerUser = (
    name: string,
    email: string,
    password: string
  ) => {
    const newUser = register(
      name,
      email,
      password
    );

    setUser(newUser);
  };

  const logoutUser = () => {
    logout();

    setUser(null);
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        loginUser,
        registerUser,
        logoutUser,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};