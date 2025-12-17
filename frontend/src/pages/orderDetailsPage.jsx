import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useParams } from "react-router-dom";
import { fetchOrderDetails } from "../redux/slices/orderSlice";

function OrderDetailsPage() {
  const { id } = useParams();
  const dispatch = useDispatch();
  const {orderDetails, error, loading} = useSelector((state) => state.orders);

  useEffect(() => {
    dispatch(fetchOrderDetails(id))
  },[dispatch, id])
  if(error) {
        return <p>Error: {error}</p>
    }

  if (loading) {
        return <p>Loading...</p>
    }
  return (
    <div className="max-w-7xl mx-auto p-4 sm:p-6">
      <h2 className="text-2xl md:text-3xl font-bold mb-6">Order Details</h2>
      {!orderDetails ? (
        <p>No order Found</p>
      ) : (
        <div className="p-4 sm:p-6 rounded-lg border">
          {/*Order Info */}
          <div className="flex flex-col sm:flex-row justify-between mb-8">
            <div>
              <h2 className="text-lg md:text-xl font-semibold">
                Order Id : #{orderDetails._id}
              </h2>
              <p className="text-gray-600">
                {new Date(orderDetails.createdAt).toLocaleDateString()}
              </p>
            </div>
            <div className="flex flex-col items-start sm:items-end mt-4 sm:mt-0">
              <span
                className={`${
                  orderDetails.isPaid
                    ? "bg-green-100 text-green-700"
                    : "bg-red-100 text-red-700"
                } px-3 py-1 text-sm font-semibold mb-2 rounded-full`}
              >
                {orderDetails.isPaid ? "Approoved" : "Pending"}
              </span>
              <span
                className={`${
                  orderDetails.isDelivered
                    ? "bg-green-100 text-green-700"
                    : "bg-yellow-100 text-yellow-700"
                } px-3 py-1 text-sm font-semibold mb-2 rounded-full`}
              >
                {orderDetails.isDelivered ? "Delivered" : "Pending Delivery"}
              </span>
            </div>
          </div>

          {/*Payment,Customer, Shipping Info */}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 mb-8">
            <div>
              <h4 className="text-lg font-semibold mb-2">Payment Info</h4>
              <p>Payment Method: {orderDetails.paymentMethod}</p>
              <p>Status: {orderDetails.isPaid ? "Paid" : "Unpaid"}</p>
            </div>
            <div>
              <h4 className="text-lg font-semibold mb-2">Shipping Info</h4>
              <p>Shipping Method: {orderDetails.shippingMethod}</p>
              <p>
                Address:{" "}
                {`${orderDetails.shippingAddress.city}, ${orderDetails.shippingAddress.country}`}
              </p>
            </div>
          </div>

          {}
          <div className="overflow-x-auto">
            <h4 className="text-lg font-semibold mb-4">Products</h4>
            <table className="min-w-full text-gray-600 p-4 mb-4">
              <thead className="bg-gray-300">
                <tr>
                  <th className="text-lg font-bold text-center">Name</th>
                  <th className="text-lg font-bold text-center">Unit Price</th>
                  <th className="text-lg font-bold text-center">Quantity</th>
                  <th className="text-lg font-bold text-center">Total</th>
                </tr>
              </thead>
              <tbody>
                {orderDetails.orderItems.map((item, index) => (
                  <tr key={index} className="border-b border-gray-400 ">
                    <td className="py-2 px-4 flex items-center">
                      <img src={item.image} alt={item.name} className="w-12 h-12 rounded-lg object-cover mr-4" />
                      <Link to={`/order/${item.productId}`}>
                        <span className="text-blue-400 hover:border-b border-blue-400">{item.name}</span>
                      </Link> 
                    </td>
                    <td className="py-2 px-3">${item.price.toFixed(2)}</td>
                    <td className="py-2 px-3">{item.quantity}</td>
                    <td className="py-2 px-3">$ {(item.quantity*item.price).toFixed(2)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
            {/*Back to my order */}
            <Link to="/my-orders" className="text-blue-500 hover:underline">Back to My Orders</Link>
          </div>
        </div>
        
      )}
    </div>
  );
}

export default OrderDetailsPage;
