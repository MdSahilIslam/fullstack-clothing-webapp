import { Link, useLocation, useNavigate } from "react-router-dom";
import registerImage from "../../src/assets/register.webp"
import { useEffect, useState } from "react";
import { registerUser } from "../redux/slices/auth";
import { useDispatch, useSelector } from "react-redux";
import { mergeCart } from "../redux/slices/cartSlice";
import { BsEye, BsEyeSlash } from "react-icons/bs";

function Register() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const [show, setShow] = useState(false)
  const {user, guestId, loading, error} = useSelector((state) => state.auth);
  const {cart} = useSelector((state) => state.cart);
  
  const redirect = new URLSearchParams(location.search).get("redirect") || "/";
  const isCheckoutRedirect = redirect.includes("checkout");
  
  useEffect(() => {
    if(user) {
      if(cart?.products > 0 && guestId) {
        dispatch(mergeCart({guestId, user})).then(
          () => {
            navigate(isCheckoutRedirect? "/checkout" : "/")
          }
        )   
      }else{
          navigate(isCheckoutRedirect? "/checkout" : "/")
      }
    }
  },[user, guestId, cart, navigate, dispatch, isCheckoutRedirect]);

  const toggleShow = () => {
    setShow(!show)
  }

  let Message= ""

  if(error) {
    if (error.includes("Server err:ValidationError: password: Path `password`") ) {
      Message = "Minimum password character 6"
    } 
    if (error.includes("Server err:MongoServerError: E11000 duplicate key error collection: Cosmos.users index: email_1 dup")){
      Message = "Email alredy exist"
    }
    
    
  }



  const handleSubmit = (e) => {
      e.preventDefault();
      dispatch(registerUser({name,email,password}))
  }
  return (
    <>
      <div className="flex">
        <div className="w-full md:w-1/2 p-8 md:p-12 flex justify-center items-center">
          <form
            action="/register"
            onSubmit={handleSubmit}
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
              <label htmlFor="name" className="block text-sm font-bold">
                Name
              </label>
              <input
                type="text"
                value = {name}
                onChange = {(e) => {setName(e.target.value)}}
                placeholder="Enter you Name"
                className="w-full  p-2 border border-gray-400 rounded"
              />
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
                className="w-full  p-2 border border-gray-400 rounded"
              />
            </div>
            <div className="w-full mb-4 text-left relative">
              <label htmlFor="password" className="block text-sm font-bold">
                Password
              </label>
              <input
                type={show? "text":"password"}
                value={password}
                onChange={(e) => {setPassword(e.target.value)}}
                placeholder="Min Length 6 digit"
                className="w-full p-2 border border-gray-400 rounded"
              />
              <div className="absolute text-xl top-8 right-2.5" onClick={toggleShow}>
                {show? <BsEyeSlash />:<BsEye />}
              </div>
            </div>
            {
              error? <div className="text-[0.9rem] mb-3 border bg-red-500/50 rounded-md">{Message}</div>: null
            }
            
            <div className="w-full mb-5">
              <button
                type="submit"
                className="w-full text-md text-white bg-black boredr rounded-lg text-sm py-2 cursor-pointer"
              >
                {loading? "Loading..." : "Sign Up"}
              </button>
            </div>
            <div className="flex justify-center mb-4">
              <p className="text-sm text-gray-900">Alredy have an account?{" "}
              <Link to={`/login?redirect=${encodeURIComponent(redirect)}`} className="text-sm text-blue-500">
                {" "}Login
              </Link>
              </p>
            </div>
          </form>
        </div>

        <div className="hidden w-1/2 md:block h-full">
            <div className="h-full flex flex-col justify-center">
            <img src={registerImage} alt="Login Image" className="w-full h-150 object-cover "/>
            </div>
        </div>
      </div>
    </>
  );
}

export default Register;
