import { api } from "@/services/apiClient";
import Router from "next/router";
import { destroyCookie, setCookie } from "nookies";
import { ReactNode, createContext, useState } from "react";

interface AuthContextData {
  user: UserProps;
  isAuthenticated: boolean;
  signIn: (creadentials: SignInProps) => Promise<void>;
}

interface UserProps {
  id: string;
  name: string;
  email: string;
  address: string | null;
  subscription?: SubscriptionProps | null;
}

interface SubscriptionProps {
  id: string;
  status: string;
}

type AuthProviderProps = {
  children: ReactNode;
};

interface SignInProps {
  email: string;
  password: string;
}

export const AuthContext = createContext({} as AuthContextData);

export function signOut() {
  try {
    destroyCookie(null, "@barber.token", { path: "/" });
    Router.push("/login");
  } catch (error) {
    console.log(error);
  }
}

export function AuthProvider({ children }: AuthProviderProps) {
  const [user, setUser] = useState<UserProps>();

  async function signIn({ email, password }: SignInProps) {
    try {
      const reponse = await api.post("/session", {
        email,
        password,
      });

      const { id, name, token, subscription, address } = reponse.data;

      setCookie(undefined, "@barber.token", token, {
        maxAge: 60 * 60 * 24 * 30,
        path: "/",
      });

      setUser({
        id,
        name,
        email,
        address,
        subscription,
      });

      api.defaults.headers.common["Authorization"] = `Bearer ${token}`;

      Router.push("/dashboard");
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <AuthContext.Provider value={{ user, isAuthenticated: !!user, signIn }}>
      {children}
    </AuthContext.Provider>
  );
}
