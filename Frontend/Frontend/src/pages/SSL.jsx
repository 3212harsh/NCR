import React, { useEffect, useState } from 'react';
import Card from '../components/SSL/Card';
import Filter from '../components/SSL/Filter';
import Loader from '../shared/loader';

const SSL = () => {
    const [data, setData] = useState([]);
    const [filteredData, setFilteredData] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchdata = async () => {
            try {
                const response = await fetch(`http://localhost:4000/ssldetails`);
                const result = await response.json();
                setData(result);
                setFilteredData(result);
            } catch (error) {
                console.error("Error fetching data:", error);
            } finally {
                setLoading(false);
            }
        };
        fetchdata();
    }, []);

    const handleFilter = (filters) => {
        const { serial, hosts, country, state, organization } = filters;

        const filtered = data.filter(item => {
            return (
                (!serial || item.serial.toString().includes(serial)) &&
                (!hosts || item.ips.some(ip => ip.includes(hosts))) &&
                (!country || item.C.includes(country)) &&
                (!state || item.ST.includes(state)) &&
                (!organization || item.O.includes(organization))
            );
        });

        setFilteredData(filtered);
    };

    return (
      <div className='flex items-center justify-center'>
        <div className="p-6 w-[70%]">
            <Filter onFilter={handleFilter} />
            {loading ? (
              <Loader/>
            ) : (
              <div className="grid grid-cols-1 gap-4">
                    {filteredData.map((item, index) => (
                      <Card key={index} data={item} />
                    ))}
                </div>
            )}
        </div>
    </div>
    );
};

export default SSL;
