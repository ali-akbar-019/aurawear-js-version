import {
    useQuery,
    useMutation,
    useQueryClient,
} from '@tanstack/react-query';

// -------------------- Types --------------------
export const IUser = {};  // Type marker
export const AdminUsersResponse = {};  // Type marker
export const AdminUserResponse = {};  // Type marker
export const UpdateAdminUserPayload = {};  // Type marker

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

// GET ALL USERS
export const fetchAdminUsers = async () => {
    const res = await fetch(`${API_BASE}/api/admin/users`, {
        credentials: 'include',
    });
    return handleFetch(res);
};

// CREATE USER (ADMIN)
export const fetchCreateUser = async (data) => {
    const res = await fetch(`${API_BASE}/api/admin/users`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify(data),
    });
    return handleFetch(res);
};

// UPDATE USER ROLE
export const fetchUpdateUserRole = async (data) => {
    const res = await fetch(`${API_BASE}/api/admin/users/${data.id}/role`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify({ role: data.role }),
    });
    return handleFetch(res);
};

// DELETE USER
export const fetchDeleteUser = async (id) => {
    const res = await fetch(`${API_BASE}/api/admin/users/${id}`, {
        method: 'DELETE',
        credentials: 'include',
    });
    return handleFetch(res);
};

// UPDATE USER (ADMIN – ID IN BODY)
export const fetchUpdateUserByAdmin = async (data) => {
    const res = await fetch(`${API_BASE}/api/admin/users`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify(data),
    });

    return handleFetch(res);
};

// -------------------- React Query Hooks --------------------

export const useUpdateUserMutation = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: fetchUpdateUserByAdmin,
        onSuccess: () =>
            queryClient.invalidateQueries({ queryKey: ['admin-users'] }),
    });
};

export const useAdminUsersQuery = () =>
    useQuery({
        queryKey: ['admin-users'],
        queryFn: fetchAdminUsers,
    });

export const useCreateUserMutation = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: fetchCreateUser,
        onSuccess: () =>
            queryClient.invalidateQueries({ queryKey: ['admin-users'] }),
    });
};

export const useUpdateUserRoleMutation = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: fetchUpdateUserRole,
        onSuccess: () =>
            queryClient.invalidateQueries({ queryKey: ['admin-users'] }),
    });
};

export const useDeleteUserMutation = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: fetchDeleteUser,
        onSuccess: () =>
            queryClient.invalidateQueries({ queryKey: ['admin-users'] }),
    });
};

// -------------------- Combined Export --------------------

export const adminApi = {
    useAdminUsersQuery,
    useCreateUserMutation,
    useUpdateUserRoleMutation,
    useDeleteUserMutation,

    fetchAdminUsers,
    fetchCreateUser,
    fetchUpdateUserRole,
    fetchDeleteUser,
};
