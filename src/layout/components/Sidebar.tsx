import { ChartNoAxesCombined, ShoppingBasket, UserRoundPen, Users } from 'lucide-react';
import { memo, type FC } from 'react';
import { NavLink } from 'react-router-dom';


interface User {
  fname: string;
  lname?: string;
  email: string;
  address?: string;
  id: number;
}

interface Props {
  user: User;
}

const Sidebar:FC<Props> = ( { user } ) => {
  
  return (
    <div className="w-[250px] min-h-screen bg-teal-900 text-white sticky top-0 left-0 z-20 ">
      <div className='flex w-full bg-[#1e40af] py-2 px-1 items-center gap-2'>
        <div className='rounded-full grid place-items-center bg-slate-800 size-7 font-semibold'>
          {user?.fname?.slice(0, 1)}
        </div>
        <div className='text-xl'>
          {user?.fname}
        </div>
      </div>
      <ul className='flex flex-col mt-5 overflow-hidden'>
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
        <li>
          <NavLink to={'myprofile'} className={'flex gap-2 items-center sidebar__link'}>
          <UserRoundPen className='size-7'/>
          <span className='font-semibold text-[22px]'>Edit Profile</span>
          </NavLink>
        </li>
      </ul>
    </div>
  );
};

export default memo(Sidebar);