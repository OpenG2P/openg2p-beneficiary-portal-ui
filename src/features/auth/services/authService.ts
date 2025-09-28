import { prefixBaseApiPath } from '@/shared/utils/path';

export interface UserProfile {
    id: number;
    name: string;
    gender: string;
    birthdate: string;
    email: string;
    role?: string;
    phone?: string;
    provider_unique_id: string;
    provider_unique_id_type: string;
}

export interface LoginCredentials {
    email: string;
    password: string;
}

export interface LoginResponse {
    user: UserProfile;
    token: string;
}

class AuthService {
    async login(credentials: LoginCredentials): Promise<LoginResponse> {
        const response = await fetch(prefixBaseApiPath('/auth/login'), {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(credentials),
        });

        if (!response.ok) {
            throw new Error('Login failed');
        }

        return response.json();
    }

    async getProfile(): Promise<UserProfile | null> {
        try {
            const response = await fetch(prefixBaseApiPath('/auth/profile'), {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                },
            });

            if (!response.ok) {
                return null;
            }

            return response.json();
        } catch (error) {
            console.error('Error fetching profile:', error);
            return null;
        }
    }

    async logout(): Promise<void> {
        try {
            await fetch(prefixBaseApiPath('/auth/logout'), {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
            });
        } catch (error) {
            console.error('Error during logout:', error);
        }
    }

    async refreshToken(): Promise<string | null> {
        try {
            const response = await fetch(prefixBaseApiPath('/auth/refresh'), {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
            });

            if (!response.ok) {
                return null;
            }

            const data = await response.json();
            return data.token;
        } catch (error) {
            console.error('Error refreshing token:', error);
            return null;
        }
    }
}

export const authService = new AuthService();
