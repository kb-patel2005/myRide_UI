import React, { useState } from 'react'
import { VscMenu } from "react-icons/vsc";
import { VscChromeClose } from "react-icons/vsc";
import { Link } from 'react-router-dom';

export default function Navbar() {

  const [isOpen, setIsOpen] = useState(false);

  return (
//     <div className="w-full fixed top-0 left-0 z-30 bg-purple-500 bg-opacity-90 backdrop-blur-sm shadow-md">
//   <div className="h-[7vh] w-full m-auto border rounded-2xl flex justify-between items-center py-6 bg-purple-500 text-white max-w-[1080px] box-border relative">
//     {/* your nav content */}
//   </div>
// </div>
    <div className='w-full fixed top-0 left-0 z-30 bg-purple-500 bg-opacity-90 backdrop-blur-sm shadow-md'>
      <div className='h-[7vh] w-full m-auto flex justify-between items-center py-6 bg-purple-500 text-white max-w-[1080px] box-border relative'>
        <div className="text-2xl px-5 flex items-center font-bold">
          <svg width="45" height="55" viewBox="0 0 539 568" fill="none" xmlns="http://www.w3.org/2000/svg">
            <ellipse cx="269.5" cy="284" rx="269.5" ry="284" fill="#ffffff" />
            <path d="M210 53.5063V505.006L297 53.5063H210Z" fill="#6562FF" />
            <path d="M210 505.006V53.5063L157 279.256L104 505.006H210Z" fill="#CA64EF" />
            <path d="M373.47 63.8257L430.5 63.8254L430.5 159.006L311.046 266.71L384.294 266.71L237.798 266.71L373.47 63.8257Z" fill="url(#paint0_linear_44_30)" />
            <path d="M427 451.506L427 508.579L334 508.579L246.508 319.079L246.507 266.595L311.353 266.597L427 451.506Z" fill="url(#paint1_linear_44_30)" />
            <defs>
              <linearGradient id="paint0_linear_44_30" x1="347" y1="106.006" x2="347" y2="143.506" gradientUnits="userSpaceOnUse">
                <stop stop-color="#D889F2" />
                <stop offset="1" stop-color="#6B5DFF" />
              </linearGradient>
              <linearGradient id="paint1_linear_44_30" x1="309" y1="327.006" x2="312" y2="458.006" gradientUnits="userSpaceOnUse">
                <stop stop-color="#6B5DFF" />
                <stop offset="1" stop-color="#F289E3" />
              </linearGradient>
            </defs>
          </svg>
          <div className='ml-1'> Ride</div>
        </div>
        <div className={`text-white px-5 ${isOpen ? "sm:hidden" : "sm:hidden"} cursor-pointer`}
          onClick={() => setIsOpen(!isOpen)}
        ><VscMenu /></div>
        <div className={`fixed flex flex-col h-[100vh] z-20 sm:h-auto sm:flex-row items-start sm:items-center sm:static absolute top-0 ${isOpen ? "right-0" : "right-[-50vw]"} w-[50vw] sm:h-auto sm:w-auto sm:bg-purple-500 sm:bg-transparent py-4 sm:py-0 pl-6 sm:pl-0`}
          style={{ background: 'linear-gradient(180deg, oklch(62.7% 0.265 303.9), transparent)' }}>
          <a href="#" className={`py-2.5 sm:pl-6 sm:hidden`}
            onClick={() => setIsOpen(!isOpen)}
          ><VscChromeClose /></a>
          <Link to='/' className='py-2.5 sm:px-2.5 font-normal'>Home</Link>
          <Link to='/about' className='py-2.5 sm:px-2.5 font-normal'>About</Link>
          <Link to='/login' className='py-2.5 sm:px-2.5 font-normal'>Login</Link>
          <Link to='/bookride' className='py-2.5 sm:px-2.5 font-normal'>Book Ride</Link>
          <Link to='/app/riderdashboard' className='py-2.5 sm:px-2.5 font-normal'>Rider Dashboard</Link>
          <Link to='/signup' className='py-2.5 sm:px-2.5 font-normal'>Register</Link>
        </div>
      </div>
    </div>
  )
}
