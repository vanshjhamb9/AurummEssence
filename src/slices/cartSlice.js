import { createSlice } from "@reduxjs/toolkit"
import { toast } from "react-hot-toast"
import ApplyCoupon from "../components/core/Dashboard/Cart/ApplyCoupon";

const initialState = {
  cart: localStorage.getItem("cart")
    ? JSON.parse(localStorage.getItem("cart"))
    : [],
  total: localStorage.getItem("total")
    ? JSON.parse(localStorage.getItem("total"))
    : 0,
  totalItems: localStorage.getItem("totalItems")
    ? JSON.parse(localStorage.getItem("totalItems"))
    : 0,
}

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart: (state, action) => {
      const { product, quantity } = action.payload;
      const existingProduct = state.cart.find((item) => item._id === product._id);

      if (existingProduct) {
        existingProduct.quantity += quantity || 1;
      } else {
        state.cart.push({ ...product, quantity: quantity || 1 });
      }

      state.totalItems += quantity || 1;
      state.total += product.price * (quantity || 1);
    },
    removeFromCart: (state, action) => {
      const { productId, quantity } = action.payload;
      const index = state.cart.findIndex((item) => item._id === productId);

      if (index >= 0) {
        if (state.cart[index].quantity > (quantity || 1)) {
          state.cart[index].quantity -= quantity || 1;
        } else {
          state.cart.splice(index, 1);
        }

        state.totalItems -= quantity || 1;
        state.total -= state.cart[index].price * (quantity || 1);
      }
    },
    resetCart: (state) => {
      state.cart = [];
      state.total = 0;
      state.totalItems = 0;
      localStorage.removeItem("cart");
      localStorage.removeItem("total");
      localStorage.removeItem("totalItems");
    },

    updateQuantity: (state, action) => {
      const { productId, quantity } = action.payload;
      const index = state.cart.findIndex((item) => item._id === productId);

      if (index >= 0) {
        const updatedCart = [...state.cart];
        updatedCart[index].quantity = quantity;

        return {
          ...state,
          cart: updatedCart,
        };
      }

      return state;
    },
    applyCoupon: (state, action) => {
      const { couponCode } = action.payload;
      console.log("Coupon code is ", couponCode);
    
      // Check if the coupon has already been applied
      if (state.couponApplied) {
        toast.error("Coupon has already been applied");
        return;
      }
    
      // Assuming you have a function to validate and apply the coupon
      const couponDetails = () => {
        if (couponCode === 'DISCOUNT20') {
          const discountPercentage = 20;
          const discountAmount = (state.total * discountPercentage) / 100;
          const discountedTotal = state.total - discountAmount;
    
          return {
            valid: true,
            discountPercentage,
            discountAmount,
            discountedTotal,
          };
        }
    
        // Invalid coupon
        return {
          valid: false,
        };
      };
    
      const details = couponDetails();
    
      if (details.valid) {
        state.coupon = details;
        state.total = details.discountedTotal; // Update the total with the discounted value
        state.couponApplied = true; // Set the flag to indicate that the coupon has been applied
      } else {
        toast.error("Invalid Coupon");
      }
    },
    
  },
})

export const { addToCart, removeFromCart, resetCart, updateQuantity , applyCoupon } = cartSlice.actions

export default cartSlice.reducer