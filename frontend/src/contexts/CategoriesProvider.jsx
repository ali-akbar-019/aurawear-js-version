import { createContext, useContext } from "react";
import {
    useAllCategoriesQuery,
    useCreateCategoryMutation,
    useDeleteCategoryMutation,
} from "../api/categories.js";

// -------- Context -------- //

const CategoriesContext = createContext(null);

// -------- Provider -------- //

export const CategoriesProvider = ({ children }) => {
    const { data: categories, isLoading, isError } = useAllCategoriesQuery();
    const createCategoryMutation = useCreateCategoryMutation();
    const deleteCategoryMutation = useDeleteCategoryMutation();

    const addCategory = async (data) => {
        await createCategoryMutation.mutateAsync(data);
    };

    const deleteCategory = async (id) => {
        await deleteCategoryMutation.mutateAsync(id);
    };

    return (
        <CategoriesContext.Provider
            value={{
                categories,
                isLoading,
                isError,
                addCategory,
                deleteCategory,
            }}
        >
            {children}
        </CategoriesContext.Provider>
    );
};

// -------- Hook -------- //

export const useCategories = () => {
    const ctx = useContext(CategoriesContext);
    if (!ctx) {
        throw new Error("useCategories must be used within CategoriesProvider");
    }
    return ctx;
};
