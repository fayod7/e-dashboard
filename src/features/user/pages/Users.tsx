import { memo } from 'react';

interface IUser {
  id: number;
  fname: string;
  lname: string;
  email: string;
  address: string;
  role: "user" | "admin" | "moderator";
  isActive: boolean
}

const users: IUser[] = [
  { id: 1, fname: "Fayod", lname: 'Nozimov', email: "fayodnv@gmai.com", address: "Farg'ona", role: "user", isActive: true},
  { id: 2, fname: "Aliya", lname: 'Karimova', email: "aliya.k@gmail.com", address: "Tashkent", role: "admin", isActive: true},
  { id: 3, fname: "Bekzod", lname: 'Rustamov', email: "bekzod.r@gmail.com", address: "Samarkand", role: "moderator",  isActive: true},
];

const Users = () => {
  return (
    <div className="w-full">
      <table className='min-w-full divide-y divide-gray-200 border border-gray-200'>
        <thead className='bg-gray-100 rounded-t-lg shadow-sm'>
            <tr>
                <th className='px-4 py-4 text-left text-[18px] font-semibold text-gray-700 '>№</th>
                <th className='px-4 py-4 text-left text-[18px] font-semibold text-gray-700 '>Full Name</th>
                <th className='px-4 py-4 text-left text-[18px] font-semibold text-gray-700 '>Email</th>
                <th className='px-4 py-4 text-left text-[18px] font-semibold text-gray-700 '>Address</th>
                <th className='px-4 py-4 text-left text-[18px] font-semibold text-gray-700 '>Role</th>
                <th className='px-4 py-4 text-left text-[18px] font-semibold text-gray-700 '>Update</th>
                <th className='px-4 py-4 text-left text-[18px] font-semibold text-gray-700 '>Delete</th>
            </tr>
        </thead>
        <tbody className='bg-white divide-y divide-gray-200'>
        {
            users?.map((user:IUser) => (
            <tr key={user.id} className={`hover:bg-gray-50 duration-200 hover:shadow-sm ${ user.id % 2 === 0 ? 'bg-gray-100' : 'bg-white' }`}>
                <td className='px-4 py-3 text-[18px] text-gray-700'>{user.id}</td>
                <td className='px-4 py-3 text-[18px] text-gray-700' >
                    {`${user.fname} ${user.lname}`}
                </td>
                <td className='px-4 py-3 text-[18px] text-gray-700 ' >{user.email}</td>
                <td className='px-4 py-3 text-[18px] text-gray-700 truncate'>{user.address}</td>
                <td className='px-4 py-3 text-[18px] text-gray-700'>{user.role}</td>
                <td className='px-4 py-3'><button className='bg-slate-600 text-white px-3 py-1.5 rounded-sm duration-200 hover:cursor-pointer hover:opacity-80'>Update</button></td>
                <td className='px-4 py-3'><button className='bg-slate-600 text-white px-3 py-1.5 rounded-sm duration-200 hover:cursor-pointer hover:opacity-80'>Delete</button></td>
            </tr>
            ))
        }
        </tbody>
      </table>
    </div>
  );
};

export default memo(Users);