import React from 'react'
import { FaFileAlt, FaLink, FaCheckCircle } from 'react-icons/fa';

const Tab = ({ title , activeTab , handleTabChange , tabtitle , icon: Icon }) => {
  return (
    <button
        className={`flex-1 py-4 text-xl font-semibold border-b-4 transition ${
        activeTab === tabtitle ? 'border-blue-800 text-blue-800' : 'border-transparent text-gray-600'
        } flex items-center justify-center`}
        onClick={() => handleTabChange(tabtitle)}
    >
        <Icon className="mr-2" />
        {title}
    </button>
  )
}

export default Tab
