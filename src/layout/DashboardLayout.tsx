import { memo } from 'react';
import Sidebar from './components/Sidebar';
import { Outlet } from 'react-router-dom';

const DashboardLayout = () => {
  return (
    <div className="flex overflow-x-hidden">
      <Sidebar/>
      <main className='flex-1'>
        <Outlet/>
        
      </main>
    </div>
  );
};

export default memo(DashboardLayout);