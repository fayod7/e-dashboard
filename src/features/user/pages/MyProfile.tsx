// import { memo, useState } from 'react';
// import { useAuth } from '../../auth/service/useAuth';
// import { Button, Form, Input, Modal, type FormProps } from 'antd';
// import { useUpdateProfile } from '../service/updateProfile';


// type FieldType = {
//    fname: string
//    lname?: string
//    address?: string

// };

// export interface IProfileUser{
//    fname: string
//    lname?: string
//    address?: string
// }

// const MyProfile = () => {
//     const { profileUpdateMutation } = useUpdateProfile()
//     const [form] = Form.useForm(); 
//     const { getProfile } = useAuth()
//     const {data} = getProfile()
//     console.log(data);
//     const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

//       const onFinish: FormProps<FieldType>['onFinish'] = (values) => {
//         profileUpdateMutation.mutate({id: data?.id, body: values})
//         handleCancel()
//       }

//   const showModal = () => {
//     setIsModalOpen(true);
//   };

//   const handleOk = () => {
//     setIsModalOpen(false);
//   };

//   const handleCancel = () => {
//     setIsModalOpen(false);
//   };

//   return (
//   <>
//     <div className="MyProfile">
//       <p>{data?.fname + data?.lname}</p>
//       <p>{data?.email}</p>
//       <p>{data?.address}</p>
//       <Button type="primary" onClick={showModal}>
//         Open Modal
//       </Button>
//       <Modal
//         title="Edit"
//         closable={{ 'aria-label': 'Custom Close Button' }}
//         open={isModalOpen}
//         onOk={handleOk}
//         onCancel={handleCancel}
//         footer={false}
//       >
//             <Form
//     name="basic"
//     autoComplete="off"
//     layout='vertical'
//     form={form}
//     onFinish={onFinish}
//     initialValues={{
//         fname: data?.fname,
//         lnam: data?.lname,
//         address: data?.address
//     }}
//   >
//     <Form.Item<FieldType>
//       label="First Name"
//       name="fname"
//       rules={[{ required: true, message: `Enter First Name` }]}
    
//     >
//       <Input />
//     </Form.Item>

//     <Form.Item<FieldType>
//       label="Last Name"
//       name="lname"
//     >
//       <Input />
//     </Form.Item>
    
//     <Form.Item<FieldType>
//       label="Address"
//       name="address"
     
//     >
//       <Input />
//     </Form.Item>
      
    

//      <Form.Item className='w-full' label={null}>
//             <Button
//               type="primary"
//               htmlType="submit"
//             className='w-full !py-5'
//             >
//              Submit
//             </Button>
//           </Form.Item>

//         <Button onClick={handleCancel} danger className='w-full !py-5'>Close</Button>
//   </Form>
//       </Modal>
//     </div>
//     </>
//   );
// };

// export default memo(MyProfile);