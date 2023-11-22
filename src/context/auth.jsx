import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import { api } from "../services/api";
import { useHistory } from "react-router-dom";

export const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const history = useHistory();
  const [user, setUser] = useState(() => {
    const storedUser = localStorage.getItem("@User:user");
    return storedUser ? JSON.parse(storedUser) : null;
  });
  const [acountComplet, setAcountComplet] = useState(true);
  const [token, setToken] = useState(() => {
    const token = localStorage.getItem("@Permission:token");
    if (token) {
      api.defaults.headers.Authorization = `Bearer ${token}`;
      return { token };
    }

    return {};
  });

  const signIn = useCallback(async ({ email, password }) => {
    const response = await api.post("/auth/login", { email, password });
    const { token, user } = response.data;

    setToken(token);
    setUser(user);
    if (user.isCompleted == false) {
      setAcountComplet(false);
    }
    localStorage.setItem("@Permission:token", token);
    localStorage.setItem("@User:user", JSON.stringify(user));
  }, []);

  const register = useCallback(
    async ({ email, name, password, birthday, gender }) => {
      const response = await api.post("/auth/register", {
        email,
        name,
        password,
        birthday,
        gender,
        roles: "user",
      });
      const { token, user } = response.data;

      setToken(token);
      setUser(user);
      if (user.isCompleted === false) {
        setAcountComplet(false);
      }
      localStorage.setItem("@Permission:token", token);
      localStorage.setItem("@User:user", JSON.stringify(user));
    },
    []
  );
  const signOut = () => {
    console.log("Chamou");
    setToken({});
    setUser(null);
    setAcountComplet(true);
    localStorage.removeItem("@Permission:token");
    localStorage.removeItem("@User:user");
    history.push("/login");
  };
  const userLogged = useCallback(() => {
    const token = localStorage.getItem("@Permission:token");
    if (token) {
      return true;
    }
    return false;
  }, []);

  const contextValue = useMemo(
    () => ({
      token,
      signIn,
      userLogged,
      register,
      acountComplet,
      setAcountComplet,
      user,
      signOut,
    }),
    [token, userLogged, acountComplet, setAcountComplet, user, signOut]
  );

  return (
    <AuthContext.Provider value={contextValue}>{children}</AuthContext.Provider>
  );
};

function useAuth() {
  const context = useContext(AuthContext);
  return context;
}

export { AuthProvider, useAuth };
