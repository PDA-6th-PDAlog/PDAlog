"use client";
import {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from "react";

interface User {
  id: number;
  email: string;
  username: string;
  profile_image: string;
}

interface UserContextType {
  user: User | null;
  setUser: (user: User | null) => void;
  isLoggedIn: boolean;
}

const UserContext = createContext<UserContextType | undefined>(undefined);

export function UserProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const isLoggedIn = !!user;

  // 로그인 상태 확인 (앱 최초 실행 시)
  useEffect(() => {
    fetch("http://localhost:3001/login/protected", {
      credentials: "include",
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.isLoggedIn && data.user) {
          setUser(data.user);
        }
      })
      .catch(() => {
        setUser(null);
      });
  }, []);

  return (
    <UserContext.Provider value={{ user, setUser, isLoggedIn }}>
      {children}
    </UserContext.Provider>
  );
}

export function useUser() {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error("useUser must be used within a UserProvider");
  }
  return context;
}
