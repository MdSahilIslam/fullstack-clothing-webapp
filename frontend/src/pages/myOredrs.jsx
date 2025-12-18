import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { fetchOrders } from "../redux/slices/orderSlice";


function MyOrders() {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const {orders, error, loading} = useSelector((state) => state.orders)

    useEffect(() => {
        dispatch(fetchOrders())
    },[dispatch])

    const handleRowClick = (orderId) => {
        navigate(`/order/${orderId}`)
    }

    if(error) {
        return <p>Error: {error}</p>
    }

    if (loading) {
        return <p>Loading...</p>
    }
    return (
        <>
        <div className="max-w-7xl mx-auto p-4 sm:p-6">
            <h2 className="text-xl sm:text-2xl font-bold mb-6"> My Orders</h2>
            <div className="relative overflow-hidden shadow-md sm:rounded-lg overflow-x-scroll sm:overflow-x-visible">
                <table className="min-w-full text-left text-gray-500">
                    <thead className="bg-gray-100 text-xs uppercase text-gray-700">
                        <tr>
                            <th className="py-2 px-4 sm:py-3">Image</th>
                            <th className="py-2 px-4 sm:py-3">Order Id</th>
                            <th className="py-2 px-4 sm:py-3">Craeted</th>
                            <th className="py-2 px-4 sm:py-3">shipping address</th>
                            <th className="py-2 px-4 sm:py-3">items</th>
                            <th className="py-2 px-4 sm:py-3">price</th>
                            <th className="py-2 px-4 sm:py-3">status</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            orders.length> 0? 
                            orders.map((order) => (
                                 <tr key={order._id} className="border border-white hover:border-gray-300 hover:border-t-gray-300 rounded-xl"
                                 onClick={() => {handleRowClick(order._id)}}>
                                    <td className="p-2 sm:p-4 ">
                                        <img src={order.orderItems[0].image} alt={order.orderItems[0].name} className="w-12 h-12  object-cover rounded-lg"/>
                                    </td>
                                    <td className="p-2 sm:p-4 text-gray-900 text-left font-medium">
                                        <span className="w-full">#{order._id}</span>
                                    </td>
                                    <td className="p-2 sm:p-4   text-left font-medium">
                                        <span className="w-full">{new Date(order.createdAt).toLocaleDateString()} {new Date(order.createdAt).toLocaleTimeString()}</span>
                                    </td>
                                    <td className="p-2 sm:p-4  text-left font-medium">
                                        <span className="w-full">{order.shippingAddress.city},{order.shippingAddress.country}</span>
                                    </td>
                                    <td className="p-2 sm:p-4  text-center font-medium ">
                                        <span className="w-full">{order.orderItems.length}</span>
                                    </td>
                                    <td className="p-2 sm:p-4  text-left font-medium">
                                        <span className="w-full">${order.totalPrice.toFixed(2)}</span>
                                    </td>
                                    <td className="p-2 sm:p-4 text-center">
                                        {order.isPaid? <span className="text-green-900 block bg-green-200 p-1 rounded-lg text-sm">Paid</span>:<span className="text-red-900 block bg-red-200 p-1 rounded-lg text-sm">Pending</span>}
                                    </td>
                                </tr>
                            )):
                            <tr>
                                <td colSpan={7} className="md:text-center font-bold text-xl px-2 py-4 text-gray-500 text-left">
                                    <h2>You have not ordered anything</h2>
                                </td>
                            </tr>
                        }
                    </tbody>
                </table>
            </div>
        </div>
        </>
    )
}

export default MyOrders