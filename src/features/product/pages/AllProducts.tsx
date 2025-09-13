
import { memo, type FC } from 'react';
import ProductsTable from '../components/ProductsTable';

const AllProducts:FC = () => {

  return (
    <ProductsTable/>
  );
};

export default memo(AllProducts);

