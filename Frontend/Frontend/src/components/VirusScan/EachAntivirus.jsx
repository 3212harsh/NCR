import React from 'react';
import { FaCheckCircle, FaTimesCircle } from 'react-icons/fa';

function EachAntivirus({data}) {
  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">VirusTotal Response</h1>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {Object.keys(data).map((i, index) => (
          <div
            key={index}
            className={`p-4 border rounded-lg shadow-sm flex items-center justify-between ${
              data[i].category === 'harmless' ? 'bg-green-50' : 'bg-yellow-50'
            }`}
          >
            <div>
              <h2 className="font-semibold">{data[i].engine_name}</h2>
              <p className="text-sm text-gray-600 capitalize">{data[i].category}</p>
            </div>
            <div>
              {data[i].result === 'clean' ? (
                <FaCheckCircle className="text-green-500 text-2xl" />
              ) : (
                <FaTimesCircle className="text-red-500 text-2xl" />
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default EachAntivirus;
