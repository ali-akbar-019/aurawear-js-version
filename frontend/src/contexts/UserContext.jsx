import { createContext, useContext } from "react";
import {
    useAllUsersQuery,
    useDeleteUserMutation,
    useUpdateUserProfileMutation,
    useUpdateUserAIAttributesMutation,
} from "../api/users.js";

// -------- Context -------- //

const UsersContext = createContext(null);

// -------- Provider -------- //

export const UsersProvider = ({ children }) => {
    const { data: users, isLoading, isError } = useAllUsersQuery();
    const deleteUserMutation = useDeleteUserMutation();
    const updateProfileMutation = useUpdateUserProfileMutation();
    const updateAIAttributesMutation = useUpdateUserAIAttributesMutation();

    const deleteUser = async (id) => {
        await deleteUserMutation.mutateAsync(id);
    };

    const updateProfile = async (data) => {
        return await updateProfileMutation.mutateAsync(data);
    };

    const updateAIAttributes = async (data) => {
        return await updateAIAttributesMutation.mutateAsync(data);
    };

    return (
        <UsersContext.Provider
            value={{
                users,
                isLoading,
                isError,
                deleteUser,
                updateProfile,
                updateAIAttributes,
            }}
        >
            {children}
        </UsersContext.Provider>
    );
};

// -------- Hook -------- //

export const useUsers = () => {
    const ctx = useContext(UsersContext);
    if (!ctx) {
        throw new Error("useUsers must be used within UsersProvider");
    }
    return ctx;
};
