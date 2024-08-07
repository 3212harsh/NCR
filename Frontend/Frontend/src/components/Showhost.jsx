import React from 'react';
import { FaGlobe, FaCodeBranch, FaMicrochip } from 'react-icons/fa';
import { MdLocationOn } from 'react-icons/md';
import { useNavigate } from 'react-router-dom';

const Showhost = ({ ip, ports, asn, os, location }) => {

  const navigate = useNavigate();

  const handlenavigate = ()=>{
    navigate(`/show/${ip}`);
  }

  return (
    <div className='w-[90%] p-4 bg-white border border-gray-300 rounded-lg shadow-md transition-transform transform hover:scale-105 cursor-pointer' onClick={handlenavigate}>
      <div className='flex flex-col sm:flex-row sm:justify-between mb-3'>
        <div className='mb-2 sm:mb-0'>
          <h1 className='text-2xl font-bold text-blue-800'>{ip}</h1>
        </div>
        <div className='flex flex-wrap items-center'>
          {ports.map((port, index) => (
            <span key={index} className='text-xs font-semibold text-white bg-blue-600 rounded-full px-3 py-1 m-1 shadow hover:bg-blue-700 transition duration-200'>
              {port}
            </span>
          ))}
        </div>
      </div>
      <div className='mt-2 flex flex-col sm:flex-row sm:justify-between'>
        <div className='flex flex-col sm:flex-row sm:items-center bg-gray-50 rounded-lg p-2 mb-2 sm:mb-0'>
          <p className='flex items-center sm:mr-6 text-sm font-medium'>
            <FaCodeBranch className='mr-1' />
            <strong>ASN:</strong> {asn}
          </p>
          <p className='flex items-center text-sm font-medium'>
            <FaMicrochip className='mr-1' />
            <strong>OS:</strong> {os ? os : <span className='text-red-500'>N/A</span>}
          </p>
        </div>
        <div className='text-gray-800 text-sm flex items-center'>
          <MdLocationOn className='mr-1' />
          <strong>Location:</strong> {location}
        </div>
      </div>
    </div>
  );
}

export default Showhost;
