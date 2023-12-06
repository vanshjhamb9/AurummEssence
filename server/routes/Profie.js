const express = require("express")
const router = express.Router()
const { auth,isConsumer, isAdmin } = require("../middleware/auth")
const {
  deleteAccount,
  updateProfile,
  getAllUserDetails,
  updateDisplayPicture,
  getPurchasedProducts,
  adminDashboard,
} = require("../controller/Profie")


// ********************************************************************************************************
//                                      Profile routes
// ********************************************************************************************************
// Delet User Account
router.delete("/deleteProfile", auth, deleteAccount)
router.put("/updateProfile", auth, updateProfile)
router.get("/getUserDetails", auth, getAllUserDetails)

// Get Enrolled Products
router.get("/getPurchasedProducts", auth,isConsumer, getPurchasedProducts)
router.put("/updateDisplayPicture", auth, updateDisplayPicture)
router.get("/instructorDashboard", auth, isAdmin, adminDashboard)

module.exports = router