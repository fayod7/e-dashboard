import { memo } from 'react';
import UsersStatistics from '../components/UsersStatistics';

const Statistics = () => {
  return (
    <div className="bg-gray-50">
      <UsersStatistics/>
    </div>
  );
};

export default memo(Statistics);