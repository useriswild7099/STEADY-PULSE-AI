/// <reference types="vite/client" />
import { storage } from './storage';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

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
            });

            const json = await response.json();
            if (!response.ok) {
                throw new Error(json.message || 'Something went wrong');
            }
            return json;
        } catch (error) {
            console.warn('API Error, falling back to local storage:', error);
            // Fallback Mock Logic
            
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
                // Mock: save to storage
                return storage.saveOnboardingData(token || '', data);
            }

            throw error; // Re-throw if no mock handler
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
            });

            const json = await response.json();
            if (!response.ok) {
                throw new Error(json.message || 'Something went wrong');
            }
            return json;
        } catch (error) {
            console.warn('API Error, falling back to local storage:', error);
            
            // Admin Routes
            if (endpoint === '/admin/users' || endpoint === '/admin/clients') {
                // Return all users with onboarding data for clients endpoint
                const users = storage.getUsers();
                if (endpoint === '/admin/clients') {
                    return { clients: users.filter((u: any) => u.onboardingData) };
                }
                return users;
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
            });

            const json = await response.json();
            if (!response.ok) {
                throw new Error(json.message || 'Something went wrong');
            }
            return json;
        } catch (error) {
            console.warn('API Error, falling back to local storage:', error);
            
            // Admin Routes - Update client status
            if (endpoint.startsWith('/admin/clients/') && endpoint.endsWith('/status')) {
                const clientId = endpoint.split('/')[3];
                return storage.updateClientStatus(clientId, data.status, data.assignedTo);
            }

            throw error;
        }
    }
};

