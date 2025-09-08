import { ChartNoAxesCombined, ShoppingBag, ShoppingBasket, Users } from 'lucide-react';
import { memo } from 'react';
import { NavLink } from 'react-router-dom';

const Sidebar = () => {
  return (
    <div className="w-[250px] h-screen bg-teal-900 text-white sticky top-0 left-0">
      <div className='flex w-full bg-[#1e40af] py-2 px-1 justify-center items-center gap-2'>
        <ShoppingBag />
        <h2 className='text-2xl'>e-commerce</h2>
      </div>
      <ul className='flex flex-col overflow-hidden mt-5'>
        <li>
          <NavLink to={''} className={'flex gap-2 items-center sidebar__link'}>
          <ChartNoAxesCombined className='size-7'/>
          <span className='font-semibold text-[22px]'>Statistics</span>
          </NavLink>
        </li>
        <li>
          <NavLink to={'products'} className={'flex gap-2 items-center sidebar__link'}>
          <ShoppingBasket className='size-7' />
          <span className='font-semibold text-[22px]'>Products</span>
          </NavLink>
        </li>
        <li>
          <NavLink to={'users'} className={'flex gap-2 items-center sidebar__link'}>
          <Users className='size-7'/>
          <span className='font-semibold text-[22px]'>Users</span>
          </NavLink>
        </li>
      </ul>
    </div>
  );
};

export default memo(Sidebar);