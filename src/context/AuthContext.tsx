import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';

interface User {
    id: string;
    userName: string;
    mail: string;
    userRole: string;
}

interface AuthContextType {
    user: User | null;
    isLoggedIn: boolean;
    login: (authResponse: any) => Promise<void>;
    logout: () => void;
    loading: boolean;
    getAuthHeaders: () => Record<string, string>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const [user, setUser] = useState<User | null>(null);
    const [loading, setLoading] = useState(true);

    const fetchUserFromToken = async (token: string): Promise<User> => {
        console.log('Fetching user from backend');
        
        const response = await fetch('http://localhost:5456/api/auth/me', {
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json'
            }
        });

        if (!response.ok) {
            throw new Error('Failed to fetch user data');
        }

        const userData = await response.json();
        console.log('User data from backend:', userData);
        
        return userData;
    };

    const login = async (authResponse: any) => {
        try {
            setLoading(true);
            
            console.log('Login with auth response:', authResponse);
            
            if (!authResponse.status || !authResponse.jwt) {
                throw new Error(authResponse.message || 'Login failed');
            }
            
            localStorage.setItem('authToken', authResponse.jwt);
            
            const userData = await fetchUserFromToken(authResponse.jwt);
            
            setUser(userData);
            localStorage.setItem('user', JSON.stringify(userData));
            
            console.log('Login successful:', userData.userName);
        } catch (error) {
            console.error('Login failed:', error);
            localStorage.removeItem('authToken');
            localStorage.removeItem('user');
            setUser(null);
            throw error;
        } finally {
            setLoading(false);
        }
    };

    const logout = () => {
        console.log('Logout');
        localStorage.removeItem('authToken');
        localStorage.removeItem('user');
        setUser(null);
    };

    const getAuthHeaders = (): Record<string, string> => {
        const token = localStorage.getItem('authToken');
        if (token) {
            return { 'Authorization': `Bearer ${token}` };
        }
        return {};
    };

    useEffect(() => {
        const checkAuth = async () => {
            const token = localStorage.getItem('authToken');

            if (token) {
                try {
                    const userData = await fetchUserFromToken(token);
                    setUser(userData);
                    localStorage.setItem('user', JSON.stringify(userData));
                } catch (error) {
                    console.error('Token validation failed:', error);
                    localStorage.removeItem('authToken');
                    localStorage.removeItem('user');
                    setUser(null);
                }
            }
            
            setLoading(false);
        };

        checkAuth();
    }, []);

    const value: AuthContextType = {
        user,
        isLoggedIn: !!user,
        login,
        logout,
        loading,
        getAuthHeaders
    };

    return (
        <AuthContext.Provider value={value}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (context === undefined) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
};