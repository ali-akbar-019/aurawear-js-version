import {
    useMutation,
    useQuery,
    useQueryClient,
} from "@tanstack/react-query";

const API_BASE = import.meta.env.VITE_API_BASE || "";

// -------------------- Types --------------------

export const IReview = {};  // Type marker
export const IReviewPagination = {};  // Type marker

// -------------------- Fetch Helper --------------------

const handleFetch = async (res) => {
    if (!res.ok) {
        const body = await res.json().catch(() => null);
        throw new Error(body?.message || "Something went wrong");
    }
    return res.json();
};

// -------------------- API Functions --------------------

// GET reviews for a product
export const fetchProductReviews = async (
    productId,
    page = 1,
    limit = 10
) => {
    const res = await fetch(
        `${API_BASE}/api/reviews/product/${productId}?page=${page}&limit=${limit}`,
        { credentials: "include" }
    );
    return handleFetch(res);
};

// ADD review for a product
export const fetchAddProductReview = async (
    productId,
    data
) => {
    const res = await fetch(`${API_BASE}/api/reviews/product/${productId}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify(data),
    });
    return handleFetch(res).then(r => r.review);
};

// UPDATE review
export const fetchUpdateReview = async (
    reviewId,
    data
) => {
    const res = await fetch(`${API_BASE}/api/reviews/${reviewId}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify(data),
    });
    return handleFetch(res).then(r => r.review);
};

// DELETE review
export const fetchDeleteReview = async (reviewId) => {
    const res = await fetch(`${API_BASE}/api/reviews/${reviewId}`, {
        method: "DELETE",
        credentials: "include",
    });
    return handleFetch(res);
};

// -------------------- React Query Hooks --------------------

// PRODUCT REVIEWS QUERY
export const useProductReviewsQuery = (
    productId,
    page = 1,
    limit = 10
) =>
    useQuery({
        queryKey: ["productReviews", productId, page, limit],
        queryFn: () => fetchProductReviews(productId, page, limit),
        staleTime: 1000 * 60 * 2,
    });

// ADD REVIEW MUTATION
export const useAddProductReviewMutation = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: ({ productId, data }) => fetchAddProductReview(productId, data),
        onSuccess: (_, { productId }) => {
            queryClient.invalidateQueries({ queryKey: ["productReviews", productId] });
        },
    });
};

// UPDATE REVIEW MUTATION
export const useUpdateReviewMutation = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: ({ reviewId, data }) => fetchUpdateReview(reviewId, data),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["productReviews"], exact: false });
        },
    });
};

// DELETE REVIEW MUTATION
export const useDeleteReviewMutation = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: fetchDeleteReview,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["productReviews"], exact: false });
        },
    });
};

// -------------------- Combined Export --------------------

export const reviewApi = {
    fetchProductReviews,
    fetchAddProductReview,
    fetchUpdateReview,
    fetchDeleteReview,
    useProductReviewsQuery,
    useAddProductReviewMutation,
    useUpdateReviewMutation,
    useDeleteReviewMutation,
};
