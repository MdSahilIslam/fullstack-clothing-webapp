import { FaSignOutAlt } from "react-icons/fa";
import { FaBoxOpen, FaClipboardList, FaShop, FaStore, FaUser } from "react-icons/fa6";
import {  IoMdClose } from "react-icons/io";
import { MdAddTask } from "react-icons/md";
import { useDispatch } from "react-redux";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { authAction } from "../../redux/slices/auth";
import { cartSliceActions } from "../../redux/slices/cartSlice";

function AdminSidebar({toggleSidebar}) {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const handleLogout  = () => {
      dispatch(authAction.logout());
      dispatch(cartSliceActions.clearCart())
        navigate("/")
    }
  return (
    <div className="p-6">
      <div className="mb-6">
        <Link to="/admin" onClick={toggleSidebar} className="text-2xl font-medium">
          Cosmos
        </Link>
      </div>
      <div className="absolute top-3 right-3 text-2xl cursor-pointer md:hidden" onClick={toggleSidebar}>
        <IoMdClose/>
      </div>
      <h2 className="text-xl font-medium text-center mb-6">Adminn Dashboard</h2>

      <nav className="flex flex-col space-y-2">
        <NavLink
          to="/admin/users"
          onClick={toggleSidebar}
          className={({ isActive }) =>
            isActive
              ? "py-4 px-3 flex items-center space-x-2 rounded text-white bg-gray-700"
              : "py-4 px-3 flex items-center space-x-2 rounded text-gray-300 hover:text-white hover:bg-gray-700"
          }
        >
          <FaUser />
          <span>Users</span>
        </NavLink>
        <NavLink
          to="/admin/products"
          onClick={toggleSidebar}
          className={({ isActive }) =>
            isActive
              ? "py-4 px-3 flex items-center space-x-2 rounded text-white bg-gray-700"
              : "py-4 px-3 flex items-center space-x-2 rounded text-gray-300 hover:text-white hover:bg-gray-700"
          }
        >
          <FaBoxOpen />
          <span>Products</span>
        </NavLink>
        <NavLink
          to="/admin/add-product"
          onClick={toggleSidebar}
          className={({ isActive }) =>
            isActive
              ? "py-4 px-3 flex items-center space-x-2 rounded text-white bg-gray-700"
              : "py-4 px-3 flex items-center space-x-2 rounded text-gray-300 hover:text-white hover:bg-gray-700"
          }
        >
          <MdAddTask />
          <span>Add Product</span>
        </NavLink>
        <NavLink
          to="/admin/orders"
          onClick={toggleSidebar}
          className={({ isActive }) =>
            isActive
              ? "py-4 px-3 flex items-center space-x-2 rounded text-white bg-gray-700"
              : "py-4 px-3 flex items-center space-x-2 rounded text-gray-300 hover:text-white hover:bg-gray-700"
          }
        >
          <FaClipboardList />
          <span>Orders</span>
        </NavLink>
        <NavLink
          to="/"
          onClick={toggleSidebar}
          className={({ isActive }) =>
            isActive
              ? "py-4 px-3 flex items-center space-x-2 rounded text-white bg-gray-700"
              : "py-4 px-3 flex items-center space-x-2 rounded text-gray-300 hover:text-white hover:bg-gray-700"
          }
        >
          <FaStore />
          <span>Shop</span>
        </NavLink>
        {/*Logout button */}
        <div className="mt-6">
            <button onClick={handleLogout} className="w-full bg-red-500 hover:bg-red-600 py-2 px-4 rounded flex items-center justify-center text-white cursor-pointer space-x-2">
                <FaSignOutAlt/>
                <span>Log Out</span>
            </button>
        </div>
      </nav>
    </div>
  );
}

export default AdminSidebar;
