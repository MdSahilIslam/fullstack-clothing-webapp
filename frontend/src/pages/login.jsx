import { Link, useLocation, useNavigate } from "react-router-dom";
import loginImage from "../../src/assets/login.webp"
import { useEffect, useState } from "react";
import {useDispatch, useSelector} from "react-redux"
import { loginUser } from "../redux/slices/auth";
import { mergeCart } from "../redux/slices/cartSlice";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useDispatch()
  const navigate = useNavigate();
  const location = useLocation();
  const {user, guestId, loading} = useSelector((state) => state.auth);
  const {cart} = useSelector((state) => state.cart);

  const redirect = new URLSearchParams(location.search).get("redirect") || "/";
  const isCheckoutRedirect = redirect.includes("checkout");
  useEffect(() => {
    if(user) {
      if(cart?.products.length > 0 && guestId) {
        dispatch(mergeCart({guestId, user})).then(
          () => {
            navigate(isCheckoutRedirect? "/checkout" : "/")
          }
        )   
      }else{
          navigate(isCheckoutRedirect? "/checkout" : "/")
      }
    }
  },[user, guestId, cart, navigate, dispatch, isCheckoutRedirect])

  const handleSubmitLogin = (e) => {
        e.preventDefault()
        dispatch(loginUser({email, password}));
  }
  return (
    <>
      <div className="flex">
        <div className="w-full md:w-1/2 p-8 md:p-12 flex justify-center items-center">
          <form
            action="/login"
            onSubmit={handleSubmitLogin}
            className="px-6 py-4 max-w-md mx-auto border border-gray-400 rounded-lg text-center shadow-sm"
          >
            <div className="w-full mb-4 mt-2 mx-auto ">
              <h2 className="text-xl font-semibold">Cosmos</h2>
            </div>
            <div className="w-full mb-4 mx-auto">
              <h2 className="text-2xl font-bold">Hey There!🖐</h2>
            </div>
            <div className="w-full px-5 mb-4 mx-auto">
              <p className="text-md ">Enter you username and Password</p>
            </div>
            <div className="w-full mb-4 text-left">
              <label htmlFor="email" className="block text-sm font-bold">
                Email
              </label>
              <input
                type="email"
                value = {email}
                onChange = {(e) => {setEmail(e.target.value)}}
                placeholder="Enter you Email"
                className="w-full  p-2 border-1 border-gray-400 rounded"
              />
            </div>
            <div className="w-full mb-4 text-left">
              <label htmlFor="password" className="block text-sm font-bold">
                Password
              </label>
              <input
                type="password"
                value={password}
                onChange={(e) => {setPassword(e.target.value)}}
                placeholder="Enter Password"
                className="w-full p-2 border-1 border-gray-400 rounded"
              />
            </div>
            <div className="w-full mb-5">
              <button
                type="submit"
                className="w-full text-md text-white bg-black boredr rounded-lg text-sm py-2 cursor-pointer"
              >
               {loading? "Loading..." : "Sign In"}
              </button>
            </div>
            <div className="flex justify-center mb-4">
              <p className="text-sm text-gray-900">Don't have an account?{" "}
              <Link to={`/register?redirect=${encodeURIComponent(redirect)}`} className="text-sm text-blue-500">
                {" "}Register
              </Link>
              </p>
            </div>
          </form>
        </div>

        <div className="hidden w-1/2 md:block h-full">
            <div className="h-full flex flex-col justify-center">
            <img src={loginImage} alt="Login Image" className="w-full h-[600px] object-cover "/>
            </div>
        </div>
      </div>
    </>
  );
}

export default Login;
