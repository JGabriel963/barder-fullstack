import Router from "next/router";
import { destroyCookie } from "nookies";
import { ReactNode, createContext, use, useState } from "react";

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
    console.log({
      email,
      password,
    });
  }

  return (
    <AuthContext.Provider value={{ user, isAuthenticated: !!user, signIn }}>
      {children}
    </AuthContext.Provider>
  );
}
