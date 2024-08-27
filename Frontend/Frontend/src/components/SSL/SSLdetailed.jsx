import React, { useEffect, useState } from 'react';
import { FaArrowLeft, FaCertificate, FaClipboardList, FaCode, FaKey, FaLock, FaNetworkWired, FaRegClock } from 'react-icons/fa';
import { useNavigate, useParams } from 'react-router-dom';
import Loader from '../../shared/loader';

const DetailedSSH = () => {
  const { serial } = useParams(); // Get the serial number from the URL
  const [sslData, setSslData] = useState({}); // State to hold SSL data
  const [loading, setLoading] = useState(true); // State to manage loading state
  const [error, setError] = useState(null); // State to manage error state
  const navigate = useNavigate();

  useEffect(() => {
    // Fetch detailed SSL data
    const fetchDetailedSSLData = async () => {
      try {
        const response = await fetch(`http://localhost:4000/detailedssl/${serial}`);
        if (!response.ok) {
          throw new Error(`Error fetching data: ${response.statusText}`);
        }
        const data = await response.json();
        
        setSslData(data); // Set the SSL data in state
      } catch (error) {
        setError(error.message); // Set error message if fetching fails
      } finally {
        setLoading(false); // Set loading to false after fetching
      }
    };

    fetchDetailedSSLData();
  }, [serial]);

  // Handle loading state
  if (loading) {
    return <Loader/>;
  }

  // Handle error state
  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div className="w-[95%] mx-auto p-6 bg-white shadow-lg rounded-lg h-fit">
      {/* Back Button */}
      <div className="mb-4">
        <button
          className="flex items-center px-4 py-2 text-white bg-blue-600 hover:bg-blue-700 rounded-md shadow-md transition duration-300"
          onClick={() => navigate(-1)}
        >
          <FaArrowLeft className="w-4 h-4 mr-2" />
          Back
        </button>
      </div>

      <div className="flex">
        {/* Left Side: General Details */}
        <div className="flex-1 pr-4">
          <h2 className="text-3xl font-bold text-gray-800 mb-4">General SSH Details</h2>

          <div className="p-4 border border-gray-300 rounded-md bg-gray-100 shadow-md">
            <h3 className="text-2xl font-semibold flex items-center text-gray-800 mb-4">
              <FaCertificate className="mr-2 text-blue-600" size={24} /> SSL Certificates
            </h3>
            <div className="card-content">
              <h4 className="subheading flex items-center text-lg font-semibold mb-2">
                <FaLock className="mr-2 text-gray-600" size={20} /> Chain
              </h4>
              {sslData.chain?.map((cert, index) => (
                <pre key={index} className="certificate mb-2 bg-gray-200 p-2 rounded-md">
                  {typeof cert === 'object' && cert !== null ? JSON.stringify(cert, null, 2) : cert}
                </pre>
              ))}
            </div>
          </div>

          <div className="p-4 mt-6 border border-gray-300 rounded-md bg-gray-100 shadow-md">
            <h3 className="text-2xl font-semibold flex items-center text-gray-800 mb-4">
              <FaKey className="mr-2 text-blue-600" size={24} /> DH Parameters
            </h3>
            <div className="card-content ">
              {sslData.dhparams ? (
                <>
                  <div className="dh-param mb-2">
                    <h4 className="subheading flex items-center text-lg font-semibold mb-2">
                      <FaCode className="mr-2 text-gray-600" size={20} /> Prime
                    </h4>
                    <pre className="bg-gray-200 p-2 rounded-md w-[100%]">{
                      (sslData.dhparams.prime.length > 62)?`${sslData.dhparams.prime.substring(0,60)}...`:sslData.dhparams.prime
                    }</pre>
                  </div>
                  <div className="dh-param mb-2 overflow-hidden">
                    <h4 className="subheading flex items-center text-lg font-semibold mb-2 ">
                      <FaKey className="mr-2 text-gray-600" size={20} /> Public Key
                    </h4>
                    <pre className="bg-gray-200 p-2 rounded-md">
                      {(sslData.dhparams.public_key.length > 62) ? `${sslData.dhparams.public_key.substring(0,60)}...` || 'No public key available.':sslData.dhparams.public_key || 'No public key available.'}
                    </pre>
                  </div>
                  <div className="dh-param mb-2">
                    <h4 className="subheading flex items-center text-lg font-semibold mb-2">
                      <FaNetworkWired className="mr-2 text-gray-600" size={20} /> Bits
                    </h4>
                    <pre className="bg-gray-200 p-2 rounded-md">{sslData.dhparams.bits}</pre>
                  </div>
                  <div className="dh-param">
                    <h4 className="subheading flex items-center text-lg font-semibold mb-2">
                      <FaCode className="mr-2 text-gray-600" size={20} /> Generator
                    </h4>
                    <pre className="bg-gray-200 p-2 rounded-md ">{(sslData.dhparams.generator.length > 62 )?`${sslData.dhparams.generator.substring(0,60)}...`:sslData.dhparams.generator}</pre>
                  </div>
                </>
              ) : (
                <div>No DH parameters available.</div>
              )}
            </div>
          </div>
        </div>

        {/* Right Side: Detailed SSH Information */}
        <div className="flex-1 pl-4 max-w-[50%]">
          <h2 className="text-3xl font-bold text-gray-800 mb-4">Detailed SSH Information</h2>

          <div className="p-4 border border-gray-300 rounded-md bg-gray-100 shadow-md">
            <h3 className="text-2xl font-semibold flex items-center text-gray-800 mb-4">
              <FaCertificate className="mr-2 text-blue-600" size={24} /> Supported Versions
            </h3>
            <ul className="version-list mb-4">
              {sslData.versions?.map((version, index) => (
                <li key={index} className="version-item mb-2 bg-gray-200 p-2 rounded-md">{version}</li>
              ))}
            </ul>

            <h3 className="text-2xl font-semibold flex items-center text-gray-800 mb-4">
              <FaClipboardList className="mr-2 text-blue-600" size={24} /> Certificate Information
            </h3>
            <div className="card-content">
              {/* Issuer Information */}
              <div className="cert-info-item mb-4">
                <h4 className="subheading flex items-center text-lg font-semibold mb-2 text-white bg-blue-600 p-2 rounded-md">
                  <FaClipboardList className="mr-2" /> Issuer
                </h4>
                <div className="bg-blue-100 p-2 rounded-md">
                  {sslData.cert?.issuer?.CN && (
                    <div>
                      <strong>Common Name:</strong> {sslData.cert.issuer.CN}
                    </div>
                  )}
                  {sslData.cert?.issuer?.O && (
                    <div>
                      <strong>Organization:</strong> {sslData.cert.issuer.O}
                    </div>
                  )}
                  {sslData.cert?.issuer?.C && (
                    <div>
                      <strong>Country:</strong> {sslData.cert.issuer.C}
                    </div>
                  )}
                </div>
              </div>
              {/* Subject Information */}
              <div className="cert-info-item mb-4">
                <h4 className="subheading flex items-center text-lg font-semibold mb-2 text-white bg-green-600 p-2 rounded-md">
                  <FaClipboardList className="mr-2" /> Subject
                </h4>
                <div className="bg-green-100 p-2 rounded-md">
                  {sslData.cert?.subject?.CN && (
                    <div>
                      <strong>Common Name:</strong> {sslData.cert.subject.CN}
                    </div>
                  )}
                  {sslData.cert?.subject?.O && (
                    <div>
                      <strong>Organization:</strong> {sslData.cert.subject.O}
                    </div>
                  )}
                  {sslData.cert?.subject?.C && (
                    <div>
                      <strong>Country:</strong> {sslData.cert.subject.C}
                    </div>
                  )}
                </div>
              </div>
              <div className="cert-info-item mb-2">
                <h4 className="subheading flex items-center text-lg font-semibold mb-2">
                  <FaLock className="mr-2 text-gray-600" size={20} /> Signature Algorithm
                </h4>
                <pre className="bg-gray-200 p-2 rounded-md">{sslData.cert?.sig_alg}</pre>
              </div>
              <div className="cert-info-item mb-2">
                <h4 className="subheading flex items-center text-lg font-semibold mb-2">
                  <FaRegClock className="mr-2 text-gray-600" size={20} /> Issued
                </h4>
                <pre className="bg-gray-200 p-2 rounded-md">{sslData.cert?.issued}</pre>
              </div>
              <div className="cert-info-item mb-2">
                <h4 className="subheading flex items-center text-lg font-semibold mb-2">
                  <FaRegClock className="mr-2 text-gray-600" size={20} /> Expires
                </h4>
                <pre className="bg-gray-200 p-2 rounded-md">{sslData.cert?.expires}</pre>
              </div>
              <div className="cert-info-item mb-2">
                <h4 className="subheading flex items-center text-lg font-semibold mb-2">
                  <FaKey className="mr-2 text-gray-600" size={20} /> Public Key
                </h4>
                <pre className="bg-gray-200 p-2 rounded-md">
                  {sslData.cert?.pubkey?.bits ? `${sslData.cert.pubkey.bits} bits, ${sslData.cert.pubkey.type}` : 'No public key available.'}
                </pre>
              </div>
              <div className="cert-info-item mb-2">
                <h4 className="subheading flex items-center text-lg font-semibold mb-2">
                  <FaClipboardList className="mr-2 text-gray-600" size={20} /> Version
                </h4>
                <pre className="bg-gray-200 p-2 rounded-md">{sslData.cert?.version}</pre>
              </div>
              <div className="cert-info-item">
                <h4 className="subheading flex items-center text-lg font-semibold mb-2">
                  <FaClipboardList className="mr-2 text-gray-600" size={20} /> Extensions
                </h4>
                <div className="bg-gray-200 p-2 rounded-md overflow-auto max-h-40">
                  {sslData.cert?.extensions?.map((ext, index) => (
                    <div key={index} className="mb-2">
                      {typeof ext === 'object' ? JSON.stringify(ext, null, 2) : ext}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DetailedSSH;
