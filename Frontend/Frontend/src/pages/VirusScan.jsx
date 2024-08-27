import React, { useState } from 'react';
import { FaCheckCircle } from 'react-icons/fa';
import axios from 'axios';
import ScanResult from '../components/VirusScan/ScanResult';

const VirusScan = () => {
  const [ipAddress, setIpAddress] = useState('');
  const [scanStatus, setScanStatus] = useState('idle');
  const [scanResult, setScanResult] = useState(null);

  const handleIpChange = (e) => {
    setIpAddress(e.target.value);
    setScanResult(null);
  };

  const handleScanIp = async () => {
    if (!ipAddress) return;

    setScanStatus('scanning');

    try {
      const response = await axios.post('http://localhost:4000/scan/ip', { ipAddress });
      setScanResult({
        status: 'clean',
        details: response.data,
      });
    } catch (error) {
      console.error('Error scanning IP:', error);
      setScanResult({
        status: 'error',
        details: 'Error scanning IP',
      });
    } finally {
      setScanStatus('completed');
    }
  };

  return (
    <div className="w-[75%] mx-auto p-10 mt-10 bg-gray-100 shadow-2xl rounded-lg">
      <h2 className="text-4xl font-bold mb-5 text-center text-blue-800">IP Address Scan</h2>

      <div className="mb-8 flex items-center space-x-6">
        <label className="text-lg font-medium text-gray-700 whitespace-nowrap">Enter IP Address</label>
        <input
          type="text"
          value={ipAddress}
          onChange={handleIpChange}
          placeholder="192.168.0.1"
          className="flex-grow text-lg text-gray-900 border border-gray-300 rounded-lg bg-white p-3 focus:outline-none"
        />
        <button
          onClick={handleScanIp}
          disabled={!ipAddress || scanStatus === 'scanning'}
          className="px-6 py-3 bg-blue-800 text-white text-lg font-semibold rounded-md hover:bg-blue-900 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {scanStatus === 'scanning' ? 'Scanning...' : 'Scan IP'}
        </button>
      </div>

      {scanStatus === 'completed' && scanResult && (
        <div>
          {console.log(scanResult.details)}
          <ScanResult data={scanResult.details} />
        </div>
      )}
    </div>
  );
};

export default VirusScan;
