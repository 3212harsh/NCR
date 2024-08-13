import React, { useState } from 'react';
import { FaBars, FaHome, FaInfoCircle, FaServicestack, FaEnvelope } from "react-icons/fa";
import { Link } from 'react-router-dom';
import NavItem from './NavItem';

const Navbar = () => {
  const [expanded, setExpanded] = useState(true);

  const paths = [
    {
      title:"Dashboard",
      icon:FaHome,
      path:'/'
    },
    {
      title:"SSL Details",
      icon:FaInfoCircle,
      path:"/SSL"
    },
    {
      title:"Virus Scan",
      icon:FaServicestack,
      path:"/VirusScan"
    }
  ]

  const toggleExpand = () => {
    setExpanded(!expanded);
  };

  return (
    <div className={`bg-black text-white ${expanded ? 'w-[11%]' : 'w-[5%]'} h-screen flex flex-col items-center pt-5 transition-all duration-300 sticky`}>
      <button 
        onClick={toggleExpand} 
        className="text-lg focus:outline-none absolute top-5 left-5"
      >
        <FaBars size={24} />
      </button>
      <ul className="mt-20 space-y-6 w-full">
        {paths.map((e)=>(<NavItem title={e.title} icon={e.icon} path={e.path} expanded={expanded} />))}
      </ul>
    </div>
  );
};

export default Navbar;
