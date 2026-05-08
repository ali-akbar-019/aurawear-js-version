// wishlist.context.jsx
import { createContext, useContext } from "react";
import {
    wishlistApi,
} from "../api/wishlist.js";

const WishlistContext = createContext(undefined);

export const WishlistProvider = ({
    children,
}) => {
    // Fetch wishlist
    const {
        data: wishlist,
        isLoading,
        refetch,
    } = wishlistApi.useWishlistQuery();

    // Mutations
    const addMutation = wishlistApi.useAddToWishlistMutation();
    const removeMutation = wishlistApi.useRemoveFromWishlistMutation();

    const addToWishlist = async (productId) => {
        return addMutation.mutateAsync({ productId });
    };

    const removeFromWishlist = async (productId) => {
        return removeMutation.mutateAsync({ productId });
    };

    const refreshWishlist = () => {
        refetch();
    };

    const isInWishlist = (productId) => {
        return (
            wishlist?.items.some(
                item => item.productId?._id === productId
            ) ?? false
        );
    };

    return (
        <WishlistContext.Provider
            value={{
                wishlist,
                isLoading,
                refreshWishlist,
                addToWishlist,
                removeFromWishlist,
                isInWishlist,
            }}
        >
            {children}
        </WishlistContext.Provider>
    );
};

export const useWishlist = () => {
    const context = useContext(WishlistContext);
    if (!context)
        throw new Error("useWishlist must be used within WishlistProvider");
    return context;
};
