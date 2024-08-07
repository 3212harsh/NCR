import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';

const useQuery = () => {
  return new URLSearchParams(useLocation().search);
};

const SearchResult = () => {
  const query = useQuery();
  const searchText = query.get('searchText');
  const port = query.get('port');
  const service = query.get('service');
  const [data, setData] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Construct the URL with query parameters
        let url = `http://localhost:4000/search?`;
        if (searchText) url += `searchText=${encodeURIComponent(searchText)}&`;
        if (port) url += `port=${encodeURIComponent(port)}&`;
        if (service) url += `service=${encodeURIComponent(service)}`;

        // Fetch data from the API
        const response = await fetch(url);
        const result = await response.json();
        setData(result);
        console.log(result);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, [searchText, port, service]);

  return (
    <div>
      <h1>Search Results</h1>
      {data ? (
        <pre>{JSON.stringify(data, null, 2)}</pre>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
};

export default SearchResult;
