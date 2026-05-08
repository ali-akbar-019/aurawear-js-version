// product.context.jsx
import { createContext, useContext } from "react";
import {
    productApi,
} from "../api/products.js";

const ProductContext = createContext(undefined);

export const ProductProvider = ({ children }) => {
    // Fetch all products
    const { data: products, isLoading, refetch } = productApi.useAllProductsQuery();

    // Admin mutations
    const createProductMutation = productApi.useCreateProductMutation();
    const updateProductMutation = productApi.useUpdateProductMutation();
    const deleteProductMutation = productApi.useDeleteProductMutation();

    const createProduct = async (data) => {
        return createProductMutation.mutateAsync(data);
    };

    const updateProduct = async (id, data) => {
        return updateProductMutation.mutateAsync({ id, data });
    };

    const deleteProduct = async (id) => {
        return deleteProductMutation.mutateAsync(id);
    };

    const refreshProducts = () => {
        refetch();
    };

    const getProductById = (id) => {
        return products?.find(p => p._id === id);
    };

    return (
        <ProductContext.Provider
            value={{
                products,
                isLoading,
                refreshProducts,
                getProductById,
                createProduct,
                updateProduct,
                deleteProduct,
            }}
        >
            {children}
        </ProductContext.Provider>
    );
};

export const useProduct = () => {
    const context = useContext(ProductContext);
    if (!context) throw new Error("useProduct must be used within ProductProvider");
    return context;
};
