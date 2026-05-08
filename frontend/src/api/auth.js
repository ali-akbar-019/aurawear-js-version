import {
    useQuery,
    useMutation,
    useQueryClient,
} from '@tanstack/react-query';

// -------------------- Types --------------------
export const IUser = {};  // Type marker (runtime: object)

export const AuthResponse = {};  // Type marker
export const LogoutResponse = {};  // Type marker

// -------------------- Base URL --------------------
const API_BASE = import.meta.env.VITE_API_BASE || '';

// -------------------- Fetch Helpers --------------------
const handleFetch = async (res) => {
    if (!res.ok) {
        const body = await res.json().catch(() => null);
        throw new Error(body?.message || 'Something went wrong');
    }
    return res.json();
};

// -------------------- Fetch Functions --------------------

// GET CURRENT USER
export const fetchMe = async () => {
    const res = await fetch(`${API_BASE}/api/auth/me`, { credentials: 'include' });
    return handleFetch(res);
};

// SIGNUP
export const fetchSignup = async (data) => {
    const res = await fetch(`${API_BASE}/api/auth/signup`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify(data),
    });
    return handleFetch(res);
};

// LOGIN
export const fetchLogin = async (data) => {
    const res = await fetch(`${API_BASE}/api/auth/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify(data),
    });
    return handleFetch(res);
};

// LOGOUT
export const fetchLogout = async () => {
    const res = await fetch(`${API_BASE}/api/auth/logout`, {
        method: 'POST',
        credentials: 'include',
    });
    return handleFetch(res);
};

// -------------------- React Query Hooks --------------------

export const useMeQuery = () =>
    useQuery({
        queryKey: ['me'],
        queryFn: fetchMe,
        staleTime: 1000 * 60 * 5, // 5 minutes
    });

export const useSignupMutation = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: fetchSignup,
        onSuccess: () => queryClient.invalidateQueries({ queryKey: ['me'] }),
    });
};

export const useLoginMutation = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: fetchLogin,
        onSuccess: () => queryClient.invalidateQueries({ queryKey: ['me'] }),
    });
};

export const useLogoutMutation = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: fetchLogout,
        onSuccess: () => queryClient.invalidateQueries({ queryKey: ['me'] }),
    });
};

// -------------------- Combined Export --------------------
export const authApi = {
    useMeQuery,
    useSignupMutation,
    useLoginMutation,
    useLogoutMutation,

    fetchMe,
    fetchSignup,
    fetchLogin,
    fetchLogout,
};
