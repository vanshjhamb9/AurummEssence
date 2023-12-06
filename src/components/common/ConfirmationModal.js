import IconBtn from "./IconButton"

export default function ConfirmationModal({ modalData }) {
  return (
    <div className="fixed inset-0 z-[1000] !mt-0 grid place-items-center overflow-auto bg-white bg-opacity-10 backdrop-blur-sm">
      <div className="w-11/12 max-w-[440px] px-20 rounded-lg border place-items-center text-center border-peach-500  bg-bistre p-6">
        <p className="text-2xl font-semibold text-peach-400 ">
          {modalData?.text1}
        </p>
        <p className="mt-3 mb-5 mx-auto leading-6 text-caribbeangreen-200  ">
          {modalData?.text2}
        </p>
        <div className="flex items-center px-10 gap-x-4">
          <IconBtn
            onclick={modalData?.btn1Handler}
            text={modalData?.btn1Text}
          />
          <button
            className="cursor-pointer rounded-md bg-peach-400  py-[8px] px-[20px] font-semibold text-richblack-900"
            onClick={modalData?.btn2Handler}
          >
            {modalData?.btn2Text}
          </button>
        </div>
      </div>
    </div>
  )
}