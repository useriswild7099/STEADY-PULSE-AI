import { Navigate, useLocation } from 'react-router-dom';

interface ProtectedRouteProps {
    children: React.ReactNode;
    role?: 'client' | 'admin';
}

export function ProtectedRoute({ children, role }: ProtectedRouteProps) {
    const location = useLocation();
    
    // Check for token in URL (Social Login Redirect)
    const searchParams = new URLSearchParams(location.search);
    const urlToken = searchParams.get('token');
    const urlUser = searchParams.get('user');

    if (urlToken && urlUser) {
        try {
            // Validate user string is valid JSON before saving
            JSON.parse(urlUser); // This will throw if invalid
            
            localStorage.setItem('token', urlToken);
            localStorage.setItem('user', urlUser);
            
            // Clean URL
            window.history.replaceState({}, document.title, location.pathname);
        } catch (e) {
            console.error('Failed to parse user from URL', e);
        }
    }

    const token = localStorage.getItem('token');
    const userStr = localStorage.getItem('user');

    if (!token || !userStr) {
        return <Navigate to="/client-login" state={{ from: location }} replace />;
    }

    try {
        const user = JSON.parse(userStr);
        
        // If strict role required check it
        if (role && user.role !== role) {
            // If logged in but wrong role, redirect to their dashboard or home
            if (user.role === 'admin') return <Navigate to="/admin-portal" replace />;
            return <Navigate to="/client-portal" replace />;
        }

        return <>{children}</>;
    } catch (e) {
        // Corrupt data
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        return <Navigate to="/client-login" state={{ from: location }} replace />;
    }
}
