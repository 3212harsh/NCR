import React, { useState } from 'react';
import { FaArrowDown, FaArrowUp, FaFilter, FaSearch } from 'react-icons/fa';

const Filter = ({ onFilter }) => {
    const [serial, setSerial] = useState('');
    const [hosts, setHosts] = useState('');
    const [country, setCountry] = useState('');
    const [state, setState] = useState('');
    const [organization, setOrganization] = useState('');
    const [showAdvanced, setShowAdvanced] = useState(false);

    const handleFilterChange = () => {
        onFilter({ serial, hosts, country, state, organization });
    };

    const toggleAdvancedFilter = () => {
        setShowAdvanced(!showAdvanced);
    };

    return (
        <div className="sticky top-0 z-10 bg-white shadow-lg p-6 mb-4 rounded-md border border-gray-300">
            <h2 className="text-xl font-semibold mb-4 flex items-center">
                <FaFilter className="text-blue-600 mr-2 text-lg" />
                Filter Options
            </h2>
            <div className="space-y-4">
                <div className="flex flex-col sm:flex-row gap-4 mb-4 items-center">
                    <div className="flex-grow">
                        <div className="flex items-center border border-gray-300 rounded-md overflow-hidden">
                            <FaSearch className="text-gray-500 ml-3 text-lg" />
                            <input
                                type="text"
                                placeholder="Serial"
                                value={serial}
                                onChange={(e) => setSerial(e.target.value)}
                                className="w-full p-2 border-none outline-none bg-gray-50"
                            />
                        </div>
                    </div>
                    <button
                        onClick={toggleAdvancedFilter}
                        className="bg-gray-200 text-gray-700 p-2 rounded-md flex items-center hover:bg-gray-300 transition-colors"
                    >
                        {showAdvanced ? <FaArrowUp className="mr-2" /> : <FaArrowDown className="mr-2" />}
                        {showAdvanced ? 'Hide Advanced Filters' : 'Show Advanced Filters'}
                    </button>
                </div>
                
                {showAdvanced && (
                    <div className="space-y-4">
                        <div className="flex items-center border border-gray-300 rounded-md overflow-hidden">
                            <FaSearch className="text-gray-500 ml-3 text-lg" />
                            <input
                                type="text"
                                placeholder="Hosts"
                                value={hosts}
                                onChange={(e) => setHosts(e.target.value)}
                                className="w-full p-2 border-none outline-none bg-gray-50"
                            />
                        </div>
                        <div className="flex items-center border border-gray-300 rounded-md overflow-hidden">
                            <FaSearch className="text-gray-500 ml-3 text-lg" />
                            <input
                                type="text"
                                placeholder="Country"
                                value={country}
                                onChange={(e) => setCountry(e.target.value)}
                                className="w-full p-2 border-none outline-none bg-gray-50"
                            />
                        </div>
                        <div className="flex items-center border border-gray-300 rounded-md overflow-hidden">
                            <FaSearch className="text-gray-500 ml-3 text-lg" />
                            <input
                                type="text"
                                placeholder="State"
                                value={state}
                                onChange={(e) => setState(e.target.value)}
                                className="w-full p-2 border-none outline-none bg-gray-50"
                            />
                        </div>
                        <div className="flex items-center border border-gray-300 rounded-md overflow-hidden">
                            <FaSearch className="text-gray-500 ml-3 text-lg" />
                            <input
                                type="text"
                                placeholder="Organization"
                                value={organization}
                                onChange={(e) => setOrganization(e.target.value)}
                                className="w-full p-2 border-none outline-none bg-gray-50"
                            />
                        </div>
                    </div>
                )}
                
                <button
                    onClick={handleFilterChange}
                    className="w-full bg-blue-600 text-white p-2 rounded-md hover:bg-blue-700 transition-colors"
                >
                    Apply Filters
                </button>
            </div>
        </div>
    );
};

export default Filter;