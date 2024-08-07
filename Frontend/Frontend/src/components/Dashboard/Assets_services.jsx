import React, { useEffect, useState } from 'react'
import Eachservice from './Eachservice';
import Loader from '../../shared/loader';

const Assets_services = () => {

  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(()=>{
    const fetchdata = async ()=>{
      
      let data = await fetch('http://localhost:4000/getdata');
      data = await data.json();
      setServices(data);
      setLoading(false)
      
    }
    fetchdata();
    
  },[])


  if (loading) {
    return <Loader/>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div className=' w-[90%] flex justify-center flex-wrap gap-12'>
      {services.map((e)=>(<Eachservice service={e.service_name} hosts={e.service_hosts} />))}
    </div>
  )
}

export default Assets_services
