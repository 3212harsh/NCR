import React, { useState } from 'react';
import { FaBars, FaHome, FaInfoCircle, FaServicestack, FaEnvelope } from "react-icons/fa";
import { Link } from 'react-router-dom';

const Navbar = () => {
  const [expanded, setExpanded] = useState(true);

  const toggleExpand = () => {
    setExpanded(!expanded);
  };

  return (
    <div className={`bg-black text-white ${expanded ? 'w-[10%]' : 'w-[5%]'} h-screen flex flex-col items-center pt-5 transition-all duration-300 sticky`}>
      <button 
        onClick={toggleExpand} 
        className="text-lg focus:outline-none absolute top-5 left-5"
      >
        <FaBars size={24} />
      </button>
      <ul className="mt-20 space-y-6 w-full">
        <li className="nav-item w-full">
          <Link to="/" className="block px-4 py-2 flex items-center gap-4">
            <FaHome size={20} />
            {expanded && <span className="ml-2">Home</span>}
          </Link>
        </li>
        <li className="nav-item w-full">
          <a href="#about" className="block px-4 py-2 flex items-center gap-4">
            <FaInfoCircle size={20} />
            {expanded && <span className="ml-2">About</span>}
          </a>
        </li>
        <li className="nav-item w-full">
          <a href="#services" className="block px-4 py-2 flex items-center gap-4">
            <FaServicestack size={20} />
            {expanded && <span className="ml-2">Services</span>}
          </a>
        </li>
        <li className="nav-item w-full">
          <a href="#contact" className="block px-4 py-2 flex items-center gap-4">
            <FaEnvelope size={20} />
            {expanded && <span className="ml-2">Contact</span>}
          </a>
        </li>
      </ul>
    </div>
  );
};

export default Navbar;
