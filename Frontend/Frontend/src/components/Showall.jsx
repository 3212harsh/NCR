import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Loader from '../shared/loader';
import Showhost from './Showhost';
import { FaArrowLeft } from 'react-icons/fa';

const Showall = () => {
  const { service } = useParams();
  const [hosts, setHosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      let response = await fetch(`http://localhost:4000/showall/${service}`);
      response = await response.json();
      setHosts(response.service_hosts);
      setLoading(false);
    };
    fetchData();
  }, [service]);

  if (loading) {
    return <Loader />;
  }

  return (
    <div className='w-full h-screen px-[15%]'>
      <div className='flex items-center justify-between p-4 bg-white border-b mb-10 border-gray-300 rounded-t-lg'>
      <button onClick={() => navigate(-1)} className='flex items-center text-blue-600'>
        <FaArrowLeft className='mr-2' />
        Back
      </button>
        <h1 className='text-xl font-bold'>{`Viewing ${service} Data`}</h1>
        <div className='bg-gray-100 p-2 rounded-lg text-center'>
          <strong>{`Total Results: ${hosts.length}`}</strong>
        </div>
      </div>
      <div className='w-full flex flex-col items-center gap-5 py-2'>
        {hosts.map((e) => (
          <Showhost key={e.ip} ip={e.ip} ports={e.ports} asn={e.asn} os={e.os} location={e.location} />
        ))}
      </div>
    </div>
  );
};

export default Showall;
