import { Route, Routes } from "react-router-dom"
import AdminSidebar from "./components/AdminSidebar.jsx"
import Layout from "./components/Layout/Layout.jsx"
import Categories from "./pages/admin/Categories.jsx"
import Dashboard from "./pages/admin/Dashboard.jsx"
import MangeAi from "./pages/admin/MangeAi.jsx"
import AdminOrder from "./pages/admin/Order.jsx"
import OrderDetail from "./pages/admin/OrderDetail.jsx"
import ProductCreate from "./pages/admin/ProductCreate.jsx"
import ProductEdit from "./pages/admin/ProductEdit.jsx"
import Products from "./pages/admin/Products.jsx"
import Settings from "./pages/admin/Settings.jsx"
import Users from "./pages/admin/Users.jsx"
import About from "./pages/user/About.jsx"
import AiFit from "./pages/user/AiFit.jsx"
import Cart from "./pages/user/Cart.jsx"
import CategoriesPage from "./pages/user/Categories.jsx"
import Checkout from "./pages/user/Checkout.jsx"
import Contact from "./pages/user/Contact.jsx"
import Home from "./pages/user/Home.jsx"
import Login from "./pages/user/Login.jsx"
import NotFound from "./pages/user/NotFound.jsx"
import OrderConfirmation from "./pages/user/OrderConfirmation.jsx"
import Orders from "./pages/user/Orders.jsx"
import ProductDetail from "./pages/user/ProductDetail.jsx"
import ProductList from "./pages/user/ProductList.jsx"
import Profile from "./pages/user/Profile.jsx"
import Signup from "./pages/user/Signup.jsx"
import Whishlist from "./pages/user/Whishlist.jsx"

const App = () => {
    return (
        <Routes>
            <Route path="/" element={<Layout><Home /></Layout>} />
            <Route path="/profile" element={<Layout><Profile /></Layout>} />
            <Route path="/about" element={<Layout><About /></Layout>} />
            <Route path="/contact" element={<Layout><Contact /></Layout>} />
            <Route path="/shop" element={<Layout><ProductList /></Layout>} />
            <Route path="/shop/:id" element={<Layout><ProductDetail /></Layout>} />
            <Route path="/categories" element={<Layout><CategoriesPage /></Layout>} />
            <Route path="/my-orders" element={<Layout><Orders /></Layout>} />
            <Route path="/ai-fit" element={<Layout><AiFit /></Layout>} />
            <Route path="/cart" element={<Layout><Cart /></Layout>} />
            <Route path="/whishlist" element={<Layout><Whishlist /></Layout>} />
            <Route path="/checkout" element={<Layout><Checkout /></Layout>} />
            <Route path="/order-confirmation/:orderId" element={<Layout><OrderConfirmation /></Layout>} />
            {/* admin */}
            <Route path="/admin/dashboard" element={<AdminSidebar><Dashboard /></AdminSidebar>} />
            <Route path="/admin/manage-users" element={<AdminSidebar><Users /></AdminSidebar>} />
            <Route path="/admin/manage-products" element={<AdminSidebar><Products /></AdminSidebar>} />
            <Route path="/admin/manage-categories" element={<AdminSidebar><Categories /></AdminSidebar>} />
            <Route path="/admin/manage-products/create" element={<AdminSidebar><ProductCreate /></AdminSidebar>} />
            <Route path="/admin/manage-products/edit/:id" element={<AdminSidebar><ProductEdit /></AdminSidebar>} />
            <Route path="/admin/manage-orders" element={<AdminSidebar><AdminOrder /></AdminSidebar>} />
            <Route path="/admin/manage-orders/detail/:orderId" element={<AdminSidebar><OrderDetail /></AdminSidebar>} />
            <Route path="/admin/manage-ai" element={<AdminSidebar><MangeAi /></AdminSidebar>} />
            <Route path="/admin/settings" element={<AdminSidebar><Settings /></AdminSidebar>} />

            {/*  */}
            <Route path="/login" element={<Layout><Login /></Layout>} />
            <Route path="/register" element={<Layout><Signup /></Layout>} />
            <Route path="*" element={<Layout><NotFound /></Layout>} />
        </Routes>
    )
}

export default App
