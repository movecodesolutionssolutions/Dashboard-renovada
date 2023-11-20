import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
} from "react";
import { api } from "../services/api";
import { toast } from "react-toastify";

export const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [acountComplet , setAcountComplet] = useState(true)
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
    if (user.isCompleted === false) {
      setAcountComplet(false)
    }
    localStorage.setItem("@Permission:token", token);
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
      localStorage.setItem("@Permission:token", token);
    },
    []
  );

  const userLogged = useCallback(() => {
    const token = localStorage.getItem("@Permission:token");
    if (token) {
      return true;
    }
    return false;
  }, []);
  return (
    <AuthContext.Provider value={{ token, signIn, userLogged, register, acountComplet, setAcountComplet }}>
      {children}
    </AuthContext.Provider>
  );
};
function useAuth() {
  const context = useContext(AuthContext);
  return context;
}

export { AuthProvider, useAuth };
