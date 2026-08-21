import { createSlice } from "@reduxjs/toolkit";

const cartSlice = createSlice({
  name: "cart",
  initialState: {
    items: [],
  },
  reducers: {
    setCart: (state, action) => {
      state.items = action.payload.items;
      state.totalPrice = action.payload.totalPrice;
      state.currency = action.payload.currency;
    },
    addItem: (state, action) => {
      state.items.push(action.payload);
    },

    removeItem: (state, action) => {
      const { productId, variantId } = action.payload;

      state.items = state.items.filter(
        (item) =>
          !(
            item.product._id === productId &&
            item.variant === variantId
          )
      );
    },

    incrementItemQuantity: (state, action) => {
      const { productId, variantId } = action.payload;

      state.items = state.items.map((item) => {
        if (item.product._id === productId && item.variant === variantId) {
          return { ...item, quantity: item.quantity + 1 };
        } else {
          return item;
        }
      });
    },

    decrementItemQuantity: (state, action) => {
      const {productId, variantId} = action.payload

      state.items = state.items.map((item) => {
        if(item.product._id === productId && item.variant === variantId) {
          return {...item, quantity: item.quantity - 1}
        } else {
          return item;
        }
      })
    }
  },
});

export const { setCart, addItem, removeItem, incrementItemQuantity, decrementItemQuantity} = cartSlice.actions;

export default cartSlice.reducer;
