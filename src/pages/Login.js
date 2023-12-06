import loginImg from "../assets/Images/lizzie_sall-naturalproducts-03630.jpg"
import Template from "../components/core/Auth/Template"

function Login() {
  return (
    <div>
    <Template
      title="Welcome Back"
      description1="Transform your skincare today, tomorrow, and beyond. "
      description2="Elevation for your skin's future beauty. Beauty care to future-proof your radiance."
      image={loginImg}
      formType="login"
    />
    </div>
  )
}

export default Login