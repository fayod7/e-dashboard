import { memo, useState, type FC } from 'react';
import { Button, Modal, Select } from 'antd';
import { Pencil, Plus, Trash } from 'lucide-react';
import { useProduct } from '../service/useProduct';
import ProductsForm from './ProductsForm';

export interface Category {
  id: number;
  name: string;
}

export interface ProductUser {
  id: number;
  fname: string;
  email: string;
  lname?: string;
  address?: string;
}

export interface IProduct {
  id: number;
  title: string;
  description?: string;
  price: number;
  stock?: number;
  brand?: string;
  images?: string[] | undefined;
  createdAt?: string;
  category?: Category | { id?: number; name?: string };
  user?: ProductUser;
}

const ProductsTable: FC = () => {
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [order, setOrder] = useState<string>('latest')
  // const [editingCategory, setEditingCategory] = useState<any>(null)
  const { getAllProducts, deleteProductMutation } = useProduct()
  const { data } = getAllProducts({ limit: 10, order })
  console.log(data);
  const imagesUrl = 'https://api.errorchi.uz/product/image/'
  const showModal = () => {
    setIsModalOpen(true);
  };
  console.log(data);
  const handleProductDelete = (id: number) => {
    deleteProductMutation.mutate(id)
  }
  // const handleUpdate = (category: any) => {
  //   setEditingCategory(category)
  //   // form.setFieldsValue({ name: category.name });
  //   setIsModalOpen(true);
  // }
  const handleChange = (value: string) => {
    setOrder(value)
  };
  return (
    <div className="w-full px-4 py-5">
      <div className='flex justify-between w-full items-center mb-2' >
        <h2 className='font-semibold'>Products Management</h2>
        <Select
          defaultValue="latest"
          className='w-[150px]'
          onChange={handleChange}
          options={[
            { value: 'latest', label: 'Latest' },
            { value: 'expensive', label: 'Expensive' },
            { value: 'cheapest', label: 'Cheapest' },
          ]}
        />
        <Button onClick={showModal} type='primary' ghost> <Plus className='size-4' />Add Product</Button>
      </div>
      <table className='min-w-full divide-y divide-gray-200 border border-gray-200 '>
        <thead className='bg-gray-100 shadow-sm'>
          <tr>
            <th className='px-4 py-4 text-left text-[18px] font-semibold text-gray-700 '>№</th>
            <th className='px-4 py-4 text-left text-[18px] font-semibold text-gray-700 '>Title</th>
            <th className='px-4 py-4 text-left text-[18px] font-semibold text-gray-700 '>Price</th>
            <th className='px-4 py-4 text-left text-[18px] font-semibold text-gray-700 '>Brand</th>
            <th className='px-4 py-4 text-left text-[18px] font-semibold text-gray-700 '>Quantity</th>
            <th className='px-4 py-4 text-left text-[18px] font-semibold text-gray-700 '>Category</th>
            <th className='px-4 py-4 text-left text-[18px] font-semibold text-gray-700 '>Update</th>
            <th className='px-4 py-4 text-left text-[18px] font-semibold text-gray-700 '>Delete</th>
          </tr>
        </thead>
        <tbody className='bg-white divide-y divide-gray-200'>
          {
            data?.allProducts?.map((product: IProduct, inx: number) => (
              <tr key={product.id} className={`hover:bg-gray-50 duration-200 hover:shadow-sm ${inx % 2 === 0 ? 'bg-gray-100' : 'bg-white'}`}>
                <td className='px-4 py-3 text-[18px] text-gray-700'>{inx + 1}</td>
                <td className='px-4 py-3 text-[18px] text-gray-700 line-clamp-1 flex items-center gap-1.5' title={product.title}>
                  {
                    product?.images ?
                      <img className='size-16 bg-white rounded-full border border-b-blue-700 object-cover' src={imagesUrl + product?.images?.[0]} alt="" />
                      :
                      <div className='size-16 bg-gray-300 rounded-full border border-b-blue-700'>
                        <p className='text-center'>No Image</p>
                      </div>
                  }
                  <h2>
                    {product?.title}
                  </h2>
                </td>
                <td className='px-4 py-3 text-[18px] text-gray-700 ' >$ {product?.price}</td>
                <td className='px-4 py-3 text-[18px] text-gray-700 truncate'>{product?.brand}</td>
                <td className='px-4 py-3 text-[18px] text-gray-700'>{product?.stock}</td>
                <td className='px-4 py-3 text-[18px] text-gray-700'>{product?.category?.name}</td>
                <td className='px-4 py-3'>
                  <Button type='primary' ghost>
                    <Pencil className='size-4' /> Update
                  </Button>
                </td>
                <td className='px-4 py-3'>
                  <Button onClick={() => handleProductDelete(product.id)} danger>
                    <Trash className='size-4' />  Delete
                  </Button>
                </td>
              </tr>
            ))
          }
        </tbody>
      </table>
      {
        isModalOpen &&
        <Modal
          title={"Add Category"}
          open={isModalOpen}
          footer={null}
          onCancel={() => setIsModalOpen(false)}
        >
          <ProductsForm setIsModalOpen={setIsModalOpen} />
        </Modal>
      }

    </div>
  );
};

export default memo(ProductsTable);