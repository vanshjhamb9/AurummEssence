import { createSlice } from "@reduxjs/toolkit"

const initialState = {
  productData: [],
  productEntireData: [],
}

const viewProductSlice = createSlice({
  name: "viewProduct",
  initialState,
  reducers: {
    setProductData: (state, action) => {
      state.productData = action.payload
    },
    setEntireProductData: (state, action) => {
      state.productEntireData = action.payload
    },
  },
})

export const {
  setProductData,
  setEntireProductData,
} = viewProductSlice.actions

export default viewProductSlice.reducer