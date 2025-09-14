import { lazy } from "react"
import { useRoutes } from "react-router-dom"
const DashboardLayout = lazy(()=> import("../layout/DashboardLayout"))
const Auth = lazy(()=> import("../features/auth/pages/Auth"))
const Register = lazy(()=> import("../features/auth/pages/Register"))
const Login = lazy(()=> import("../features/auth/pages/Login"))
const Otp = lazy(()=> import("../features/auth/pages/Otp"))
const Statistics = lazy(()=> import("../features/statistic/pages/Statistics"))
const Users = lazy(()=> import("../features/user/pages/Users"))
const MyProfile = lazy(()=> import("../features/user/pages/MyProfile"))
const Products = lazy(()=> import("../features/product/pages/Products"))
const AllProducts = lazy(()=> import("../features/product/pages/AllProducts"))
const ProductsCategory = lazy(()=> import("../features/product/pages/ProductCategory"))

const AppRoutes = () => {
  return (
    useRoutes([
        {path: "/", element: <Auth/>, children: [
            { path: '/', 
              element:<DashboardLayout/>,
              children: [
                {
                  index: true,
                  element: <Statistics/>
                },
                {
                  path: 'users',
                  element: <Users/>
                },
                {
                  path: 'products',
                  element: <Products/>,
                  children: [
                    {index: true, element: <AllProducts/>},
                    {path: 'category', element: <ProductsCategory/>},
                  ]
                },
                {
                  path: 'myprofile',
                  element: <MyProfile/>
                }
              ]
            }
        ]},
        {path: "/login", element: <Login/>},
        {path: "/register", element: <Register/>},
        {path: "/otp", element: <Otp/>},
    ])
  )
}

export default AppRoutes