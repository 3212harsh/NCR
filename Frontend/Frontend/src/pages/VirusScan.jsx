import React, { useState } from 'react';
import { FaFileAlt, FaLink, FaCheckCircle } from 'react-icons/fa';
import axios from 'axios';
import Tab from '../components/VirusScan/Tab';

const VirusScan = () => {
  const [activeTab, setActiveTab] = useState('file');
  const [file, setFile] = useState(null);
  const [url, setUrl] = useState('');
  const [scanStatus, setScanStatus] = useState('idle');
  const [scanResult, setScanResult] = useState(null);

  const handleTabChange = (tab) => {
    setActiveTab(tab);
    setScanStatus('idle');
    setScanResult(null);
  };

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
    setScanResult(null);
  };

  const handleUrlChange = (e) => {
    setUrl(e.target.value);
    setScanResult(null);
  };

  const handleScanFile = async () => {
    if (!file) return;

    setScanStatus('scanning');

    const formData = new FormData();
    formData.append('file', file);
    console.log(formData);
    

    try {
      const response = await axios.post('http://localhost:4000/scan/file', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      setScanResult({
        status: 'clean',
        details: response.data,
      });
    } catch (error) {
      console.error('Error scanning file:', error);
      setScanResult({
        status: 'error',
        details: 'Error scanning file',
      });
    } finally {
      setScanStatus('completed');
    }
  };

  const handleScanUrl = async () => {
    if (!url) return;

    setScanStatus('scanning');

    try {
      const response = await axios.post('http://localhost:4000/scan/url', { url });
      setScanResult({
        status: 'clean',
        details: response.data,
      });
    } catch (error) {
      console.error('Error scanning URL:', error);
      setScanResult({
        status: 'error',
        details: 'Error scanning URL',
      });
    } finally {
      setScanStatus('completed');
    }
  };

  return (
    <div className="w-[75%] mx-auto p-10 mt-10 bg-gray-100 shadow-2xl rounded-lg">
      <h2 className="text-4xl font-bold mb-5 text-center text-blue-800">Virus Scan</h2>

      <div className="flex mb-8">
        <Tab title={"Scan File B"} activeTab={activeTab} handleTabChange={handleTabChange} tabtitle={'file'} icon={FaFileAlt}  />
        <Tab title="Scan URL" activeTab={activeTab} handleTabChange={handleTabChange} tabtitle="url" icon={FaLink} />
      </div>

      {activeTab === 'file' ? (
        <div className="mb-8">
          <label className="block mb-4 text-lg font-medium text-gray-700">Upload File</label>
          <input
            type="file"
            onChange={handleFileChange}
            className="block w-full text-lg text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-white focus:outline-none"
          />
          <button
            onClick={handleScanFile}
            disabled={!file || scanStatus === 'scanning'}
            className="mt-4 px-6 py-3 bg-blue-800 text-white text-lg font-semibold rounded-md hover:bg-blue-900 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {scanStatus === 'scanning' ? 'Scanning...' : 'Scan File'}
          </button>
        </div>
      ) : (
        <div className="mb-8 flex items-center space-x-6">
          <label className="text-lg font-medium text-gray-700 whitespace-nowrap">Enter URL</label>
          <input
            type="text"
            value={url}
            onChange={handleUrlChange}
            placeholder="https://example.com"
            className="flex-grow text-lg text-gray-900 border border-gray-300 rounded-lg bg-white p-3 focus:outline-none"
          />
          <button
            onClick={handleScanUrl}
            disabled={!url || scanStatus === 'scanning'}
            className="px-6 py-3 bg-blue-800 text-white text-lg font-semibold rounded-md hover:bg-blue-900 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {scanStatus === 'scanning' ? 'Scanning...' : 'Scan URL'}
          </button>
        </div>
      )}

      {scanStatus === 'completed' && (
        <div className="mt-8 p-6 bg-green-100 border-l-4 border-green-600 text-green-800 flex items-center">
          <FaCheckCircle className="text-2xl mr-4" />
          <div>
            <p className="font-bold text-xl">Scan Result:</p>
            <pre className="text-lg">{JSON.stringify(scanResult.details, null, 2)}</pre>
          </div>
        </div>
      )}
    </div>
  );
};

export default VirusScan;
