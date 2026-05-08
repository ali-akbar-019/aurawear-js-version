import {
    useQuery,
    useMutation,
    useQueryClient,
} from "@tanstack/react-query";

const API_BASE = import.meta.env.VITE_API_BASE || "";

// -------------------- Types --------------------

export const IUserAIAttributes = {};  // Type marker
export const IUser = {};  // Type marker

// -------------------- Fetch Functions --------------------

const handleFetch = async (res) => {
    if (!res.ok) {
        const body = await res.json().catch(() => null);
        throw new Error(body?.message || "Something went wrong");
    }
    return res.json();
};

// ADMIN: GET ALL USERS
export const fetchAllUsers = async () => {
    const res = await fetch(`${API_BASE}/api/users`, { credentials: "include" });
    return handleFetch(res).then(r => r.users);
};

// ADMIN: GET USER BY ID
export const fetchUserById = async (id) => {
    const res = await fetch(`${API_BASE}/api/users/${id}`, { credentials: "include" });
    return handleFetch(res).then(r => r.user);
};

// ADMIN: DELETE USER
export const fetchDeleteUser = async (id) => {
    const res = await fetch(`${API_BASE}/api/users/${id}`, {
        method: "DELETE",
        credentials: "include",
    });
    return handleFetch(res);
};

// USER: UPDATE PROFILE
export const fetchUpdateUserProfile = async (data) => {
    const res = await fetch(`${API_BASE}/api/users/me`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify(data),
    });
    return handleFetch(res).then(r => r.user);
};

// USER: UPDATE AI ATTRIBUTES
export const fetchUpdateUserAIAttributes = async (data) => {
    const res = await fetch(`${API_BASE}/api/users/me/ai-attributes`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify(data),
    });
    return handleFetch(res).then(r => r.user);
};

// -------------------- React Query Hooks --------------------

// ADMIN QUERIES
export const useAllUsersQuery = () =>
    useQuery({ queryKey: ["users"], queryFn: fetchAllUsers, staleTime: 1000 * 60 * 5 });

export const useUserQuery = (id) =>
    useQuery({ queryKey: ["user", id], queryFn: () => fetchUserById(id), staleTime: 1000 * 60 * 5 });

// ADMIN MUTATIONS
export const useDeleteUserMutation = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: fetchDeleteUser,
        onSuccess: () => queryClient.invalidateQueries({ queryKey: ["users"] }),
    });
};

// USER MUTATIONS
export const useUpdateUserProfileMutation = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: fetchUpdateUserProfile,
        onSuccess: () => queryClient.invalidateQueries({ queryKey: ["me"] }),
    });
};

export const useUpdateUserAIAttributesMutation = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: fetchUpdateUserAIAttributes,
        onSuccess: () => queryClient.invalidateQueries({ queryKey: ["me"] }),
    });
};

// -------------------- Combined Export --------------------

export const userApi = {
    fetchAllUsers,
    fetchUserById,
    fetchDeleteUser,
    fetchUpdateUserProfile,
    fetchUpdateUserAIAttributes,
    useAllUsersQuery,
    useUserQuery,
    useDeleteUserMutation,
    useUpdateUserProfileMutation,
    useUpdateUserAIAttributesMutation,
};
