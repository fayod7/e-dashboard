import { memo, useEffect } from 'react';
import Sidebar from './components/Sidebar';
import { Outlet } from 'react-router-dom';
import { useAuth } from '../features/auth/service/useAuth';
import { useDispatch } from 'react-redux';
import { removeToken } from '../features/auth/store/authSlice';

const DashboardLayout = () => {
  const { getProfile } = useAuth()
  const { isError, data } = getProfile
  const dispatch = useDispatch()
  useEffect(()=>{
    if(isError) {
      dispatch(removeToken())
    }
  }, [isError])
  
  return (
    <div className="flex overflow-x-hidden">
      <Sidebar user={data}/>
      <main className='flex-1'>
        <Outlet/>
        
      </main>
    </div>
  );
};

export default memo(DashboardLayout);