import { Link, useLocation, useParams, useSearchParams } from "react-router-dom";
import {
  HiOutlineUser,
  HiOutlineShoppingBag,
  HiBars3BottomRight,
} from "react-icons/hi2";
import SearchBar from "../common/searchBar";
import CartDrawer from "./cartDrawer";
import { useState } from "react";
import { IoMdClose } from "react-icons/io";
import { useSelector } from "react-redux";
import { FaHome } from "react-icons/fa";
import { RiMenLine, RiWomenLine } from "react-icons/ri";
import { PiPantsFill } from "react-icons/pi";
import { GiShirt } from "react-icons/gi";

function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [navDrawerOpen, setNavDrawerOpen] = useState(false);
  const { cart } = useSelector((state) => state.cart);
  const {user} = useSelector((state) => state.auth);

  const noOfCartItem = cart?.products?.length || 0;

  const toggleNavDrawer = () => {
    setNavDrawerOpen(!navDrawerOpen);
  };

  const toggleCartDrawer = () => {
    setIsOpen(!isOpen);
  };
  return (
    <>
      <nav className="container mx-auto flex items-center justify-between py-4 px-6">
        <div>
          <Link to="/" className="text-2xl font-medium">
            Cosmos
          </Link>
        </div>

        {/* center navigation links*/}

        <div className="hidden md:flex space-x-6">
          <Link
            to="/collection/all?gender=Men"
            className="text-gray-700 hover:text-black text-sm font-medium uppercase "
          >
            Men
          </Link>
          <Link
            to="/collection/all?gender=Women"
            className="text-gray-700 hover:text-black text-sm font-medium uppercase "
          >
            Women
          </Link>
          <Link
            to="/collection/all?category=Top Wear"
            className="text-gray-700 hover:text-black text-sm font-medium uppercase "
          >
            Top Wear
          </Link>
          <Link
            to="/collection/all?category=Bottom Wear"
            className="text-gray-700 hover:text-black text-sm font-medium uppercase "
          >
            Bottom Wear
          </Link>
        </div>

        {/*Right Icons */}
        <div className="flex items-center space-x-4">
          {user && user.role === "admin" && (
            <Link
              to="/admin"
              className="block sm:px-2 px-1  text-sm bg-black text-white rounded"
            >
              Admin
            </Link>
          )}
          <Link to="/profile" className="hover:text-black">
            <HiOutlineUser className="h-6 w-6 text-gray-700" />
          </Link>
          <button
            className="relative hover:text-black cursor-pointer"
            onClick={toggleCartDrawer}
          >
            <HiOutlineShoppingBag className="h-6 w-6 text-gray-700" />
            {noOfCartItem > 0 && (
              <span className="absolute -top-2 bg-[#ea2e0e] text-white text-xs rounded-full px-2 py-0.5">
                {noOfCartItem}
              </span>
            )}
          </button>
          {/* Search area*/}
          <div className="overflow-hidden">
            <SearchBar />
          </div>

          {/*Hamberger menu*/}
          <button
            className="md:hidden cursor-pointer"
            onClick={toggleNavDrawer}
          >
            <HiBars3BottomRight className="h-6 w-6 text-gray-700" />
          </button>
        </div>
      </nav>
      <CartDrawer isOpen={isOpen} toggleCartDrawer={toggleCartDrawer} />

      {/*Mobile nav Drwaer */}
      <div
        className={`fixed top-0 left-0 w-3/4 sm:w-1/2 md:1/3 h-full bg-white shadow-lg transform transition-transform duration-300 z-50 ${
          navDrawerOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="flex justify-end p-4">
          <button onClick={toggleNavDrawer}>
            <IoMdClose className="h-6 w-6 text-gray-600 cursor-pointer" />
          </button>
        </div>
        <div className="p-4">
          <h2 className="text-xl font-semibold mb-4 ml-4 border-b-2 mr-5">Menu</h2>
          <nav className="mr-4 ml-3 ">
            <Link
              to="/"
              onClick={toggleNavDrawer}
              className=" text-amber-600 active:text-gray-600 pb-1 rounded-2xl pl-4 mb-1.5 bg-amber-100 flex justify-left align-text-bottom gap-2"
            >
              <FaHome className="pt-1 text-xl text-gray-600"/>
              Home
            </Link>
            <Link
              to="/collection/all?gender=Men"
              onClick={toggleNavDrawer}
              className=" text-amber-600 active:text-gray-600 pb-1 rounded-2xl bg-amber-100 pl-4 mb-1.5 flex justify-left align-text-bottom gap-2"
            >
              <RiMenLine className="pt-1 text-xl text-gray-600"/>
              Men
            </Link>
            <Link
              to="/collection/all?gender=Women"
              onClick={toggleNavDrawer}
              className=" text-amber-600 active:text-gray-600 pb-1 rounded-2xl pl-4 mb-1.5 bg-amber-100 flex justify-left align-text-bottom gap-2"
            >
              <RiWomenLine className="pt-1 text-xl text-gray-600"/>
              Women
            </Link>
            <Link
              to="/collection/all?category=Top Wear"
              onClick={toggleNavDrawer}
              className=" text-amber-600 active:text-gray-600 pb-1 rounded-2xl pl-4 mb-1.5 bg-amber-100 flex justify-left align-text-bottom gap-2"
            >
              <GiShirt className="pt-1 text-xl text-gray-600"/>
              Top Wear
            </Link>
            <Link
              to="/collection/all?category=Bottom Wear"
              onClick={toggleNavDrawer}
              className=" text-amber-600 active:text-gray-600 pb-1 rounded-2xl pl-4 mb-1.5 bg-amber-100 flex justify-left align-text-bottom gap-2"
            >
              <PiPantsFill className="pt-1 text-xl text-gray-600"/>
              Bottom Wear
            </Link>
          </nav>
        </div>
      </div>
    </>
  );
}

export default Navbar;
