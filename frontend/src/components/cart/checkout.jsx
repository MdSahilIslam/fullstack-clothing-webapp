import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import PayPalButton from "./paypalButton";
import { useDispatch, useSelector } from "react-redux";
import { creatCheckout } from "../../redux/slices/checkoutSlice";
import axios from "axios"


function Checkout() {
  const [checkoutId, setCheckoutId] = useState(null);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { cart, loading, error } = useSelector((state) => state.cart);
  const { user } = useSelector((state) => state.auth);

  useEffect(() => {
    if (!cart || !cart.products || !cart.products.length === 0) {
      navigate("/");
    }
  }, [cart, navigate]);

  const [shippingAddress, setShippingAddress] = useState({
    firstName: "",
    lastName: "",
    address: "",
    city: "",
    postalCode: "",
    country: "",
    phone: "",
  });

  const handleCreateCheckout = async (e) => {
    e.preventDefault();
    if (cart && cart.products.length > 0) {
      {
        const res = await dispatch(
          creatCheckout({
            checkoutItems: cart.products,
            shippingAddress,
            paymentMethod: "Paypal",
            totalPrice: cart.totalPrice,
          })
        );
        if (res.payload && res.payload._id) {
          setCheckoutId(res.payload._id);
        }
      }
    }
  };

  const handlePaymentSuccess = async (details) => {
    try {
      const response = await axios.put(
        `${import.meta.env.VITE_BACKEND_URL}/api/checkout/${checkoutId}/pay`,
        {
          paymentStatus: "paid",
          paymentMethod: details,
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );

      if (response.status === 200) {
        await handleFinalizeCheckout(checkoutId);
      } else {
        console.error(error);
      }
    } catch (err) {
      console.error(err);
    }
  };

  const handleFinalizeCheckout = async (checkoutId) => {
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_BACKEND_URL}/api/checkout/${checkoutId}/finalize`,
        {},
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      
      if (response.status === 200) {
        navigate("/order-confirmation");
      } else {
        console.error(error);
      }
    } catch (err) {
      console.error(err);
    }
  };

  if(loading) {
    return <p className="text-center">Loading...</p>
  }

  if(error) {
    return <p className="text-center">error: {error}</p>
  }

  if(!cart.products || cart.products.length === 0){
    <p className="text-center">Your cart is Empty.</p>
  }
  return (
    <div>
      <div className="grid grid-cols-1 gap-8 lg:grid-cols-2 px-6 py-10 mx-auto max-w-7xl tracking-tighter">
        {/*left side form */}
        <div className=" bg-white rounded-lg p-6 ">
          <h2 className="font-medium text-2xl uppercase mb-6">CheckOut</h2>
          <form action="" onSubmit={handleCreateCheckout}>
            <h4 className="text-lg mb-4 font-medium">Contact Details</h4>
            <div className="mx-auto mb-4">
              <label htmlFor="" className="block text-gray-700">
                Email
              </label>
              <input
                type="email"
                value={user? user.email : ""}
                className="border border-gray-400 p-2 rounded-sm w-full focus:outline-none text-gray-800"
                placeholder="Enter your Email"
                disabled
              />
            </div>
            <h4 className="text-lg mb-4 font-medium">Delivery</h4>
            <div className="mx-auto mb-2 grid grid-cols-2 gap-2">
              <div className="">
                <label htmlFor="" className="block text-gray-700">
                  First Name
                </label>
                <input
                  type="text"
                  value={shippingAddress.firstName}
                  onChange={(e) => {
                    setShippingAddress({
                      ...shippingAddress,
                      firstName: e.target.value,
                    });
                  }}
                  className="border border-gray-400 p-2 rounded-sm w-full focus:outline-none text-gray-800"
                  placeholder="Enter first name"
                />
              </div>
              <div className="">
                <label htmlFor="" className="block text-gray-700">
                  Last Name
                </label>
                <input
                  type="text"
                  value={shippingAddress.lastName}
                  onChange={(e) => {
                    setShippingAddress({
                      ...shippingAddress,
                      lastName: e.target.value,
                    });
                  }}
                  className="border border-gray-400 p-2 rounded-sm w-full focus:outline-none text-gray-800"
                  placeholder="Enter Last name"
                />
              </div>
            </div>
            <div className="mb-2">
              <label htmlFor="" className="block text-gray-700">
                Address
              </label>
              <input
                type="text"
                value={shippingAddress.address}
                onChange={(e) => {
                  setShippingAddress({
                    ...shippingAddress,
                    address: e.target.value,
                  });
                }}
                className="border border-gray-400 p-2 rounded-sm w-full focus:outline-none text-gray-800"
                required
                placeholder="Enter your address"
              />
            </div>
            <div className="mx-auto mb-2 grid grid-cols-2 gap-2">
              <div className="">
                <label htmlFor="" className="block text-gray-700">
                  City
                </label>
                <input
                  type="text"
                  value={shippingAddress.city}
                  onChange={(e) => {
                    setShippingAddress({
                      ...shippingAddress,
                      city: e.target.value,
                    });
                  }}
                  className="border border-gray-400 p-2 rounded-sm w-full focus:outline-none text-gray-800"
                  placeholder="Enter City"
                />
              </div>
              <div className="">
                <label htmlFor="" className="block text-gray-700">
                  Postal Code
                </label>
                <input
                  type="text"
                  value={shippingAddress.postalCode}
                  onChange={(e) => {
                    setShippingAddress({
                      ...shippingAddress,
                      postalCode: e.target.value,
                    });
                  }}
                  className="border border-gray-400 p-2 rounded-sm w-full focus:outline-none text-gray-800"
                  placeholder="Enter Postal Code"
                />
              </div>
            </div>
            <div className="mb-2">
              <label htmlFor="" className="block text-gray-700">
                Country
              </label>
              <input
                type="text"
                value={shippingAddress.country}
                onChange={(e) => {
                  setShippingAddress({
                    ...shippingAddress,
                    country: e.target.value,
                  });
                }}
                className="border border-gray-400 p-2 rounded-sm w-full focus:outline-none text-gray-800"
                required
                placeholder="Enter Country"
              />
            </div>
            <div className="mb-2">
              <label htmlFor="" className="block text-gray-700">
                Phone No.
              </label>
              <input
                type="tel"
                value={shippingAddress.phone}
                onChange={(e) => {
                  setShippingAddress({
                    ...shippingAddress,
                    phone: e.target.value,
                  });
                }}
                required
                className="border border-gray-400 p-2 rounded-sm w-full focus:outline-none text-gray-800"
                placeholder="Enter Phone No."
              />
            </div>
            <div className="mt-4">
              {!checkoutId ? (
                <button
                  type="submit"
                  className="w-full py-2.5 bg-black text-white rounded-md cursor-pointer  text-lg"
                >
                  Continue to Payment
                </button>
              ) : (
                <div>
                  <h3 className="text-lg mb-4">Pay with Paypal</h3>
                  <PayPalButton
                    amount={cart.totalPrice}
                    onSuccess={handlePaymentSuccess}
                    onError={(error) => alert("TransactionFailed. Try again!!")}
                  />
                </div>
              )}
            </div>
          </form>
        </div>

        {/*Right side  */}
        <div className="bg-gray-50 p-6 rounded-lg">
          <h3 className="text-lg mb-4">Order Summary</h3>
          <div className="border-t border-gray-400 flex flex-col items-start justify-between py-4 mb-4">
            {cart.products.map((product, index) => (
              <div
                key={index}
                className="flex items-start justify-between border-bottom w-full border-b py-2 border-gray-300"
              >
                <div className="flex items-start">
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-20 h-24 object-cover mr-4"
                  />
                  <div className="">
                    <h3 className=" text-md">{product.name}</h3>
                    <p className="text-gray-500">size:{product.size}</p>
                    <p className="text-gray-500">color:{product.color}</p>
                  </div>
                </div>
                <div>
                  <h2 className="text-xl">
                    ${product.price?.toLocaleString()}
                  </h2>
                </div>
              </div>
            ))}
          </div>
          <div className="flex items-center justify-between mb-4 text-lg">
            <p>Subtotal</p>
            <p>${cart.totalPrice?.toLocaleString()}</p>
          </div>
          <div className="flex items-center justify-between text-lg">
            <p>Shipping</p>
            <p>Free</p>
          </div>
          <div className="flex items-center justify-between text-lg mt-4 pt-4 border-t border-gray-400">
            <p>Total</p>
            <p>${cart.totalPrice?.toLocaleString()}</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Checkout;
