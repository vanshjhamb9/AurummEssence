const { instance } = require("../config/razorpay")
const Product = require("../models/Product")
const crypto = require("crypto")
const User = require("../models/User")
const mailSender = require("../utils/mailSender")
const mongoose = require("mongoose")
const {
  productEnrollmentEmail,
} = require("../mail/templates/productPurchase")
const { paymentSuccessEmail } = require("../mail/templates/paymentSuccess")
// const { default: products } = require("razorpay/dist/types/products")

// Capture the payment and initiate the Razorpay order
exports.capturePayment = async (req, res) => {
  const { products } = req.body;
  const userId = req.user.id;

  if (products.length === 0) {
    return res.json({ success: false, message: "Please Provide Product ID" });
  }

  let totalAmount = 0;

  for (const { productId, quantity } of products) {
    try {
      const product = await Product.findById(productId);

      if (!product) {
        return res.status(200).json({ success: false, message: "Could not find the Product" });
      }

      const uid = new mongoose.Types.ObjectId(userId);

      if (product.sold.includes(uid)) {
        return res.status(200).json({ success: true, message: "Thanks for purchasing our product again" });
      }

      totalAmount += product.price * quantity;
    } catch (error) {
      console.log(error);
      return res.status(500).json({ success: false, message: error.message });
    }
  }

  const options = {
    amount: totalAmount * 100,
    currency: "INR",
    receipt: Math.random(Date.now()).toString(),
  };

  try {
    console.log("Options for Razorpay order:", options);
    const paymentResponse = await instance.orders.create(options);

    console.log("Payment response -:", paymentResponse);

    res.json({
      success: true,
      data: paymentResponse,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, message: "Could not initiate order." });
  }
};

// verify the payment
exports.verifyPayment = async (req, res) => {
  const razorpay_order_id = req.body?.razorpay_order_id
  const razorpay_payment_id = req.body?.razorpay_payment_id
  const razorpay_signature = req.body?.razorpay_signature
  const products = req.body?.products

  const userId = req.user.id

  if (
    !razorpay_order_id ||
    !razorpay_payment_id ||
    !razorpay_signature ||
    !products ||
    !userId
  ) {
    return res.status(200).json({ success: false, message: "Payment Failed" })
  }

  let body = razorpay_order_id + "|" + razorpay_payment_id

  const expectedSignature = crypto
    .createHmac("sha256", process.env.RAZORPAY_SECRET)
    .update(body.toString())
    .digest("hex")

  if (expectedSignature === razorpay_signature) {
    await enrollStudents(products, userId, res)
    return res.status(200).json({ success: true, message: "Payment Verified" })
  }

  return res.status(200).json({ success: false, message: "Payment Failed" })
}

// Send Payment Success Email
exports.sendPaymentSuccessEmail = async (req, res) => {
  const { orderId, paymentId, amount } = req.body

  const userId = req.user.id

  if (!orderId || !paymentId || !amount || !userId) {
    return res
      .status(400)
      .json({ success: false, message: "Please provide all the details" })
  }

  try {
    const enrolledConsumer = await User.findById(userId)

    await mailSender(
      enrolledConsumer.email,
      `Payment Received`,
      paymentSuccessEmail(
        `${enrolledConsumer.firstName} ${enrolledConsumer.lastName}`,
        amount / 100,
        orderId,
        paymentId
      )
    )
  } catch (error) {
    console.log("error in sending mail", error)
    return res
      .status(400)
      .json({ success: false, message: "Could not send email" })
  }
}

// enroll the student in the courses
const enrolledConsumers = async (products, userId, res) => {
  if (!products || !userId) {
    return res
      .status(400)
      .json({ success: false, message: "Please Provide Product ID and User ID" })
  }

  for (const productId of products) {
    try {
      // Find the course and enroll the student in it
      const enrolledProduct = await Product.findOneAndUpdate(
        { _id: productId },
        { $push: { sold: userId } },
        { new: true }
      )

      if (!enrolledProduct) {
        return res
          .status(500)
          .json({ success: false, error: "Product not found" })
      }
      console.log("Updated product: ", enrolledProduct)

      console.log("Enrolled consumer: ", enrolledConsumers)
      // Send an email notification to the enrolled student
      const emailResponse = await mailSender(
        enrolledConsumers.email,
        `Successfully Enrolled into ${enrolledProduct.productName}`,
       productEnrollmentEmail(
          enrolledProduct.productName,
          `${enrolledConsumers.firstName} ${enrolledConsumers.lastName}`
        )
      )

      console.log("Email sent successfully: ", emailResponse.response)
    } catch (error) {
      console.log(error)
      return res.status(400).json({ success: false, error: error.message })
    }
  }
}