import React, { createContext, useEffect, useState, useContext } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

interface User {
    user_id: number;
    name: string;
    profile: string;
    avatar?: string;
}

interface UserData {
    user_id: number;
    name: string;
    profile: string;
    avatar?: string;
    isUser: boolean;
    isAdmin: boolean;
}

interface AuthContextProps {
    isAuthenticated: boolean;
    login: (data: User) => Promise<void>;
    logout: () => Promise<void>;
    userData: () => UserData | null;
}

const AuthContext = createContext<AuthContextProps | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [user, setUser] = useState<User | null>(null);

    useEffect(() => {
        const checkAuth = async () => {
            const userData = await AsyncStorage.getItem('user');
            if (userData) {
                const parsedUser: User = JSON.parse(userData);
                setUser(parsedUser);
                setIsAuthenticated(true);
            }
        };
        checkAuth();
    }, []);

    const login = async (userData: User) => {
        await AsyncStorage.setItem('user', JSON.stringify(userData));
        setUser(userData);
        setIsAuthenticated(true);
    };

    const logout = async () => {
        await AsyncStorage.clear();
        setUser(null);
        setIsAuthenticated(false);
    };

    const userData = (): UserData | null => {
        if (!user) return null;
        const profile = user.profile.toLowerCase();
        return {
            ...user,
            isUser: profile === 'user',
            isAdmin: profile === 'admin',
        };
    };

    return (
        <AuthContext.Provider value={{ isAuthenticated, login, logout, userData }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) throw new Error('useAuth must be used within an AuthProvider');
    return context;
};
