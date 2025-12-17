import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { cartSliceActions } from "../redux/slices/cartSlice";

function OrderConfirmationPage() {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const {checkout} = useSelector((state) => state.checkout);

    useEffect(() => {
        if(checkout && checkout._id) {
            dispatch(cartSliceActions.clearCart())
        }else{
            navigate("/my-orders")
        }
    },[checkout, navigate, dispatch])
    const calculateEstimatedDeliveryDate = (createdAt) => {
        const orderDate = new Date(createdAt);
        orderDate.setDate(orderDate.getDate() + 10);
        
        return orderDate.toLocaleDateString()
    }
    return (
        <div className="max-w-4xl mx-auto p-6 bg-white">
            <h1 className="text-4xl font-bold text-center text-emerald-700 mb-8">Thank You For Your Order!</h1>
            
            {checkout && (
                <div className="p-6 rounded-lg border border-gray-500">
                    <div className="flex justify-between flex-col md:flex-row mb-20">
                        {/*Order id and date */}
                        <div>
                            <h2 className="text-xl font-semibold">Order Id: {checkout._id}</h2>
                            <p className="text-gray-500">Order Date:{new Date(checkout.createdAt).toLocaleDateString()}</p>
                        </div>
                        {/*Estimated delivery */}
                        <div> 
                            <p className="text-emerald-700 text-sm ">
                                Estimated Delivery: {calculateEstimatedDeliveryDate(checkout.createdAt)}
                            </p>
                        </div>

                    </div>

                    {/*Ordered Items */}
                    <div className="mb-20">
                        {checkout.checkoutItems.map((item) =>(
                            <div key={item.productId} className="flex items-center mb-4">
                                <img src={item.image} alt={item.name} className="mr-4 w-16 h-16 rounded-sm object-cover" />
                                <div>
                                    <h4 className="text-md font-semibold">{item.name}</h4>
                                    <p className="text-sm text-gray-500">
                                        {item.color} | {item.size}
                                    </p>
                                </div>
                                <div className="text-left ml-auto">
                                    <p className="text-md">$ {item.price.toFixed(2)}</p>
                                    <p className="text-sm text-gray-500"> Qty: {item.quantity}</p>
                                </div>
                            </div>
                        ))}
                    </div>

                    {/*Payment and delivery info */}
                    <div className="grid grid-cols-2 gap-8">
                        {/*Payment info */}
                        <div>
                            <h4 className="text-lg font-semibold mb-2">Payment</h4>
                            <p className="text-gray-600">PayPal</p>
                        </div>
                        {/*Delivery info */}
                        <div>
                            <h4 className="text-lg font-semibold mb-2">Delivery</h4>
                            <p className="text-gray-600">{checkout.shippingAddress.address}</p>
                            <p className="text-gray-600">{checkout.shippingAddress.city}, {checkout.shippingAddress.country}</p>
                        </div>
                    </div>

                </div>
            )}
        </div>
    )
}

export default OrderConfirmationPage