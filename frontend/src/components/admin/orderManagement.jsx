import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { fetchAllAdminOrders, updateOrderStatus } from "../../redux/slices/adminOrderSlice";

function OrderManagement() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const {user} = useSelector((state) => state.auth);
  const {orders, loading, error} = useSelector((state) => state.adminOrders);

  useEffect(() => {
    if(!user || user.role !== "admin") {
      navigate("/")
    }else{
      dispatch(fetchAllAdminOrders())
    }
  },[dispatch, user, navigate]);

  const handleStatusChange = (id, value) => {
    dispatch(updateOrderStatus({id, status: value}))
  };
  
  if(loading)  {
    <p className="text-center">Loading...</p>
  }

   if(error)  {
    <p className="text-center">Error:{error}.</p>
  }
  return (
    <div className="max-w-7xl mx-auto p-6">
      <h2 className="text-2xl font-bold mb-6">Order Management</h2>

      <div className="overflow-x-auto shadow-md sm:rounded-lg">
        <table className="min-w-full text-left text-gray-500">
          <thead className="bg-gray-100 text-gray-700 upperclass text-xs">
            <tr>
              <th className="px-4 py-3">Order Id </th>
              <th className="px-4 py-3">Customer</th>
              <th className="px-4 py-3">Total Price</th>
              <th className="px-4 py-3">Status</th>
              <th className="px-4 py-3">Actions</th>
            </tr>
          </thead>
          <tbody>
            {orders.length > 0 ? (
              orders.map((order, index) => (
                <tr
                  key={order._id}
                  className="border-b hover:bg-gray-50cursor-pointer"
                >
                  <td className="p-4 font-medium text-gray-900 whitespace-nowrap">
                    #{order._id}
                  </td>
                  <td className="p-4">{order.user.name}</td>
                  <td className="p-4">${order.totalPrice.toFixed(2)}</td>
                  <td className="p-4">
                    <select
                      value={order.status}
                      onChange={(e) => {
                        handleStatusChange(order._id, e.target.value);
                      }}
                      className='bg-gray-50 text-gray-900 border border-gray-300 text-sm p-2.5 rounded-lg block focus:border-blue-500 '
                    >
                      <option value="Processing">Processing</option>
                      <option value="Shipped">Shipped</option>
                      <option value="Delivered">Delivered</option>
                      <option value="Cancelled">Cancelled</option>
                    </select>
                  </td>
                  <td className="p-4">
                    <button onClick={(e) => handleStatusChange(order._id,"Delivered")} className="bg-green-500 text-white hover:bg-green-600 py-2 px-4 rounded-md cursor-pointer">Mark as Delivered</button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={5} className="text-gray-500 p-4 text-center">No Recent Orders.</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default OrderManagement;
