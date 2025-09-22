import { memo } from 'react';
import UsersStatistics from '../components/UsersStatistics';

const Statistics = () => {
  return (
    <div className="w-full h-screen bg-[#f4f5eb] !py-5 !px-6">
      <div className='bg-white flex flex-col gap-6 rounded-md p-5'>

        <div className='grid grid-cols-3 gap-8'>
          
           <div className="bg-white rounded-2xl shadow p-6 flex flex-col">
          <span className="text-sm text-gray-500">Revenue</span>
          <span className="text-2xl font-bold text-green-600 mt-2">$1000</span>
        </div>
         <div className="bg-white rounded-2xl shadow p-6 flex flex-col">
          <span className="text-sm text-gray-500">Increase in sales</span>
          <span className="text-2xl font-bold text-red-600 mt-2">+10%</span>
        </div>

         <div className="bg-white rounded-2xl shadow p-6 flex flex-col">
          <span className="text-sm text-gray-500">Total contracts</span>
          <span className="text-2xl font-bold text-slate-800 mt-2">7000</span>
        </div>
      </div>

        <div className='w-[600px]'>
          <UsersStatistics/>
        </div>
      </div>
    </div>
  );
};

export default memo(Statistics);