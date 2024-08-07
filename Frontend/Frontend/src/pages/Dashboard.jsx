import React from 'react'
import Search from '../components/Search'
import Assets_services from '../components/Dashboard/Assets_services'
import { Outlet } from 'react-router-dom'

const Dashboard = () => {
  return (
    <div>
        <div className='bg-[#5f249f] flex w-full h-10 text-white items-center h-32  justify-between px-10'>
            <h1 className=' font-semibold text-5xl'>Assets Summary</h1>
            <span className='bg-white text-black px-4 py-2 text-xl rounded-lg font-semibold '>Assets Discovered = 5</span>
        </div>
        <div className='w-full mt-10'>
            <Search/>
        </div>
        <div className='flex justify-center mt-10'>
            <Outlet/>
        </div>
    </div>
  )
}

export default Dashboard
