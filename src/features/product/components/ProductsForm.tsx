import { memo, useState, type Dispatch, type FC, type SetStateAction } from 'react';
import { Button, Form, Input, Select, Upload, type FormProps } from 'antd';
import { useCategory } from '../service/useCategory';
import { useProduct } from '../service/useProduct';
import type { UploadFile, UploadProps } from "antd";
type FieldType = {
    title: string;
    description: string;
    price: string;
    stock: string;
    brand?: string;
    images?: string[]; 
    categoryId: string;

};

interface Props {
    setIsModalOpen: Dispatch<SetStateAction<boolean>>
}

const ProductsForm:FC<Props> = ( { setIsModalOpen } ) => {
     const [fileList, setFileList] = useState<UploadFile[]>([]);
  const [files, setFiles] = useState<File[]>([]); // mana shuni sizlar backendga yuborasizlar avval Array.from qilib

  console.log({fileList, files});
    const images = files && Array.from(files)
  const handleChange: UploadProps["onChange"] = ({ fileList: newFileList }) => {
    setFileList(newFileList);
    const fList = newFileList
      .map((file) => file.originFileObj as File)
      .filter(Boolean);
    setFiles(fList);
  };

  const uploadButton = (
    <button style={{ border: 0, background: "none" }} type="button">
      +<div style={{ marginTop: 8 }}>Upload</div>
    </button>
  )
     const [form] = Form.useForm(); 
    const { getAllCategories } = useCategory()
    const { createProductMutation } = useProduct()
    const { data } = getAllCategories()
    const categories = data?.data?.map((item:any) => ({value: item.id, label: item.name}))

      const onFinish: FormProps<FieldType>['onFinish'] = (values) => {
        const formData = new FormData()
        formData.append('title', values.title)
        formData.append('price', values.price)
        formData.append('brand', values?.brand || '')
        formData.append('description', values.description)
        formData.append('categoryId', values.categoryId)
        formData.append('stock', values.stock)
        images?.forEach((item:any) =>(
            formData.append('images', item)
        ))

        createProductMutation.mutate(formData)
        setIsModalOpen(false)
    };
    const handleCancel = () => {
      setIsModalOpen(false);
      form.resetFields();
    //   setEditingCategory(null);
    };
  return (
        <Form
    name="basic"
    autoComplete="off"
    layout='vertical'
    form={form}
    onFinish={onFinish}
  >
    <Form.Item<FieldType>
      label="Title"
      name="title"
      rules={[{ required: true, message: `Enter title` }]}
    >
      <Input />
    </Form.Item>

    <Form.Item<FieldType>
      label="Stock"
      name="stock"
      rules={[{ required: true, message: `Enter quantity` }]}
    >
      <Input />
    </Form.Item>
    
    <Form.Item<FieldType>
      label="Price"
      name="price"
      rules={[{ required: true, message: `Enter price` }]}
    >
      <Input />
    </Form.Item>
    <Form.Item<FieldType>
      label="Brand"
      name="brand"
    >
      <Input />
    </Form.Item>
    <Form.Item<FieldType>
      label="Description"
      name="description"
      rules={[{ required: true, message: `Enter description` }]}
    >
      <Input />
    </Form.Item>

    <Form.Item<FieldType>
      label="Category"
      name="categoryId"
      rules={[{ required: true, message: `Enter description` }]}
    >
        <Select
      options={categories}
    />
    </Form.Item>
    <Form.Item<FieldType>
      label="Image"
      name="images"
      rules={[{ required: true, message: `Enter description` }]}
    >
      
    <Upload style={{marginBottom: '10px'}}
          listType="picture-card"
          beforeUpload={() => false}
          fileList={fileList}
          onChange={handleChange}
        >
          {fileList.length >= 8 ? null : uploadButton}
        </Upload>
    </Form.Item>

     <Form.Item className='w-full' label={null}>
            <Button
              type="primary"
              htmlType="submit"
            className='w-full !py-5'
            >
             Submit
            </Button>
          </Form.Item>

        <Button onClick={handleCancel} danger className='w-full !py-5'>Close</Button>
  </Form>
  );
};

export default memo(ProductsForm);