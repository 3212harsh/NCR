import React from 'react';
import { FaBarcode, FaBuilding, FaMapMarkerAlt, FaServer, FaShieldAlt } from 'react-icons/fa';
import { Link } from 'react-router-dom'

// Mapping of country codes to full names
const countryNames = {
    'US': 'United States',
    'GB': 'United Kingdom',
    'CA': 'Canada',
    'AU': 'Australia',
    'DE': 'Germany',
    'FR': 'France',
    'JP': 'Japan',
    'IN': 'India',
    'BR': 'Brazil',
    'IT': 'Italy',
    'ES': 'Spain'
};

// Mapping of state abbreviations to full names
const stateNames = {
    'GA': 'Georgia',
    'ON': 'Ontario',
    'VI': 'Victoria',
    'BY': 'Bavaria',
    'IDF': 'Île-de-France',
    'TK': 'Tokyo',
    'KA': 'Karnataka',
    'SP': 'São Paulo',
    'LA': 'Lazio',
    'MD': 'Madrid'
};

const Card = ({ data }) => {
    
    const fullLocation = `${stateNames[data.ssl.cert.subject.ST] || data.ssl.cert.subject.ST}, ${countryNames[data.ssl.cert.subject.C] || data.ssl.cert.subject.C}`;

    return (
        <Link to={`/ssldetails/${data.ssl.cert.serial}`} className="bg-gray-100 shadow-lg rounded-lg p-6 mb-4 transition-transform transform hover:scale-105 hover:shadow-2xl border border-gray-300">
            {/* Serial Number */}
            <div className="flex flex-col md:flex-row items-start md:items-center mb-4">
                <FaBarcode className="text-blue-600 mr-3 text-2xl" />
                <h2 className="text-xl font-semibold text-gray-900">Serial: {data.ssl.cert.serial}</h2>
            </div>

            {/* Organization and Location */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                <div className="flex items-center">
                    <FaBuilding className="text-gray-700 mr-3 text-lg" />
                    <p className="text-md font-medium text-gray-800">Organization: {data.ssl.cert.subject.O}</p>
                </div>
                <div className="flex items-center">
                    <FaMapMarkerAlt className="text-gray-700 mr-3 text-lg" />
                    <p className="text-md font-medium text-gray-800">Location: {fullLocation}</p>
                </div>
            </div>

            {/* Hosts and Issuer */}
             <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                 <div className="flex items-center">
                     <FaServer className="text-gray-700 mr-3 text-lg" />
                     <p className="text-md font-medium text-gray-800">Hosts: {data.ips.join(', ')}</p>
                 </div>
                 <div className="flex items-center">
                     <FaShieldAlt className="text-gra    y-700 mr-3 text-lg" />
                     <p className="text-md font-medium text-gray-800">Issuer: {data.ssl.cert.issuer.CN} ({data.ssl.cert.issuer.O})</p>
                 </div>
            </div>
        </Link>
    );
};

export default Card;