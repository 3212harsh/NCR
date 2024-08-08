import React from 'react'
import { FaArrowLeft } from 'react-icons/fa';

const BackBtn = ({path}) => {
  return (
    <button onClick={() => navigate(-1)} className='flex items-center text-blue-600'>
        <FaArrowLeft className='mr-2' />
        Back
    </button>
  )
}

export default BackBtn
