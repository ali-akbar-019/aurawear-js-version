import {
    useQuery,
    useMutation,
    useQueryClient,
} from "@tanstack/react-query";

const API_BASE = import.meta.env.VITE_API_BASE || "";

// -------------------- Types --------------------

export const ICategory = {};  // Type marker

// -------------------- Fetch Functions --------------------

const handleFetch = async (res) => {
    if (!res.ok) {
        const body = await res.json().catch(() => null);
        throw new Error(body?.message || "Something went wrong");
    }
    return res.json();
};

// PUBLIC: GET ALL CATEGORIES
export const fetchAllCategories = async () => {
    const res = await fetch(`${API_BASE}/api/categories`, { credentials: "include" });
    return handleFetch(res).then(r => r.categories);
};

// ADMIN: CREATE CATEGORY
export const fetchCreateCategory = async (data) => {
    const res = await fetch(`${API_BASE}/api/categories`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify(data),
    });
    return handleFetch(res).then(r => r.category);
};

// ADMIN: DELETE CATEGORY
export const fetchDeleteCategory = async (id) => {
    const res = await fetch(`${API_BASE}/api/categories/${id}`, {
        method: "DELETE",
        credentials: "include",
    });
    return handleFetch(res);
};

// -------------------- React Query Hooks --------------------

// PUBLIC QUERIES
export const useAllCategoriesQuery = () =>
    useQuery({ queryKey: ["categories"], queryFn: fetchAllCategories, staleTime: 1000 * 60 * 5 });

// ADMIN MUTATIONS
export const useCreateCategoryMutation = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: fetchCreateCategory,
        onSuccess: () => queryClient.invalidateQueries({ queryKey: ["categories"] }),
    });
};

export const useDeleteCategoryMutation = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: fetchDeleteCategory,
        onSuccess: () => queryClient.invalidateQueries({ queryKey: ["categories"] }),
    });
};

// -------------------- Combined Export --------------------

export const categoryApi = {
    fetchAllCategories,
    fetchCreateCategory,
    fetchDeleteCategory,
    useAllCategoriesQuery,
    useCreateCategoryMutation,
    useDeleteCategoryMutation,
};
