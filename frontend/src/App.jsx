import UserLayout from "./components/layout/userLayout";
// import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/home";
import Footer from "./components/common/footer";
import { Toaster } from "sonner";
import Login from "./pages/login";
import Register from "./pages/register";
import Profile from "./pages/profile";
import CollectionPages from "./pages/collectionPages";
import ProductDetails from "./components/product/productDetails";
import Checkout from "./components/cart/checkout";
import OrderConfirmationPage from "./pages/orderConfirmationPage";
import OrderDetailsPage from "./pages/orderDetailsPage";
import MyOrders from "./pages/myOredrs";
import AdminLayout from "./components/admin/adminLayout";
import AdminHomePage from "./components/admin/adminHomePage";
import UserManagement from "./components/admin/userManagement";
import ProductManagement from "./components/admin/productManagement";
import EditProductPage from "./components/admin/editProductPage";
import OrderManagement from "./components/admin/orderManagement";
import ProtectRoute from "./components/common/protectedRoute";
import AddProductPage from "./components/admin/addProductPage";
function App() {
  return (
    <>
      <BrowserRouter>
        <Toaster position="top-right" />
        <Routes>
          <Route path="/" element={<UserLayout />}>
            <Route index element={<Home />}></Route>
            <Route path="login" element={<Login />}></Route>
            <Route path="register" element={<Register />}></Route>
            <Route path="profile" element={<Profile />}></Route>
            <Route
              path="collection/:collection"
              element={<CollectionPages />}
            ></Route>
            <Route path="products/:id" element={<ProductDetails />} />
            <Route path="checkout" element={<Checkout />} />
            <Route
              path="order-confirmation"
              element={<OrderConfirmationPage />}
            ></Route>
            <Route path="order/:id" element={<OrderDetailsPage />}></Route>
            <Route path="my-orders" element={<MyOrders />} />
          </Route>
          <Route
            path="/admin"
            element={
              <ProtectRoute role="admin">
                <AdminLayout />
              </ProtectRoute>
            }
          >
            <Route index element={<AdminHomePage />}></Route>
            <Route path="users" element={<UserManagement />}></Route>
            <Route path="products" element={<ProductManagement />}></Route>
            <Route
              path="products/:id/edit"
              element={<EditProductPage />}
            ></Route>
            <Route path="add-product" element={<AddProductPage />}></Route>
            <Route path="orders" element={<OrderManagement />}></Route>
          </Route>
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
