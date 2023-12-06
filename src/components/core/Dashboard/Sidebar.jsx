import { useState } from "react"
import { VscSignOut } from "react-icons/vsc"
import {RiCloseCircleFill} from "react-icons/ri"
import { useDispatch, useSelector } from "react-redux"
import { useNavigate } from "react-router-dom"
import {TbArrowBigRightLinesFilled} from "react-icons/tb"

import { sidebarLinks } from "../../../data/dashboard-links"
import { logout } from "../../../services/operations/authAPI"
import ConfirmationModal from "../../common/ConfirmationModal"
import SidebarLink from "./SidebarLink"
import useOnClickOutside from "../../../hooks/useOnClickOutside"
import { useRef } from "react"


export default function Sidebar() {
  const { user, loading: profileLoading } = useSelector(
    (state) => state.profile
  )
  const { loading: authLoading } = useSelector((state) => state.auth)
  const dispatch = useDispatch()
  const navigate = useNavigate()
  // to keep track of confirmation modal
  const [confirmationModal, setConfirmationModal] = useState(null)
  const [openModal , setOpenModal] = useState(false)
  const [loading,setLoading]  = useState(false)
  const ref = useRef(null)

  const closeModal =() =>{
    setOpenModal(false)
  }


  useOnClickOutside(ref, closeModal)

  if (profileLoading || authLoading) {
    return (
      <div className="grid h-[calc(100vh-3.5rem)] min-w-[220px] items-center border-r-[1px] border-r-richblack-700 bg-richblack-800">
        <div className="spinner"></div>
      </div>
    )
  }
  return (
    <>
      <div className="flex h-[calc(100vh-3.5rem)] lg:min-w-[220px] flex-col border-r-[1px]  md:block sm:hidden xs:hidden border-r-richblack-700 bg-richblack-800 py-10">
        <div className="flex flex-col ">
          {sidebarLinks.map((link) => {
            if (link.type && user?.accountType !== link.type) return null
            return (
              <SidebarLink key={link.id} link={link} iconName={link.icon} />
            )
          })}
        </div>
        <div className="mx-auto mt-6 mb-6 h-[1px] w-10/12 bg-richblack-700" />
        <div className="flex flex-col">
          <SidebarLink
            link={{ name: "Settings", path: "/dashboard/settings" }}
            iconName="VscSettingsGear"
          />
          <button
            onClick={() =>
              setConfirmationModal({
                text1: "Are you sure?",
                text2: "You will be logged out of your account.",
                btn1Text: "Logout",
                btn2Text: "Cancel",
                btn1Handler: () => dispatch(logout(navigate)),
                btn2Handler: () => setConfirmationModal(null),
              })
            }
            className="px-8 py-2 text-sm font-medium text-richblack-300"
          >
            <div className="flex items-center gap-x-2">
              <VscSignOut className="text-lg" />
              <span>Logout</span>
            </div>
          </button>
        </div>
      </div>
     
     <TbArrowBigRightLinesFilled onClick={() => setOpenModal(true)}
      className={`${openModal ? ("rotate-180 "): ("rotate-0")} relative mt-[50%] animate-bounce duration-200 cursor-pointer ease-linear md:hidden sm:block xs:block text-richblack-100 text-3xl transition-all`} />    
{
        openModal && (
          <div 
          onClick={(e) => e.stopPropagation()}
          className={`dropdown-menu absolute left-0 z-[1000] md:hidden sm:block xs:block bg-richblack-700 border-2 w-[250px] border-richblack-300 p-4 rounded-3xl
             ${openModal == false && "xs:hidden sm:hidden"} `}>
             <RiCloseCircleFill className="text-3xl text-richblack-50 absolute right-3" onClick={() => setOpenModal(false)} />
                  {loading ? (
                    <p className="text-center">Loading...</p>
                  ):(
                    <div className="flex h-[calc(100vh-3.5rem)] min-w-[220px] flex-col border-r-[1px]  md:hidden sm:block border-r-richblack-700 bg-richblack-800 py-10">
                    
        <div className="flex flex-col " onClick={() => setOpenModal(false)}>
          {sidebarLinks.map((link) => {
            if (link.type && user?.accountType !== link.type) return null
            return (
              <SidebarLink key={link.id} link={link} iconName={link.icon} />
            )
          })}
        </div>
        <div className="mx-auto mt-6 mb-6 h-[1px] w-10/12 bg-richblack-700" />
        <div className="flex flex-col" onClick={() => setOpenModal(false)}>
          <SidebarLink
          onClick={() => setOpenModal(false)}
            link={{ name: "Settings", path: "/dashboard/settings" }}
            iconName="VscSettingsGear"
          />
          <button
            onClick={() =>
              setConfirmationModal({
                text1: "Are you sure?",
                text2: "You will be logged out of your account.",
                btn1Text: "Logout",
                btn2Text: "Cancel",
                btn1Handler: () => dispatch(logout(navigate)),
                btn2Handler: () => setConfirmationModal(null),
              })
            }
            className="px-8 py-2 text-sm font-medium text-richblack-300"
          >
            <div className="flex items-center gap-x-2">
              <VscSignOut className="text-lg" />
              <span>Logout</span>
            </div>
          </button>
        </div>
      </div>
                  
        ) }
        </div>
        )
      }
      {confirmationModal && <ConfirmationModal modalData={confirmationModal} />}
    </>
  )
}