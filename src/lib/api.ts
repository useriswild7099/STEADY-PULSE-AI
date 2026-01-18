/// <reference types="vite/client" />
import { storage } from './storage';

const API_URL = import.meta.env.VITE_API_URL || (import.meta.env.PROD ? '/api' : 'http://localhost:5000/api');

// Only enable mock fallback in development
const USE_MOCK_FALLBACK = import.meta.env.DEV;

export const api = {
    async post(endpoint: string, data: any, token?: string) {
        const headers: HeadersInit = {
            'Content-Type': 'application/json',
        };
        if (token) {
            headers['Authorization'] = `Bearer ${token}`;
        }

        try {
            const response = await fetch(`${API_URL}${endpoint}`, {
                method: 'POST',
                headers,
                body: JSON.stringify(data),
                credentials: 'include', // Include cookies for HttpOnly auth
            });

            const json = await response.json();
            if (!response.ok) {
                throw new Error(json.message || 'Something went wrong');
            }
            return json;
        } catch (error: any) {
            // Only use mock fallback in development
            if (USE_MOCK_FALLBACK) {
                console.warn('[DEV ONLY] API Error, falling back to local storage:', error.message);
                
                // Auth Routes
                if (endpoint === '/auth/login') {
                    return storage.login(data.email, data.password);
                }
                if (endpoint === '/auth/register') {
                    const newUser = storage.createUser({ email: data.email, password: data.password, role: 'client' });
                    return { user: newUser, token: 'mock-token-' + newUser._id };
                }
                if (endpoint === '/auth/create-admin') {
                    const newUser = storage.createUser({ email: data.email, password: data.password, role: 'admin' });
                    return { user: newUser, message: 'Admin created' };
                }
                // Client Onboarding
                if (endpoint === '/client/onboarding') {
                    return storage.saveOnboardingData(token || '', data);
                }
            }

            // Re-throw error (in production, this will show proper error)
            throw error;
        }
    },

    async get(endpoint: string, token: string) {
        const headers: HeadersInit = {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`,
        };

        try {
            const response = await fetch(`${API_URL}${endpoint}`, {
                method: 'GET',
                headers,
                credentials: 'include', // Include cookies for HttpOnly auth
            });

            const json = await response.json();
            if (!response.ok) {
                throw new Error(json.message || 'Something went wrong');
            }
            return json;
        } catch (error: any) {
            // Only use mock fallback in development
            if (USE_MOCK_FALLBACK) {
                console.warn('[DEV ONLY] API Error, falling back to local storage:', error.message);
                
                // Admin Routes
                if (endpoint === '/admin/users' || endpoint === '/admin/clients') {
                    const users = storage.getUsers();
                    if (endpoint === '/admin/clients') {
                        return { clients: users.filter((u: any) => 
                            u.onboardingData && 
                            (u.onboardingData.generalData || u.onboardingData.brandData)
                        )};
                    }
                    return users;
                }
            }

            throw error;
        }
    },

    async put(endpoint: string, data: any, token: string) {
        const headers: HeadersInit = {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`,
        };

        try {
            const response = await fetch(`${API_URL}${endpoint}`, {
                method: 'PUT',
                headers,
                body: JSON.stringify(data),
                credentials: 'include', // Include cookies for HttpOnly auth
            });

            const json = await response.json();
            if (!response.ok) {
                throw new Error(json.message || 'Something went wrong');
            }
            return json;
        } catch (error: any) {
            // Only use mock fallback in development
            if (USE_MOCK_FALLBACK) {
                console.warn('[DEV ONLY] API Error, falling back to local storage:', error.message);
                
                // Admin Routes - Update client status
                if (endpoint.startsWith('/admin/clients/') && endpoint.endsWith('/status')) {
                    const clientId = endpoint.split('/')[3];
                    return storage.updateClientStatus(clientId, data.status, data.assignedTo);
                }
            }

            throw error;
        }
    },

    // New: Refresh token endpoint
    async refreshToken() {
        try {
            const response = await fetch(`${API_URL}/auth/refresh`, {
                method: 'POST',
                credentials: 'include', // Cookies will be sent automatically
                headers: {
                    'Content-Type': 'application/json',
                },
            });

            if (!response.ok) {
                throw new Error('Session expired');
            }

            return await response.json();
        } catch (error) {
            // Clear local storage on refresh failure
            localStorage.removeItem('token');
            localStorage.removeItem('user');
            throw error;
        }
    },

    // New: Logout endpoint
    async logout() {
        try {
            await fetch(`${API_URL}/auth/logout`, {
                method: 'POST',
                credentials: 'include',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${localStorage.getItem('token') || ''}`,
                },
            });
        } catch (error) {
            console.warn('Logout API call failed, clearing local data anyway');
        } finally {
            // Always clear local storage
            localStorage.removeItem('token');
            localStorage.removeItem('user');
        }
    }
};
