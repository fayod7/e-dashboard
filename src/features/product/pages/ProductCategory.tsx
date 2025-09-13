import { memo, useState, type FC } from 'react';
import { useCategory } from '../service/useCategory';
import { Button, Input, Modal, Form } from 'antd';
import { Pencil, Plus, Trash } from 'lucide-react';
import type { FormProps } from 'antd';

interface ICategory{
  id: number
  name: string
}

type FieldType = {
  name: string
};

const ProductCategory:FC = () => {
  const [form] = Form.useForm(); 
  const { getAllCategories, createMutation, deleteMutation, updateMutation } = useCategory()
  const { data } = getAllCategories()
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [editingCategory, setEditingCategory] = useState<any>(null)
  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
    form.resetFields();
    setEditingCategory(null);
  };
  const handleDelete = (id: number) => {
    deleteMutation.mutate(id)
  }
  const handleUpdate = (category: any) => {
    setEditingCategory(category)
    form.setFieldsValue({ name: category.name });
    setIsModalOpen(true);
  }
  const onFinish: FormProps<FieldType>['onFinish'] = (values) => {
    if(editingCategory) {
      updateMutation.mutate({id: editingCategory.id, ...values}, {
        onSuccess: () => {
            handleCancel();
            setEditingCategory(null);
        }
      }  )
    } else {
       createMutation.mutate(values, {
    onSuccess: () => {
      handleCancel()
    }
  })
    }
};
  return (
    <div className="w-full px-4 py-5">
              <div className='flex justify-between w-full items-center mb-2' >
                <h2 className='font-semibold'>Category Management</h2>
                <Button onClick={showModal} type='primary' ghost> <Plus className='size-4'/>Add Category</Button>
                </div>
              <table className='min-w-full divide-y divide-gray-200 border border-gray-200 '>
        <thead className='bg-gray-100 shadow-sm'>
          <tr>
             <th className='px-7 py-4 text-left text-[18px] font-semibold text-gray-700 '>№</th>    
                <th className='px-4 py-4 text-left text-[18px] font-semibold text-gray-700 '>Category Name</th>
                <th className='px-4 py-4 text-left text-[18px] font-semibold text-gray-700 '>Update</th>
                <th className='px-4 py-4 text-left text-[18px] font-semibold text-gray-700 '>Delete</th>
          </tr>
        </thead>
        <tbody className='bg-white divide-y divide-gray-200'>
          {
            data?.data?.map((category: ICategory, inx: number) => (
               <tr key={category.id} className={`hover:bg-gray-50 duration-200 hover:shadow-sm ${ inx  % 2 === 0 ? 'bg-gray-100' : 'bg-white' }`}>
                <td className='px-7 py-3 text-[18px] text-gray-700'>{inx}</td>
                <td className='px-4 py-3 text-[18px] text-gray-700 flex-1 w-full'>
                      {category.name}                  
                </td>
                <td className='px-4 py-3'>
                  <Button onClick={() => handleUpdate(category)} type='primary' ghost>
                   <Pencil className='size-4' /> Update
                    </Button>
                </td>
                <td className='px-4 py-3'>
                  <Button onClick={() => handleDelete(category.id)} danger>
                  <Trash className='size-4'/>  Delete
                    </Button>
                </td>
            </tr>
            ))
          }
        </tbody>
      </table>
       <Modal
        title={editingCategory ? "Update Category" : "Add Category"}
        open={isModalOpen}
        onCancel={handleCancel}
        footer={null}
      >
    <Form
    name="basic"
    autoComplete="off"
    layout='vertical'
    form={form}
    onFinish={onFinish}
  >
    <Form.Item<FieldType>
      label="Input category name"
      name="name"
      rules={[{ required: true, message: 'Input category name' }]}
    >
      <Input />
    </Form.Item>

     <Form.Item label={null}>
            <Button
              type="primary"
              htmlType="submit"
            
            >
             {editingCategory ? "Update" : "Create"}
            </Button>
          </Form.Item>

  </Form>
      </Modal>
    </div>
  );
};

export default memo(ProductCategory);