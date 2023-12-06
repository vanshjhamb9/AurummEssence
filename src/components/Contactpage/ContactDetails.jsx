import React from 'react'
import { HiChatBubbleLeftRight } from "react-icons/hi2";
import {FaGlobeAmericas} from "react-icons/fa";
import {IoIosCall} from "react-icons/io"

const ContactDetais = () => {
  return (
    <div className='w-[450px] h-[410px] gap-[24px] bg-bistre flex flex-col p-[24px] rounded-[12px] '>
      <div className='text-peach-900  flex  gap-4 ml-5 text-[18px] p-3 '>
       <HiChatBubbleLeftRight 
        className='text-3xl '
       />
       <div className='flex flex-col font-edu-sa text-[18px]'>
        <h1>Chat on us</h1>
        <p>Our fiendly team is here to help you</p>
        <p>vanshjhamb9@gmail.com</p>
       </div>
      </div>
      <div className='text-peach-900 flex  gap-4 ml-5 text-[18px] p-3 '>
       <FaGlobeAmericas 
        className='text-3xl '
       />
       <div className='flex flex-col font-edu-sa text-[18px]'>
        <h1>Visit us</h1>
        <p>Come and say hello at our office HQ.</p>
        <p>Here is the location/ address</p>
       </div>
      </div>
      <div className='text-peach-900 flex  gap-4 ml-5 text-[18px] p-3 '>
       <IoIosCall
        className='text-3xl '
       />
       <div className='flex flex-col font-edu-sa text-[18px]'>
        <h1>Call us</h1>
        <p>Mon - Fri From 8am to 5pm</p>
        <p>+123 456 7890</p>
       </div>
      </div>
    </div>
  )
}

export default ContactDetais
