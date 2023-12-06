const BASE_URL = "http://localhost:4000/api/v1"

console.log("Base Url -: ", BASE_URL);

// AUTH ENDPOINTS
export const endpoints = {
  SENDOTP_API: "http://localhost:4000/api/v1" + "/auth/sendotp",
  SIGNUP_API: BASE_URL + "/auth/signup",
  LOGIN_API: BASE_URL + "/auth/login",
  RESETPASSTOKEN_API: BASE_URL + "/auth/reset-password-token",
  RESETPASSWORD_API: BASE_URL + "/auth/reset-password",
}

// PROFILE ENDPOINTS
export const profileEndpoints = {
  GET_USER_DETAILS_API: BASE_URL + "/profile/getUserDetails",
  GET_USER_PURCHASED_PRODUCTS_API: BASE_URL + "/profile/getPurchaseProducts",
  GET_ADMIN_DATA_API: BASE_URL + "/profile/adminDashboard",
}

// CONSUMERS ENDPOINTS
export const consumerEndpoints = {
  PRODUCT_PAYMENT_API: "http://localhost:4000/api/v1" + "/payment/capturePayment",
  PRODUCT_VERIFY_API: "http://localhost:4000/api/v1" + "/payment/verifyPayment",
  SEND_PAYMENT_SUCCESS_EMAIL_API: "http://localhost:4000/api/v1" + "/payment/sendPaymentSuccessEmail",
}

// PRODUCT ENDPOINTS
export const ProductEndpoints = {
  GET_ALL_PRODUCT_API: "http://localhost:4000/api/v1" + "/product/getAllProducts",
  PRODUCT_DETAILS_API: "http://localhost:4000/api/v1" + "/product/getProductDetails",
  EDIT_PRODUCT_API: BASE_URL + "/product/editProduct",
  PRODUCT_CATEGORIES_API: "http://localhost:4000/api/v1" + "/product/categoryPageDetails",
  PRODUCT_SUBCATEGORIES_API: BASE_URL + "/product/showAllSubCategories",
  CREATE_PRODUCT_API: BASE_URL + "/product/createProduct",
  GET_ALL_ADMIN_PRODUCTS_API: BASE_URL + "/product/getAdminProducts",
  DELETE_PRODUCT_API: BASE_URL + "/product/deleteProduct",
  GET_FULL_PRODUCT_DETAILS_AUTHENTICATED:
    BASE_URL + "/product/getFullProductDetails",
  CREATE_RATING_API: BASE_URL + "/product/createRating",
}

// RATINGS AND REVIEWS
export const ratingsEndpoints = {
  REVIEWS_DETAILS_API: BASE_URL + "/product/getReviews",
}

// CATAGORIES API
export const categories = {
  CATEGORIES_API: "http://localhost:4000/api/v1" + "/product/showAllCategories",
}

//SUBCATEGORIES API
export const subCategories = {
    SUBCATEGORIES_API : "http://localhost:4000/api/v1/product" + "/showAllSubCategories"
}

// CATALOG PAGE DATA
export const catalogData = {
  CATALOGPAGEDATA_API: "http://localhost:4000/api/v1/product" + "/getSubCategoryPageDetails",
}
// CONTACT-US API
export const contactusEndpoint = {
  CONTACT_US_API: BASE_URL + "/reach/contact",
}

// SETTINGS PAGE API
export const settingsEndpoints = {
  UPDATE_DISPLAY_PICTURE_API: BASE_URL + "/profile/updateDisplayPicture",
  UPDATE_PROFILE_API: BASE_URL + "/profile/updateProfile",
  CHANGE_PASSWORD_API: BASE_URL + "/auth/changepassword",
  DELETE_PROFILE_API: BASE_URL + "/profile/deleteProfile",
}