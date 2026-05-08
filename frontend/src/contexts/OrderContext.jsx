// order.context.jsx
import { createContext, useContext } from "react";
import { orderApi } from "../api/orders.js";

const OrderContext = createContext(undefined);

export const OrderProvider = ({ children }) => {
    // Current user's orders
    const { data: myOrders, isLoading, refetch } = orderApi.useMyOrdersQuery();

    // All orders (for admin)
    const { data: allOrders, isLoading: isLoadingAllOrders, refetch: refetchAll } = orderApi.useAllOrdersQuery();
    const updateOrderStatusMutation = orderApi.useUpdateOrderStatusMutation();

    const updateOrderStatus = async (params) => {
        return updateOrderStatusMutation.mutateAsync(params);
    };

    // Mutation to create order
    const createOrderMutation = orderApi.useCreateOrderMutation();

    const createOrder = async (payload) => {
        return createOrderMutation.mutateAsync(payload);
    };

    const refreshOrders = () => refetch();
    const refreshAllOrders = () => refetchAll();

    const getOrderById = (orderId) => {
        return myOrders?.find(order => order._id === orderId);
    };

    const getAllOrdersById = (orderId) => {
        return allOrders?.find(order => order._id === orderId);
    };

    return (
        <OrderContext.Provider
            value={{
                myOrders,
                allOrders,
                isLoading,
                isLoadingAllOrders,
                createOrder,
                refreshOrders,
                refreshAllOrders,
                getOrderById,
                getAllOrdersById,
                updateOrderStatus,

            }}
        >
            {children}
        </OrderContext.Provider>
    );
};

export const useOrder = () => {
    const context = useContext(OrderContext);
    if (!context) throw new Error("useOrder must be used within OrderProvider");
    return context;
};
