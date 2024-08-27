import React from 'react';
import { useNavigate } from 'react-router-dom';
import { FaArrowLeft } from 'react-icons/fa';

const BackButton = () => {
    const navigate = useNavigate();

    const handleGoBack = () => {
        navigate(-1); // Navigates to the previous route
    };

    return (
      <button onClick={handleGoBack} className='flex items-center px-4 py-2 text-white bg-blue-600 hover:bg-blue-700 rounded-md shadow-md transition duration-300'>
      <FaArrowLeft className='mr-2' />
      Back
    </button>
    );
};

export default BackButton;
