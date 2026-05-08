import { createContext, useContext } from "react";
import { AuthProvider } from "./AuthContext.jsx";
import { ProductProvider } from "./ProductContext.jsx";
import { OrderProvider } from "./OrderContext.jsx";
import { CartProvider } from "./CartContext.jsx";
import { CategoriesProvider } from "./CategoriesProvider.jsx";
import { UsersProvider } from "./UserContext.jsx";
import { WishlistProvider } from "./WishlistContext.jsx";


export const AppProviders = ({ children }) => {
    return (
        <AuthProvider>
            <CategoriesProvider>
                <ProductProvider>
                    <OrderProvider>
                        <UsersProvider>

                            <CartProvider>
                                <WishlistProvider>

                                    {children}
                                </WishlistProvider>

                            </CartProvider>
                        </UsersProvider>
                    </OrderProvider>
                </ProductProvider>
            </CategoriesProvider>
        </AuthProvider>
    );
};
