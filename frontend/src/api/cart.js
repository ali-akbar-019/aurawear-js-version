import {
    useQuery,
    useMutation,
    useQueryClient,
} from "@tanstack/react-query";

const API_BASE = import.meta.env.VITE_API_BASE || "";

// -------- Types -------- //
export const ICartItemVariant = {};  // Type marker
export const ICartItem = {};  // Type marker
export const ICart = {};  // Type marker

// -------- Fetch Functions -------- //

const handleFetch = async (res) => {
    if (!res.ok) {
        const body = await res.json().catch(() => null);
        throw new Error(body?.message || "Something went wrong");
    }
    return res.json();
};

export const fetchCart = async () => {
    const res = await fetch(`${API_BASE}/api/cart`, { credentials: "include" });
    const body = await handleFetch(res);
    return body.cart;
};

export const fetchAddItem = async (payload) => {
    const res = await fetch(`${API_BASE}/api/cart`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify(payload),
    });
    const body = await handleFetch(res);
    return body.cart;
};

export const fetchUpdateItem = async (payload) => {
    const res = await fetch(`${API_BASE}/api/cart/${payload.itemId}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({ quantity: payload.quantity }),
    });
    const body = await handleFetch(res);
    return body.cart;
};

export const fetchRemoveItem = async (itemId) => {
    const res = await fetch(`${API_BASE}/api/cart/${itemId}`, {
        method: "DELETE",
        credentials: "include",
    });
    const body = await handleFetch(res);
    return body.cart;
};

// -------- React Query Hooks -------- //

export const useCartQuery = () =>
    useQuery({
        queryKey: ["cart"],
        queryFn: fetchCart,
        staleTime: 1000 * 60 * 5, // 5 minutes
    });

export const useAddItemMutation = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: fetchAddItem,
        onSuccess: () => queryClient.invalidateQueries({ queryKey: ["cart"] }),
    });
};

export const useUpdateItemMutation = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: fetchUpdateItem,
        onSuccess: () => queryClient.invalidateQueries({ queryKey: ["cart"] }),
    });
};

export const useRemoveItemMutation = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: fetchRemoveItem,
        onSuccess: () => queryClient.invalidateQueries({ queryKey: ["cart"] }),
    });
};

// -------- Combined Simple Export -------- //

export const cartApi = {
    useCartQuery,
    useAddItemMutation,
    useUpdateItemMutation,
    useRemoveItemMutation,

    fetchCart,
    fetchAddItem,
    fetchUpdateItem,
    fetchRemoveItem,
};
