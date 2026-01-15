
// Helper types
export interface User {
  _id: string;
  email: string;
  role: 'client' | 'admin';
  password?: string; // In a real app never store updated password in local storage plain text, but for mock safe-ish
  createdAt: string;
  onboardingData?: any;
  onboardingStatus?: 'pending' | 'in-progress' | 'completed';
  onboardingSubmittedAt?: string;
  assignedWorker?: string;
}

const STORAGE_KEYS = {
  USERS: 'steadypulseai_users',
  CURRENT_USER: 'user', // Match what's used in App.tsx
  TOKEN: 'token',       // Match what's used in App.tsx
};

// Initialize with some data if empty
const initializeStorage = () => {
  if (typeof window === 'undefined') return;
  
  const existingUsers = localStorage.getItem(STORAGE_KEYS.USERS);
  if (!existingUsers) {
    const defaultAdmin: User = {
      _id: 'admin-1',
      email: 'admin@steadypulseai.com',
      role: 'admin',
      password: 'admin', // Simple password for demo
      createdAt: new Date().toISOString(),
    };
    const defaultClient: User = {
        _id: 'client-1',
        email: 'client@example.com',
        role: 'client',
        password: 'password',
        createdAt: new Date().toISOString(),
        onboardingData: {}
    };
    localStorage.setItem(STORAGE_KEYS.USERS, JSON.stringify([defaultAdmin, defaultClient]));
  }
};

export const storage = {
  getUsers: (): User[] => {
    initializeStorage();
    return JSON.parse(localStorage.getItem(STORAGE_KEYS.USERS) || '[]');
  },

  getUserByEmail: (email: string): User | undefined => {
    const users = storage.getUsers();
    return users.find(u => u.email === email);
  },

  getUserById: (id: string): User | undefined => {
    const users = storage.getUsers();
    return users.find(u => u._id === id);
  },

  createUser: (user: Partial<User>): User => {
    const users = storage.getUsers();
    if (users.find(u => u.email === user.email)) {
      throw new Error('User already exists');
    }
    
    const newUser: User = {
      _id: Math.random().toString(36).substr(2, 9),
      email: user.email!,
      role: user.role || 'client',
      password: user.password,
      createdAt: new Date().toISOString(),
      onboardingData: {}
    };
    
    users.push(newUser);
    localStorage.setItem(STORAGE_KEYS.USERS, JSON.stringify(users));
    return newUser;
  },

  updateUserOnboarding: (email: string, data: any) => {
    const users = storage.getUsers();
    const userIndex = users.findIndex(u => u.email === email);
    
    if (userIndex === -1) {
        // If user not found (e.g. guest flow?), maybe create temp user?
        // For now, assuming logged in.
        console.warn(`User ${email} not found for onboarding update`);
        return;
    }

    // Merge existing data
    users[userIndex].onboardingData = {
        ...users[userIndex].onboardingData,
        ...data
    };

    localStorage.setItem(STORAGE_KEYS.USERS, JSON.stringify(users));
    
    // Also update current session if it matches
    const currentUser = JSON.parse(localStorage.getItem(STORAGE_KEYS.CURRENT_USER) || '{}');
    if (currentUser.email === email) {
        currentUser.onboardingData = users[userIndex].onboardingData;
        localStorage.setItem(STORAGE_KEYS.CURRENT_USER, JSON.stringify(currentUser));
    }
  },

  saveOnboardingData: (token: string, data: any) => {
    // Extract user ID from mock token
    const userId = token.replace('mock-token-', '').replace('mock-jwt-token-', '');
    const users = storage.getUsers();
    const userIndex = users.findIndex(u => u._id === userId);
    
    if (userIndex === -1) {
      throw new Error('User not found');
    }

    // Preserve the nested structure: { generalData: {...}, brandData: {...} }
    users[userIndex].onboardingData = {
      ...users[userIndex].onboardingData,
      generalData: {
        ...(users[userIndex].onboardingData?.generalData || {}),
        ...data.generalData
      },
      brandData: {
        ...(users[userIndex].onboardingData?.brandData || {}),
        ...data.brandData
      }
    };

    // Set status and timestamp on first submission
    if (!users[userIndex].onboardingSubmittedAt) {
      users[userIndex].onboardingStatus = 'pending';
      users[userIndex].onboardingSubmittedAt = new Date().toISOString();
    }

    localStorage.setItem(STORAGE_KEYS.USERS, JSON.stringify(users));
    return users[userIndex].onboardingData;
  },

  updateClientStatus: (clientId: string, status?: string, assignedTo?: string) => {
    const users = storage.getUsers();
    const userIndex = users.findIndex(u => u._id === clientId);
    
    if (userIndex === -1) {
      throw new Error('Client not found');
    }

    if (status) {
      users[userIndex].onboardingStatus = status as any;
    }
    if (assignedTo !== undefined) {
      users[userIndex].assignedWorker = assignedTo || undefined;
    }

    localStorage.setItem(STORAGE_KEYS.USERS, JSON.stringify(users));
    return users[userIndex];
  },
  
  login: (email: string, password: string): { user: User, token: string } => {
      const user = storage.getUserByEmail(email);
      if (!user || user.password !== password) {
          throw new Error('Invalid credentials');
      }
      // Mock token
      return { user, token: 'mock-jwt-token-' + user._id };
  }
};

