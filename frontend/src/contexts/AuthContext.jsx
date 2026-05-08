// auth.context.jsx
import { createContext, useContext } from "react";
import { authApi } from "../api/auth.js";
import { toast } from "sonner";

const AuthContext = createContext(undefined);

export const AuthProvider = ({ children }) => {
    const { data, isLoading, refetch } = authApi.useMeQuery();

    const loginMutation = authApi.useLoginMutation();
    const logoutMutation = authApi.useLogoutMutation();
    const signupMutation = authApi.useSignupMutation();

    const login = async (email, password) => {
        await loginMutation.mutateAsync({ email, password });
        await refetch();
    };

    const logout = async () => {
        await logoutMutation.mutateAsync();
        toast.success("You have successfully logged out.");
        await refetch();
    };

    const signup = async (name, email, password) => {
        await signupMutation.mutateAsync({ name, email, password });
        await refetch();
    };

    const refreshUser = () => {
        refetch();
    };

    // isLoggedIn is true if user exists and not null
    const isLoggedIn = !!data?.user;

    return (
        <AuthContext.Provider
            value={{
                user: data?.user || null,
                isLoading,
                isLoggedIn,
                login,
                logout,
                signup,
                refreshUser,
            }}
        >
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) throw new Error("useAuth must be used within AuthProvider");
    return context;
};
