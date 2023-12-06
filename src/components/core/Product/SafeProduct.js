import React from "react"
import figure1 from "../../../assets/Images/Icons/Cruelty_Free.webp"
import figure2 from "../../../assets/Images/Icons/Dermatologically_Tested.webp"
import figure3 from "../../../assets/Images/Icons/Paraben_Free.webp"
import figure4 from "../../../assets/Images/Icons/Vegan_8b3000b9-8ca7-47d9-8506-f1512d08d455.webp"
import figure5 from "../../../assets/Images/Icons/Sulphate_Free.webp"
import figure6 from "../../../assets/Images/Icons/Pthalates_Free.png"


function SafeProduct() {
  
  return (
    <>
      <div className={`grid grid-cols-3 justify-evenly w-[1091px] items-center mx-auto gap-4 rounded-md bg-peach-500  p-4 text-richblack-5`} >
        <div className="flex flex-col items-center text-bistre space-y-3 mt-4  ">
            <img className="text-bistre bg-bistre" src={figure1} />
            <p className="text-xl font-edu-sa font-semibold">Cruelty Free</p>
        </div>

        <div className="flex flex-col items-center text-bistre space-y-3 mt-4 ">
            <img className="text-bistre bg-bistre" src={figure2} />
            <p className="text-xl font-edu-sa font-semibold">Dermatologically Tested</p>
        </div>

        <div className="flex flex-col items-center text-bistre space-y-3 mt-4  ">
            <img className="text-bistre bg-bistre" src={figure3} />
            <p className="text-xl font-edu-sa font-semibold">Paraben Free</p>
        </div>

        <div className="flex flex-col items-center text-bistre space-y-3 mt-4 ">
            <img className="text-bistre bg-bistre" src={figure4} />
            <p className="text-xl font-edu-sa font-semibold">Vegan</p>
        </div>

        <div className="flex flex-col items-center text-bistre space-y-3 mt-4 ">
            <img className="text-bistre bg-bistre" src={figure5} />
            <p className="text-xl font-edu-sa font-semibold">Sulphate Free</p>
        </div>

        <div className="flex flex-col items-center text-bistre space-y-3 mt-4  ">
            <img className="text-bistre bg-bistre" src={figure6} />
            <p className="text-xl font-edu-sa font-semibold">Pthalates Free</p>
        </div>

        

      </div>
    </>
  )
}

export default SafeProduct