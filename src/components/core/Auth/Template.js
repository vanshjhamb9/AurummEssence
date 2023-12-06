import { useSelector } from "react-redux"

import LoginForm from "./loginForm"
import SignupForm from "./signUpForm"
import icon1 from "../../../assets/Images/Icons/skincare (1).png"
import icon2 from "../../../assets/Images/Icons/Icon2.png";
import icon3 from "../../../assets/Images/Icons/Icon3.png";
import icon4 from "../../../assets/Images/Icons/natural-product.png";


function Template({ title, description1, description2, image, formType }) {
  const { loading } = useSelector((state) => state.auth)

  return (
    <div className="grid min-h-[calc(100vh-3.5rem)] place-items-center">
      {loading ? (
        <div className="spinner"></div>
      ) : (
        <div className="mx-auto flex w-11/12 max-w-maxContent flex-col-reverse justify-between mt-8   gap-y-12 py-12 md:flex-row md:gap-y-0 md:gap-x-12">
          <div className="mx-auto mt-20  w-11/12 max-w-[650px] md:mx-0">
            <h1 className="text-[1.875rem] font-semibold leading-[2.375rem] text-bistre">
              {title}
            </h1>
            <p className="mt-4 text-[1.125rem] leading-[1.625rem]">
              <span className="text-bistre">{description1}</span>{" "}
              <span className="font-edu-sa font-bold italic text-caribbeangreen-600 ">
                {description2}
              </span>
            </p>
            {formType === "signup" ? <SignupForm /> : <LoginForm />}
          </div>
          <div className={`relative mx-auto bg-login md:mx-0 bg-blend-multiply w-screen max-h-[650px] overflow-hidden`}>
            <img
              src={image}
              alt="AuthImage"
              width={758}
              height={404}
              loading="lazy"
              className="scaleImage animate-scale opacity-90 relative -top-28 "
            />
          </div>
          <div>
            <img
            width="120px"
            src={icon1}
            className="scaleImage absolute  animate-waving-hand right-[15rem] top-[10rem]    "
             />
             <img
            width="120px"
            src={icon2}
            className="scaleImage absolute  animate-moving-hand right-[53rem] top-[10rem]    "
             />
             <img
            width="120px"
            src={icon3}
            className="right-[15rem] top-[47rem] scaleImage animate-rotating opacity-90 absolute  "
             />
             <img
            width="150px"
            src={icon4}
            className="right-[54rem] top-[45rem] scaleImage animate-last opacity-90 absolute  "
             />
          </div>

        </div>
      )}
    </div>
  )
}

export default Template