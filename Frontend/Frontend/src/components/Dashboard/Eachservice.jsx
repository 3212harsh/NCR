import React, { useState , } from 'react';
import { Link } from 'react-router-dom';

const EachService = (props) => {
    const { service, hosts } = props;

    return (

        <div className='flex flex-col w-[27%] h-[34vh] overflow-hidden rounded-lg bg-gray-200 justify-between border-gray-200 shadow-xl' >
            <div>

            <div className={`flex w-full h-[auto] py-1 text-white bg-black text-2xl items-center font-bold justify-between px-4`} >
                <span>{service}</span>
                <span className='text-white text-sm font-light italic' > Total results = <span className='font-semibold'>{hosts.length}</span></span>
             </div>
            <div className='px-4 py-3 h-[22vh] flex flex-col bg-slate-100 text-[20px] overflow-y-auto '>
                {hosts.map((e,i)=>(<Link key={i} to={`/show/${e.ip}`} className='hover:bg-slate-300 rounded-sm font-semibold font-sans px-2  cursor-pointer'>{e.ip}</Link>))}
            </div>
            </div>
            <div className='flex pb-2 h-auto justify-end px-2 py-1'>
                <Link to={`showall/${service}`} className='bg-[#5f249f] text-white px-3 py-1 rounded-lg '>
                    Show All {">>"}
                </Link>
            </div>
        </div>
    );
};

export default EachService;
