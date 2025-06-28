"use client";
import { createContext, useContext, useState, useEffect, ReactNode } from "react";

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

    function getApiBaseUrl(): string {
        return process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:3001";
    }

    // 로그인 상태 확인 (앱 최초 실행 시)
    useEffect(() => {
        fetch(`${getApiBaseUrl()}/login/protected`, {
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
