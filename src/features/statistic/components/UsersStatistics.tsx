
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { Line } from 'react-chartjs-2';
import { memo } from 'react';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

export const options = {
  responsive: true,
  plugins: {
    legend: {
      position: 'top' as const,
    },
    title: {
      display: true,
      text: 'Product sales trend description',
    },
  },
};

const labels = ['January', 'February', 'March', 'April', 'May', 'June', 'July'];

export const data = {
  labels,
  datasets: [
    {
      label: 'Monthly overview',
      data: [10, 15, 20, 28, 35, 42, 50],
      borderColor: 'rgb(53, 162, 235)',
      backgroundColor: 'rgb(53, 162, 235, 0.5)',
    }
  ],
};

const UsersStatistics = () => {
  return <Line options={options} data={data} />;
}

export default memo(UsersStatistics)
