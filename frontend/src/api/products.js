import {
    useQuery,
    useMutation,
    useQueryClient,
} from "@tanstack/react-query";

const API_BASE = import.meta.env.VITE_API_BASE || "";

// -------------------- Types --------------------

export const IProductVariant = {};  // Type marker
export const IProductImage = {};  // Type marker
export const IProductAIAttributes = {};  // Type marker
export const IProduct = {};  // Type marker

// -------------------- Fetch Functions --------------------

const handleFetch = async (res) => {
    if (!res.ok) {
        const body = await res.json().catch(() => null);
        throw new Error(body?.message || "Something went wrong");
    }
    return res.json();
};

// PUBLIC: GET ALL PRODUCTS
export const fetchAllProducts = async (params) => {
    const query = params
        ? "?" + new URLSearchParams(Object.fromEntries(Object.entries(params).filter(([_, v]) => v))).toString()
        : "";
    const res = await fetch(`${API_BASE}/api/products${query}`);
    return handleFetch(res).then(r => r.products);
};

// PUBLIC: GET SINGLE PRODUCT
export const fetchProductById = async (id) => {
    const res = await fetch(`${API_BASE}/api/products/${id}`);
    return handleFetch(res).then(r => r.product);
};

// ADMIN: CREATE PRODUCT
export const fetchCreateProduct = async (data) => {
    const res = await fetch(`${API_BASE}/api/products`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify(data),
    });
    return handleFetch(res).then(r => r.product);
};

// ADMIN: UPDATE PRODUCT
export const fetchUpdateProduct = async (id, data) => {
    const res = await fetch(`${API_BASE}/api/products/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify(data),
    });
    return handleFetch(res).then(r => r.product);
};

// ADMIN: DELETE PRODUCT
export const fetchDeleteProduct = async (id) => {
    const res = await fetch(`${API_BASE}/api/products/${id}`, {
        method: "DELETE",
        credentials: "include",
    });
    return handleFetch(res);
};

// -------------------- React Query Hooks --------------------

// PUBLIC QUERIES
export const useAllProductsQuery = (params) =>
    useQuery({ queryKey: ["products", params], queryFn: () => fetchAllProducts(params), staleTime: 1000 * 60 * 5 });

export const useProductQuery = (id) =>
    useQuery({ queryKey: ["product", id], queryFn: () => fetchProductById(id), staleTime: 1000 * 60 * 5 });

// ADMIN MUTATIONS
export const useCreateProductMutation = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: fetchCreateProduct,
        onSuccess: () => queryClient.invalidateQueries({ queryKey: ["products"] }),
    });
};

export const useUpdateProductMutation = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: ({ id, data }) => fetchUpdateProduct(id, data),
        onSuccess: () => queryClient.invalidateQueries({ queryKey: ["products"] }),
    });
};

export const useDeleteProductMutation = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: fetchDeleteProduct,
        onSuccess: () => queryClient.invalidateQueries({ queryKey: ["products"] }),
    });
};

// -------------------- Combined Export --------------------

export const productApi = {
    fetchAllProducts,
    fetchProductById,
    fetchCreateProduct,
    fetchUpdateProduct,
    fetchDeleteProduct,
    useAllProductsQuery,
    useProductQuery,
    useCreateProductMutation,
    useUpdateProductMutation,
    useDeleteProductMutation,
};
