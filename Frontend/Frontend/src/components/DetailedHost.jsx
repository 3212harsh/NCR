import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { FaServer, FaMapMarkerAlt, FaRegClock, FaGlobe, FaClipboardList } from 'react-icons/fa';
import { GiNetworkBars } from 'react-icons/gi';

const DetailedHost = () => {
  const { ip } = useParams(); // Get the IP address from URL parameters
  const navigate = useNavigate(); // Hook to programmatically navigate
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`http://localhost:4000/show/${ip}`);
        const result = await response.json();
        setData(result);
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [ip]);

  if (loading) {
    return <div className="text-center text-gray-600">Loading...</div>;
  }

  return (
    <div className="max-w-6xl mx-auto p-6 bg-white shadow-lg rounded-lg relative h-fit"> {/* Set a minimum height */}
      {/* Back Button */}
      <div className="mb-4">
        <button
          className="flex items-center px-4 py-2 text-white bg-blue-600 hover:bg-blue-700 rounded-md shadow-md transition duration-300"
          onClick={() => navigate(-1)} // Navigate back to the previous path
        >
          <svg className="w-4 h-4 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12H3m0 0L8 7m-5 5l5 5" />
          </svg>
          Back
        </button>
      </div>

      {/* Main Content */}
      <div className="flex">
        {/* Left Side: Basic Details */}
        <div className="flex-1 pr-4">
          <h2 className="text-5xl font-bold text-gray-800 mb-2">{data.ip_str}</h2>

          {/* Hostnames Display */}
          <div className="my-4 mt-2"> {/* Added margin for spacing */}
            <h3 className="text-xl font-semibold text-gray-800">Hostnames:</h3>
            <div className="flex flex-wrap gap-2">
              {data.hostnames && data.hostnames.length > 0 ? (
                data.hostnames.map((hostname, index) => (
                  <a 
                    key={index}
                    href={`http://${hostname}`} // Use appropriate protocol if needed
                    className="text-blue-500 hover:underline"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    {hostname}
                  </a>
                ))
              ) : (
                <p className="text-gray-600">No hostnames available.</p> // Handle null scenario
              )}
            </div>
          </div>

          <div className="p-4 border border-gray-300 rounded-md bg-gray-100 shadow-md my-10 h-fit"> {/* General Info Box */}
            <h3 className="text-2xl font-semibold flex items-center text-gray-800 mb-4">
              <FaServer className="mr-2 text-blue-600" size={24} /> General Information
            </h3>
            <div className="flex flex-col">
              <div className="flex items-center mb-2 bg-gray-200 p-2 rounded-md">
                <FaGlobe className="mr-2 text-gray-600" size={20} />
                <p className="text-lg"><strong>Organization:</strong> {data.org}</p>
              </div>
              <div className="flex items-center mb-2 bg-gray-200 p-2 rounded-md">
                <FaMapMarkerAlt className="mr-2 text-gray-600" size={20} />
                <p className="text-lg"><strong>Country:</strong> {data.country_name}</p>
              </div>
              <div className="flex items-center mb-2 bg-gray-200 p-2 rounded-md">
                <FaMapMarkerAlt className="mr-2 text-gray-600" size={20} />
                <p className="text-lg"><strong>City:</strong> {data.city}</p>
              </div>
              <div className="flex items-center mb-2 bg-gray-200 p-2 rounded-md">
                <GiNetworkBars className="mr-2 text-gray-600" size={20} />
                <p className="text-lg"><strong>ISP:</strong> {data.isp}</p>
              </div>
              <div className="flex items-center mb-2 bg-gray-200 p-2 rounded-md">
                <FaRegClock className="mr-2 text-gray-600" size={20} />
                <p className="text-lg"><strong>Last Updated:</strong> {new Date(data.last_update).toLocaleString()}</p>
              </div>
              <div className="flex items-center mb-2 bg-gray-200 p-2 rounded-md">
                <FaClipboardList className="mr-2 text-gray-600" size={20} />
                <p className="text-lg"><strong>ASN:</strong> {data.asn}</p>
              </div>
              <div className="flex items-center mb-2 bg-gray-200 p-2 rounded-md">
                <FaClipboardList className="mr-2 text-gray-600" size={20} />
                <p className="text-lg"><strong>Domains:</strong> {data.domains.join(', ')}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Right Side: Ports and Data */}
        <div className="flex-1 pl-4 max-w-[50%]">
          <h3 className="text-2xl font-semibold text-gray-800 mb-4">Available Ports</h3>
          <div className="flex flex-wrap gap-2 mb-6">
            {data.ports.map(port => (
              <button
                key={port}
                className="p-3 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition text-lg"
                style={{ borderRadius: '0.25rem' }} // Decrease border radius
                onClick={() => {
                  document.getElementById(`port-data-${port}`).scrollIntoView({ behavior: 'smooth' });
                }}
              >
                {port}
              </button>
            ))}
          </div>

          <div>
            <h3 className="text-xl font-semibold text-gray-800 mb-4">Port Data</h3>
            {data.data.map((entry, index) => (  
              <div key={index} id={`port-data-${entry.port || entry.http?.port}`} className="p-4 mb-4 border border-gray-300 rounded-md bg-gray-50 shadow-md min-w-full h-fit"> {/* Fixed height for each port data */}
                <h4 className="text-lg font-semibold text-gray-800">Data for Port: {entry.port || entry.http?.port}</h4>
                <p><strong>Timestamp:</strong> {new Date(entry.timestamp).toLocaleString()}</p>
                <p><strong>ISP:</strong> {entry.isp}</p>
                <p><strong>Protocol:</strong> {entry.transport}</p>
                <p><strong>Server:</strong> {entry.http?.server}</p>
                <p><strong>Data:</strong> {entry.data || 'No data available'}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default DetailedHost;
