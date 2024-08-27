import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import Showhost from './Showhost';
import Loader from '../shared/loader';
import BackButton from '../shared/BackBtn';

const useQuery = () => {
  return new URLSearchParams(useLocation().search);
};

const SearchResult = () => {
  const query = useQuery();
  const searchText = query.get('searchText');
  const port = query.get('port');
  const service = query.get('service');
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true); 
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        let url = `http://localhost:4000/search?`;
        const params = [];

        if (searchText) params.push(`searchText=${encodeURIComponent(searchText)}`);
        if (port) params.push(`port=${encodeURIComponent(port)}`);
        if (service) params.push(`service=${encodeURIComponent(service)}`);

        if (params.length > 0) {
          url += params.join('&');
        }

        // Fetch data from the API
        const response = await fetch(url);
        const result = await response.json();
        setData(result);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, [searchText, port, service]);


  if (loading) {
    return <div><Loader/></div>; // Display loading state
}

if (error) {
    return <div>Error: {error}</div>; // Display error state
}

if (!data || data.length === 0) {
    return <div>No data available</div>; // Handle case where data is empty
}

  return (
    <div className='w-[70%]'>
      <div className='w-full flex justify-between items-center mb-5'>
        <BackButton/>
        <h1 className=' font-semibold'>Search Results</h1>
        <span className='bg-zinc-200 rounded-lg text-zinc-800 px-4 py-1'>Total Results : <span className=' font-bold'>{data.length}</span></span>
      </div>
      {data ? (
        <div className='w-full flex flex-col items-center gap-5 py-2'>
          {data.map((e,i) => (
            <Showhost key={i} ip={e.ip_str} ports={e.ports} asn={e.asn} os={e.os} location={e.location} />
          ))}
        </div>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
};

export default SearchResult;
