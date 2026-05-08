import {
    useQuery,
    useMutation,
    useQueryClient,
} from "@tanstack/react-query";

const API_BASE = import.meta.env.VITE_API_BASE || "";

// -------------------- Types --------------------

export const IWishlistProduct = {};  // Type marker
export const IWishlistItem = {};  // Type marker
export const IWishlist = {};  // Type marker

// -------------------- Helpers --------------------

const handleFetch = async (res) => {
    if (!res.ok) {
        const body = await res.json().catch(() => null);
        throw new Error(body?.message || "Something went wrong");
    }
    return res.json();
};

// -------------------- Fetch Functions --------------------

// GET WISHLIST
export const fetchWishlist = async () => {
    const res = await fetch(`${API_BASE}/api/wishlist`, {
        credentials: "include",
    });

    return handleFetch(res).then(
        r => r.wishlist
    );
};

// ADD TO WISHLIST
export const fetchAddToWishlist = async (data) => {
    const res = await fetch(`${API_BASE}/api/wishlist/add`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({ productId: data.productId }),
    });

    return handleFetch(res).then(
        r => r.wishlist
    );
};

// REMOVE FROM WISHLIST
export const fetchRemoveFromWishlist = async (data) => {
    const res = await fetch(`${API_BASE}/api/wishlist/remove`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({ productId: data.productId }),
    });

    return handleFetch(res).then(
        r => r.wishlist
    );
};

// -------------------- React Query Hooks --------------------

// GET
export const useWishlistQuery = () =>
    useQuery({
        queryKey: ["wishlist"],
        queryFn: fetchWishlist,
        staleTime: 1000 * 60 * 5,
    });

// ADD
export const useAddToWishlistMutation = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: fetchAddToWishlist,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["wishlist"] });
        },
    });
};

// REMOVE
export const useRemoveFromWishlistMutation = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: fetchRemoveFromWishlist,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["wishlist"] });
        },
    });
};

// -------------------- Combined Export --------------------

export const wishlistApi = {
    fetchWishlist,
    fetchAddToWishlist,
    fetchRemoveFromWishlist,
    useWishlistQuery,
    useAddToWishlistMutation,
    useRemoveFromWishlistMutation,
};
