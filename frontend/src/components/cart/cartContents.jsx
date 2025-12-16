import { RiDeleteBin3Line } from "react-icons/ri";
import { useDispatch } from "react-redux";
import {
  deleteItemFromCart,
  updateCartItmQty,
} from "../../redux/slices/cartSlice";
function CartContents({ cart, userId, guestId }) {
  const dispatch = useDispatch();

  const updateQunatity = (delta, quantity, size, color, productId) => {
    const newQuantity = delta + quantity;
    if(newQuantity>=1){
        dispatch(
        updateCartItmQty({
        guestId,
        quantity: newQuantity,
        user: userId,
        productId,
        size,
        color,
      })
    );
    }

  };

  const deleteItem = (productId, color, size) => {
    dispatch(deleteItemFromCart({ productId, guestId, user: userId, color, size }));
  };

  return (
    <>
      <div>
        {cart.products.map((item, index) => (
          <div
            key={index}
            className="flex items-start justify-between py-4 border-b"
          >
            <div className="flex items-start">
              <img
                src={item.image}
                alt={item.name}
                className="w-20 h-24 object-cover mr-4 rounded"
              />
              <div>
                <h3>{item.name}</h3>
                <p className="text-sm text-gray-500">
                  size : {item.size} | color : {item.color}
                </p>
                <div className="flex items-center mt-2">
                  <button
                    onClick={() => {updateQunatity(
                      -1,
                      item.quantity,
                      item.size,
                      item.color,
                      item.productId
                    )}}
                    className="border border-gray-400 rounded px-2 py-1 text-xl font-medium"
                  >
                    -
                  </button>
                  <span className="mx-4">{item.quantity}</span>
                  <button 
                  onClick={() => {updateQunatity(
                      +1,
                      item.quantity,
                      item.size,
                      item.color,
                      item.productId
                    )}}
                  className="border border-gray-400 rounded px-2 py-1 text-xl font-medium">
                    +
                  </button>
                </div>
              </div>
            </div>
            <div>
              <p className="font-medium">$ {item.price.toLocaleString()}</p>
              <button 
              onClick={() => {deleteItem(item.productId, item.color, item.size)}}
              >
                <RiDeleteBin3Line className="h-6 w-6 text-red-600" />
              </button>
            </div>
          </div>
        ))}
      </div>
    </>
  );
}

export default CartContents;
