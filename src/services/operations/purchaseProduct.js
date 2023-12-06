import { toast } from "react-hot-toast";
import { consumerEndpoints } from "../apis";
import { apiConnector } from "../apiConnector";
import rzpLogo from "../../assets/Logo/rzp_logo.png"
import { setPaymentLoading } from "../../slices/productSlice";
import { resetCart } from "../../slices/cartSlice";


const {PRODUCT_PAYMENT_API, PRODUCT_VERIFY_API, SEND_PAYMENT_SUCCESS_EMAIL_API} = consumerEndpoints;

function loadScript(src) {
    return new Promise((resolve) => {
        const script = document.createElement("script");
        script.src = src;

        script.onload = () => {
            resolve(true);
        }
        script.onerror= () =>{
            resolve(false);
        }
        document.body.appendChild(script);
    })
}


export async function buyProduct(
    token,
    products,
    user_details,
    navigate,
    dispatch
  ) {
    const toastId = toast.loading("Loading...")
    try {
      // Loading the script of Razorpay SDK
      const res = await loadScript("https://checkout.razorpay.com/v1/checkout.js")
  
      if (!res) {
        toast.error(
          "Razorpay SDK failed to load. Check your Internet Connection."
        )
        return
      }

       // Initiating the Order in Backend
    const orderResponse = await apiConnector(
        "POST",
        PRODUCT_PAYMENT_API,
        {
          products,
        },
        {
          Authorization: `Bearer ${token}`,
        }
      )
  
      if (!orderResponse.data.success) {
        throw new Error(orderResponse.data.message)
      }
      console.log("PAYMENT RESPONSE FROM BACKEND............", orderResponse.data)
  
      // Opening the Razorpay SDK
      const options = {
        key: process.env.RAZORPAY_KEY,
        currency: orderResponse.data.data.currency,
        amount: `${orderResponse.data.data.amount}`,
        order_id: orderResponse.data.data.id,
        name: "Aurumm Essence Naturals",
        description: "Thank you for Purchasing the Product.",
        image: rzpLogo,
        prefill: {
          name: `${user_details.firstName} ${user_details.lastName}`,
          email: user_details.email,
        },
        handler: function (response) {
          sendPaymentSuccessEmail(response, orderResponse.data.data.amount, token)
          verifyPayment({ ...response, products }, token, navigate, dispatch)
        },
      }
      const paymentObject = new window.Razorpay(options)
  
      paymentObject.open()
      paymentObject.on("payment.failed", function (response) {
        toast.error("Oops! Payment Failed.")
        console.log("Error for payment failed is ", response.error)
        console.error(response);
      })
    } catch (error) {
      console.log("PAYMENT API ERROR............", error)
      toast.error("Could Not make Payment.")
    }
    toast.dismiss(toastId)
  }

async function sendPaymentSuccessEmail(response, amount, token) {
    try{
        await apiConnector("POST", SEND_PAYMENT_SUCCESS_EMAIL_API, {
            orderId: response.razorpay_order_id,
            paymentId: response.razorpay_payment_id,
            amount,
        },{
            Authorization: `Bearer ${token}`
        })
    }
    catch(error) {
        console.log("PAYMENT SUCCESS EMAIL ERROR....", error);
    }
}

//verify payment
async function verifyPayment(bodyData, token, navigate, dispatch) {
    const toastId = toast.loading("Verifying Payment....");
    dispatch(setPaymentLoading(true));
    try{
        const response  = await apiConnector("POST", PRODUCT_VERIFY_API, bodyData, {
            Authorization:`Bearer ${token}`,
        })

        if(!response.data.success) {
            throw new Error(response.data.message);
        }
        toast.success("payment Successful, ypou are addded to the course");
        navigate("/dashboard/enrolled-courses");
        dispatch(resetCart());
    }   
    catch(error) {
        console.log("PAYMENT VERIFY ERROR....", error);
        toast.error("Could not verify Payment");
    }
    toast.dismiss(toastId);
    dispatch(setPaymentLoading(false));
}

