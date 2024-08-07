import React, { useState } from 'react';
import { FaSearch, FaCaretDown } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';

const Search = () => {
  const [searchText, setSearchText] = useState('');
  const [selectedPort, setSelectedPort] = useState('');
  const [selectedService, setSelectedService] = useState('');

  const navigate = useNavigate();

  const wellKnownPorts = [
    { value: '80', label: 'HTTP (80)' },
    { value: '443', label: 'HTTPS (443)' },
    { value: '21', label: 'FTP (21)' },
    { value: '22', label: 'SSH (22)' },
  ];

  const wellKnownServices = [
    { value: 'http', label: 'HTTP' },
    { value: 'https', label: 'HTTPS' },
    { value: 'ftp', label: 'FTP' },
    { value: 'ssh', label: 'SSH' },
  ];

  const handleSearch = () => {
    const params = new URLSearchParams();
    if (searchText) params.append('searchText', searchText);
    if (selectedPort) params.append('port', selectedPort);
    if (selectedService) params.append('service', selectedService);
    navigate(`/search?${params.toString()}`);
  };
  
  return (
    <div className="bg-gray-100 p-6 rounded-md shadow-md w-[85%] mx-auto">
      <div className="flex space-x-4 items-center">
        <div className="flex-grow">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="searchText">
            Search Text
          </label>
          <input
            type="text"
            id="searchText"
            placeholder='Enter Hostname or IP address'
            value={searchText}
            onChange={(e) => setSearchText(e.target.value)}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          />
        </div>
        <div className="w-1/4">
          <label className="block text-gray-70+0 text-sm font-bold mb-2" htmlFor="port">
            Ports
          </label>
          <div className="relative">
            <select
              id="port"
              value={selectedPort}
              onChange={(e) => setSelectedPort(e.target.value)}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            >
              <option value="">Select a port</option>
              {wellKnownPorts.map((port) => (
                <option key={port.value} value={port.value}>
                  {port.label}
                </option>
              ))}
            </select>
            <FaCaretDown className="absolute top-3 right-3 pointer-events-none" />
          </div>
        </div>
        <div className="w-1/4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="service">
            Services
          </label>
          <div className="relative">
            <select
              id="service"
              value={selectedService}
              onChange={(e) => setSelectedService(e.target.value)}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            >
              <option value="">Select a service</option>
              {wellKnownServices.map((service) => (
                <option key={service.value} value={service.value}>
                  {service.label}
                </option>
              ))}
            </select>
            <FaCaretDown className="absolute top-3 right-3 pointer-events-none" />
          </div>
        </div>
        <div>
          <button
            onClick={handleSearch}
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline flex items-center"
          >
            <FaSearch className="mr-2" />
            Search
          </button>
        </div>
      </div>
    </div>
  );
};

export default Search;
