import { useEffect, useState } from "react";
import MyOrders from "./myOredrs";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { authAction } from "../redux/slices/auth";
import { cartSliceActions } from "../redux/slices/cartSlice";

function Profile() {
  const {user} = useSelector((state) => state.auth);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    if(!user) {
      navigate("/login")
    }
  },[user, navigate]);

  const handleLogout = () => {
    dispatch(authAction.logout());
    dispatch(cartSliceActions.clearCart());
    navigate("/login")
  }
    
  return (
    <>
      <div>
        <div className="container flex flex-col md:flex-row p-4 md:p-6 mx-auto w-full">
          <div className="w-full md:w-1/3 lg:w-1/4 p-6 shadow-md rounded-lg">
            <div className="w-full p-1">
              <h2 className="mb-3 text-2xl font-bold">{user?.name}</h2>
              <p className="text-gray-900 font-medium mb-3">{user?.email}</p>
              <button onClick={handleLogout} className="bg-red-500 text-white w-full rounded py-1.5 cursor-pointer hover:bg-red-600">
                Log out
              </button>
            </div>
          </div>

          <div className="container md:w-2/3 w-full lg:w-3/4">
            <div>
              {user && <MyOrders />}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Profile;
