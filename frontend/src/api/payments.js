import {
    useMutation,
    useQuery,
    useQueryClient,
} from "@tanstack/react-query";

const API_BASE = import.meta.env.VITE_API_BASE || "";

// -------------------- Types --------------------

export const IPaymentStatusResponse = {};  // Type marker
export const CreatePaymentIntentPayload = {};  // Type marker
export const VerifyPaymentPayload = {};  // Type marker

// -------------------- Fetch Functions --------------------

const handleFetch = async (res) => {
    if (!res.ok) {
        const body = await res.json().catch(() => null);
        throw new Error(body?.message || "Something went wrong");
    }
    return res.json();
};

// CREATE PAYMENT INTENT
export const fetchCreatePaymentIntent = async (payload) => {
    const res = await fetch(`${API_BASE}/api/payments/create-intent`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify(payload),
    });
    return handleFetch(res);
};

// VERIFY PAYMENT
export const fetchVerifyPayment = async (payload) => {
    const res = await fetch(`${API_BASE}/api/payments/verify`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify(payload),
    });
    return handleFetch(res);
};

// -------------------- React Query Hooks --------------------

export const useCreatePaymentIntentMutation = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: fetchCreatePaymentIntent,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["myOrders"] });
            queryClient.invalidateQueries({ queryKey: ["cart"] });
        },
    });
};

export const useVerifyPaymentMutation = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: fetchVerifyPayment,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["myOrders"] });
            queryClient.invalidateQueries({ queryKey: ["allOrders"] });
        },
    });
};

// -------------------- Combined Export --------------------

export const paymentApi = {
    fetchCreatePaymentIntent,
    fetchVerifyPayment,
    useCreatePaymentIntentMutation,
    useVerifyPaymentMutation,
};
