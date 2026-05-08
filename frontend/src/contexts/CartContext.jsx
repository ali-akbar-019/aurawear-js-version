import {
    createContext,
    useContext,
} from "react";
import {
    useCartQuery,
    useAddItemMutation,
    useUpdateItemMutation,
    useRemoveItemMutation,
} from "../api/cart.js";

// -------- Context -------- //

const CartContext = createContext(null);

// -------- Provider -------- //

export const CartProvider = ({ children }) => {
    const { data: cart, isLoading, isError } = useCartQuery();

    const addItemMutation = useAddItemMutation();
    const updateItemMutation = useUpdateItemMutation();
    const removeItemMutation = useRemoveItemMutation();

    const addItem = async (payload) => {
        await addItemMutation.mutateAsync(payload);
    };

    const updateItem = async (payload) => {
        await updateItemMutation.mutateAsync(payload);
    };

    const removeItem = async (itemId) => {
        await removeItemMutation.mutateAsync(itemId);
    };

    return (
        <CartContext.Provider
            value={{
                cart,
                isLoading,
                isError,
                addItem,
                updateItem,
                removeItem,
            }}
        >
            {children}
        </CartContext.Provider>
    );
};

// -------- Hook -------- //

export const useCart = () => {
    const ctx = useContext(CartContext);
    if (!ctx) {
        throw new Error("useCart must be used within CartProvider");
    }
    return ctx;
};
