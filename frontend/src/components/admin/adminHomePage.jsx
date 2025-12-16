import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux"
import { Link } from "react-router-dom"
import { fetchAdminProducts } from "../../redux/slices/adminProductSlice";
import { fetchAllAdminOrders } from "../../redux/slices/adminOrderSlice";

function AdminHomePage() {
    const dispatch = useDispatch();
    const {orders,totalOrders, totalSales, loading: ordersLoaidng, error: ordersError} = useSelector((state) => state.adminOrders);
    const {products, loading: productsLoading, error: productsError} = useSelector((state) => state.adminProduct);

    useEffect(() => {
        dispatch(fetchAllAdminOrders());
        dispatch(fetchAdminProducts())
    },[dispatch]);
    return (
        <div className="max-w-7xl mx-auto p-6">
            {ordersLoaidng || productsLoading ? <p>Loading...</p>:(ordersError?  <p>Error:{ordersError}</p>: (productsError? <p>Error: {productsError}</p>:(
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                <div className="rounded-lg shadow-md p-4 ">
                    <h2 className="font-semibold text-xl">Revenue</h2>
                    <p className="text-2xl">$ {totalSales.toFixed(2)}</p>
                </div>
                <div className="rounded-lg shadow-md p-4 ">
                    <h2 className="font-semibold text-xl">Total Orders</h2>
                    <p className="text-2xl">{totalOrders}</p>
                    <Link to="/admin/orders" className="text-blue-500 hover:underline">Manage Orders</Link>
                </div>
                <div className="rounded-lg shadow-md p-4 ">
                    <h2 className="font-semibold text-xl">Total Products</h2>
                    <p className="text-2xl">{products.length}</p>
                    <Link to="/admin/products" className="text-blue-500 hover:underline">Manage Products</Link>
                </div>
            </div>)))}
            <div className="mt-6">
                <h2 className="text-2xl font-bold mb-4">Recent Orders</h2>
                <div className="overflow-x-auto">
                    <table className="min-w-full text-gray-500 text-left">
                        <thead className="bg-gray-100 text-xs text-gray-700 uppercase">
                            <tr>
                                <th className="py-3 px-4">Oredr Id</th>
                                <th className="py-3 px-4">User</th>
                                <th className="py-3 px-4">Total Price</th>
                                <th className="py-3 px-4">Status</th>
                            </tr>
                        </thead>
                        <tbody>
                            {orders.length > 0? (
                                orders.map((order) => (
                                    <tr key={order._id} className="border-b border-gray-300 hover:bg-gray-50 cursor-pointer">
                                        <td className="p-4">{order._id}</td>
                                        <td className="p-4">{order.user.name}</td>
                                        <td className="p-4">{order.totalPrice.toFixed(2)}</td>
                                        <td className="p-4">{order.status}</td>
                                    </tr>
                                ))
                            ):(
                                <tr>
                                    <td colSpan={4} className="text-gray-500 text-center p-4">No Recent Orders Found</td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    )
}

export default AdminHomePage