import React from 'react';
import { Link } from 'react-router-dom';
import { FaBars, FaHome, FaInfoCircle, FaServicestack, FaEnvelope } from "react-icons/fa";

const NavItem = ({ title, icon: Icon, path, expanded }) => {
  return (
    <li className="nav-item w-full">
      <Link to={path} className="block px-4 py-2 flex items-center gap-4">
        <Icon size={20} />
        {expanded && <span className="ml-2">{title}</span>}
      </Link>
    </li>
  );
};

export default NavItem;
