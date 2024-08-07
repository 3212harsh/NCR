import React from 'react'
import { CgProfile} from "react-icons/cg"; 
import { RiNotification2Line } from "react-icons/ri";

const Header = () => {
  return (
    <div className=' flex w-full h-14 justify-between items-center px-10 py-2'>
        <div>
            <img src="https://cdn.prod.website-files.com/65b4fb7c09d756ed49b8c2c0/65b4fb7c09d756ed49b8c604_Logos.svg" alt="navbar_logo" />
        </div>
        <div className='flex w-[13vh] items-center justify-between'>
            <RiNotification2Line size={35}/>
            <CgProfile size={40}/>
        </div>
    </div>
  )
}

export default Header
