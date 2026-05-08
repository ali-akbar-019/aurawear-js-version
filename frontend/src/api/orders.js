import {
    useQuery,
    useMutation,
    useQueryClient,
} from "@tanstack/react-query";

const API_BASE = import.meta.env.VITE_API_BASE || "";

// -------------------- Types --------------------

export const IOrderItem = {};  // Type marker
export const IShippingAddress = {};  // Type marker
export const IOrder = {};  // Type marker
export const CreateOrderPayload = {};  // Type marker
export const CreateOrderResponse = {};  // Type marker

// -------------------- Fetch Helpers --------------------
const handleFetch = async (res) => {
    if (!res.ok) {
        const body = await res.json().catch(() => null);
        throw new Error(body?.message || "Something went wrong");
    }
    return res.json();
};

// -------------------- Fetch Functions --------------------

export const fetchCreateOrder = async (payload) => {
    const res = await fetch(`${API_BASE}/api/orders`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify(payload),
    });
    return handleFetch(res);
};

export const fetchMyOrders = async () => {
    const res = await fetch(`${API_BASE}/api/orders/me`, { credentials: "include" });
    const body = await handleFetch(res);
    return body.orders;
};

export const fetchOrderById = async (orderId) => {
    const res = await fetch(`${API_BASE}/api/orders/${orderId}`, { credentials: "include" });
    const body = await handleFetch(res);
    return body.order;
};

export const fetchAllOrders = async () => {
    const res = await fetch(`${API_BASE}/api/orders`, { credentials: "include" });
    const body = await handleFetch(res);
    return body.orders;
};

export const fetchUpdateOrderStatus = async (params) => {
    const res = await fetch(`${API_BASE}/api/orders/${params.orderId}/status`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({
            orderStatus: params.orderStatus,
            paymentStatus: params.paymentStatus,
        }),
    });
    const body = await handleFetch(res);
    return body.order;
};

// -------------------- React Query Hooks --------------------

export const useCreateOrderMutation = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: fetchCreateOrder,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["myOrders"] });
        },
    });
};

export const useMyOrdersQuery = () =>
    useQuery({
        queryKey: ["myOrders"],
        queryFn: fetchMyOrders,
        staleTime: 1000 * 60 * 5,
    });

export const useOrderByIdQuery = (orderId) =>
    useQuery({
        queryKey: ["order", orderId],
        queryFn: () => fetchOrderById(orderId),
        enabled: !!orderId,
    });

export const useAllOrdersQuery = () =>
    useQuery({
        queryKey: ["allOrders"],
        queryFn: fetchAllOrders,
        staleTime: 1000 * 60 * 5,
    });

export const useUpdateOrderStatusMutation = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: fetchUpdateOrderStatus,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["allOrders"] });
            queryClient.invalidateQueries({ queryKey: ["myOrders"], exact: false });
        },
    });
};

// -------------------- Combined Export --------------------

export const orderApi = {
    fetchCreateOrder,
    fetchMyOrders,
    fetchOrderById,
    fetchAllOrders,
    fetchUpdateOrderStatus,
    useCreateOrderMutation,
    useMyOrdersQuery,
    useOrderByIdQuery,
    useAllOrdersQuery,
    useUpdateOrderStatusMutation,
};
