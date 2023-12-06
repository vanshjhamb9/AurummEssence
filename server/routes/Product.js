// Import the required modules
const express = require("express")
const router = express.Router()

// Import the Controllers

// Product Controllers Import
const {
  createProduct,
  getAllProducts,
  getProductDetails,
  editProduct,
  deleteProduct,
} = require("../controller/Product")


// Categories Controllers Import
const {
  showAllCategories,
  createCategory,
  categoryPageDetails,
} = require("../controller/Category")

// Categories Controllers Import
const {
    showAllSubCategories,
    createSubCategory,
    editSubCategory,
    subCategoryPageDetails,
  } = require("../controller/subCategory")

// // Sections Controllers Import
// const {
//   createSection,
//   updateSection,
//   deleteSection,    
// } = require("../controllers/Section")

// // Sub-Sections Controllers Import
// const {
//   createSubSection,
//   updateSubSection,
//   deleteSubSection,
// } = require("../controllers/Subsection")

// Rating Controllers Import
const {
  createRating,
  getAverageRating,
  getAllRating,
} = require("../controller/RatingAndReview")

// Importing Middlewares
const { auth, isConsumer, isAdmin } = require("../middleware/auth")

// ********************************************************************************************************
//                                      Product routes
// ********************************************************************************************************

// Products can Only be Created by Admins
router.post("/createProduct", auth, isAdmin, createProduct)
//Add a Section to a Product
// router.post("/addSection", auth, isAdmin, createSection)
// Update a Section
// router.post("/updateSection", auth, isAdmin, updateSection)
// Delete a Section
// router.post("/deleteSection", auth, isAdmin, deleteSection)
// // Edit Sub Section
// router.post("/updateSubSection", auth, isAdmin, updateSubSection)
// // Delete Sub Section
// router.post("/deleteSubSection", auth, isAdmin, deleteSubSection)
// // Add a Sub Section to a Section
// router.post("/addSubSection", auth, isAdmin, createSubSection)
// // Get all Registered Products
router.get("/getAllProducts", getAllProducts)
// Get Details for a Specific Products
router.post("/getProductDetails", getProductDetails)
// Get Details for a Specific Products
// Edit Product routes
router.post("/editProduct", auth, isAdmin, editProduct)
// Get all Products Under a Specific Admin
// Delete a Product
router.delete("/deleteProduct", deleteProduct)

// ********************************************************************************************************
//                                      Category routes (Only by Admin)
// ********************************************************************************************************
// Category can Only be Created by Admin
// TODO: Put IsAdmin Middleware here
router.post("/createCategory", auth, isAdmin, createCategory)
router.get("/showAllCategories", showAllCategories)
router.post("/getcategoryPageDetails", categoryPageDetails)

router.post("/createSubCategory", auth, isAdmin, createSubCategory)
router.get("/showAllSubCategories", showAllSubCategories)
router.put("/editSubCategory",auth , isAdmin,editSubCategory)
router.post("/getsubCategoryPageDetails",subCategoryPageDetails)

// ********************************************************************************************************
//                                      Rating and Review
// ********************************************************************************************************
router.post("/createRating", auth, isConsumer, createRating)
router.get("/getAverageRating", getAverageRating)
router.get("/getReviews", getAllRating)

module.exports = router