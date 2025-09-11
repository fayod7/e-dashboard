
import { memo } from 'react';
import { NavLink, Outlet } from 'react-router-dom';

const Products = () => {
  return (
    <>
         <div className='flex gap-3.5 items-center font-semibold text-[20px] px-4 pt-5'>
            <NavLink end={true} className={'tab__link'} to={'/products'}>Products</NavLink>
            <NavLink className={'tab__link'} to={'category'}>Categories</NavLink>
        </div>
    <div><Outlet/></div>
    </>
  );
};

export default memo(Products);