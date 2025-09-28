export interface UserProfile {
    id: string;
    email: string;
    name: string;
    phone?: string;
    role?: string;
    createdAt: string;
    updatedAt: string;
    [key: string]: any;
}

export interface LoginCredentials {
    email: string;
    password: string;
}

export interface LoginResponse {
    user: UserProfile;
    token: string;
    refreshToken?: string;
}

export interface AuthState {
    profile: UserProfile | null;
    isLoading: boolean;
    isAuthenticated: boolean;
}

export interface AuthContextType extends AuthState {
    login: (credentials: LoginCredentials) => Promise<void>;
    logout: () => Promise<void>;
    setProfile: (profile: UserProfile | null) => void;
    checkAuth: () => Promise<void>;
}

export type { LoginProvider } from './loginprovider';
