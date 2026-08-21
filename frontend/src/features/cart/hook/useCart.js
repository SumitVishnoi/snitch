import {
  addToCart,
  decrementCartItemQuantityApi,
  deleteCartItem,
  getCart,
  incrementCartItemQuantityApi,
} from "../service/cart.api";
import { useDispatch } from "react-redux";
import {
  decrementItemQuantity,
  incrementItemQuantity,
  removeItem,
  setCart,
} from "../state/cart.slice";


const useCart = () => {
  const dispatch = useDispatch();
  const handleAddToCart = async ({ productId, variantId }) => {
    const data = await addToCart({ productId, variantId });
    dispatch(setCart(data));
    return data;
  };

  const handleGetCart = async () => {
    const data = await getCart();
    dispatch(setCart(data.cart));
  };

  const handleIncrementCartItemQuantity = async ({ productId, variantId }) => {
    await incrementCartItemQuantityApi({ productId, variantId });
    dispatch(incrementItemQuantity({ productId, variantId }));
  };

  const handleDecrementCartItemQuantity = async ({ productId, variantId }) => {
    await decrementCartItemQuantityApi({ productId, variantId });
    dispatch(decrementItemQuantity({ productId, variantId }));
  };

  const handleDeleteCartItem = async ({ productId, variantId }) => {
    try {
      await deleteCartItem({ productId, variantId });

      dispatch(removeItem({ productId, variantId }));
    } catch (error) {
      console.error("Failed to delete cart item:", error);
    }
  };



  return {
    handleAddToCart,
    handleGetCart,
    handleIncrementCartItemQuantity,
    handleDecrementCartItemQuantity,
    handleDeleteCartItem,
  };
};

export default useCart;
