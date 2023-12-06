import signupImg from "../assets/Images/signUp.png"
import Template from "../components/core/Auth/Template"

function Signup() {
  return (
    <Template
      title="Where Beauty Meets Gold: Discover Aurum Essence."
      description1="With Aurum Essence, your skincare routine becomes a daily ritual of self-care ."
      description2="Nurture your skin, embrace your beauty, and discover the essence of elegance with us."
      image={signupImg}
      formType="signup"
    />
  )
}

export default Signup