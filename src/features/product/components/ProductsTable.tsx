import { memo, useState, type FC } from 'react';
import { Button, Modal, Select } from 'antd';
import { Pencil, Plus, Trash } from 'lucide-react';
import { useProduct } from '../service/useProduct';
import ProductsForm from './ProductsForm';
import ProductsSkeleton from './ProductsSkeleton';
import { Image } from 'antd';
import { Pagination } from "antd";
import { jwtDecode, type JwtPayload } from "jwt-decode";
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
interface CustomJwtPayload extends JwtPayload {
  id: number;
  role: string
}
const ProductsTable: FC = () => {
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [order, setOrder] = useState<string>('latest')
   const [skip, setSkip] = useState<number>(0);
  const [page, setPage] = useState<number>(1);
  const [limit, setLimit] = useState<number>(8)
  const token = localStorage.getItem('token')
  const decodedValue = jwtDecode<CustomJwtPayload>(token || '')
  
  console.log(decodedValue);
  
  // const [editingCategory, setEditingCategory] = useState<any>(null)
  const { getAllProducts, deleteProductMutation } = useProduct()
  const { data, isLoading } = getAllProducts({ limit, order, skip })
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
  if(isLoading){
    return <ProductsSkeleton/>
  }
  const handleChange = (value: string) => {
    setOrder(value)
  };
  const handlePageChange = (value:number) => {
    const selected = value * limit
    setSkip(selected)
    setPage(value)
  }
  const handleLimitChange = (value: string) => {
    setLimit(Number(value));
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
     <div className='container grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 pt-4'>
          {
            data?.allProducts?.map((product: IProduct) => (
              <div key={product.id} className='bg-white aspect-[3/4] flex flex-col border-gray-200 overflow-hidden group border'>
                <div className='w-full overflow-hidden h-[300px] relative group bg-[#F0EEED]'>
                   {
                    product?.images && product?.images.length > 0 ?
                     <Image
    src={imagesUrl + product?.images?.[0]}
    className="!w-full !h-full object-cover"
    
  />
                      :
                      <div className='w-full grid place-items-center h-full'>
                        <p className='text-center'>No Image</p>
                      </div>
                  }
                </div>
                <div className='flex flex-col gap-1.5 p-4 bg-[#F4F5F7]'>
                     <h3 className="text-lg font-semibold text-gray-900 truncate">
          {product.title}
        </h3>
        <strong className="text-xl">
          {product.price.toLocaleString()} UZS
        </strong>
          <p className="italic">{product?.brand}</p>
           {(decodedValue?.id === product.user?.id || decodedValue?.role === 'owner') && (
  <div className="flex gap-2.5">
    <Button className='w-full' type='primary' ghost>
      <Pencil className='size-4' /> Update
    </Button>
    <Button className='w-full' onClick={() => handleProductDelete(product.id)} danger>
      <Trash className='size-4' /> Delete
    </Button>
  </div>
)}

                </div>
              </div>
            ))
          }
     </div>
              
         <div className='w-full mt-6'> 
          <Pagination total={data?.total} 
          className='custom-pagination'
          onChange={handlePageChange}
          showSizeChanger={false}
          current={page}
          />
         </div>
       
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