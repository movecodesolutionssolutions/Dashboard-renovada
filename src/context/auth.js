import { createContext, useEffect, useState } from "react";
import { api } from "../services/api";
import { toast } from "react-toastify";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    loadingStoreData();
  }, []);

  const loadingStoreData = async () => {
    const storageUser = localStorage.getItem("@Auth:user");
    const storageToken = localStorage.getItem("@Auth:token");
    if (storageToken && storageUser) {
      setUser(JSON.parse(storageUser));
    }
  };

  const signIn = async (data) => {
    const { email, password } = data;
    try {
      const response = await api.post("/auth/login", {
        email,
        password,
      });
      if (response.data.error) {
        alert(response.data.error);
      } else {
        api.defaults.headers.common[
          "Authorization"
        ] = `Bearer ${response.data.token}`;
        setUser(response.data.user);
        localStorage.setItem("@Auth:token", response.data.token);
        localStorage.setItem("@Auth:user", JSON.stringify(response.data.user));
      }
    } catch (err) {
      if (err.response && err.response.status === 404) {
        toast.error("Usuário não encontrado");
      } else {
        toast.error("Ocorreu um erro ao fazer login", +err);
      }
    }
  };

  return (
    <AuthContext.Provider value={{ user, signed: !!user, signIn }}>
      {children}
    </AuthContext.Provider>
  );
};
