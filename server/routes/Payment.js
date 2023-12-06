// Import the required modules
const express = require("express")
const router = express.Router()

const { capturePayment, verifyPayment, sendPaymentSuccessEmail } = require("../controller/payment")
const { auth, isConsumer, isAdmin } = require("../middleware/auth")
router.post("/capturePayment", auth, isConsumer, capturePayment)
router.post("/verifyPayment",auth, isConsumer, verifyPayment)
router.post("/sendPaymentSuccessEmail", auth, isConsumer, sendPaymentSuccessEmail);

module.exports = router