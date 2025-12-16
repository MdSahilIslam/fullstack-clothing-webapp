import { useState } from "react";
import { FaBars } from "react-icons/fa6";
import AdminSidebar from "./adminSidebar";
import { Outlet } from "react-router-dom";

function AdminLayout() {
  const [isSidebarOpen, setIsSideBarOpen] = useState(null);

  const toggleSidebar = () => {
    if (window.innerWidth <= "768")
    setIsSideBarOpen(!isSidebarOpen);
  };
  return (
    <div className="min-h-screen flex flex-col md:flex-row relative">
      {/*Mobile togglebutton */}
      <div className="flex md:hidden p-4 bg-gray-900 text-white z-20">
        <button onClick={toggleSidebar}>
          <FaBars size={24} />
        </button>
        <h1 className="ml-4 font-medium text-xl">Admin Dashboard</h1>
      </div>

      {/*Overlay for mobile Sidebar */}
      {isSidebarOpen && (
        <div
          className="bg-black/50 inset-0 fixed z-10"
          onClick={toggleSidebar}
        ></div>
      )}

      {/*Left Sidebar */}
      <div className={`w-64 bg-black text-white min-h-screen fixed z-20 ${isSidebarOpen? "translate-x-0":"-translate-x-full"} transform-translate transition duration-300 md:fixed md:translate-x-0 md:block`}>
        <AdminSidebar toggleSidebar={toggleSidebar}/>
      </div>

      {/*Main content */}
      <div className="flex-grow p-6 overflow-auto md:ml-64">
        <Outlet/>
      </div>
    </div>
  );
}

export default AdminLayout;
