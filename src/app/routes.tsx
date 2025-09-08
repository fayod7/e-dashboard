import { lazy } from "react"
import { useRoutes } from "react-router-dom"
const DashboardLayout = lazy(()=> import("../layout/DashboardLayout"))
const Auth = lazy(()=> import("../features/auth/pages/Auth"))
const Register = lazy(()=> import("../features/auth/pages/Register"))
const Login = lazy(()=> import("../features/auth/pages/Login"))
const Statistics = lazy(()=> import("../features/statistic/pages/Statistics"))
const Users = lazy(()=> import("../features/user/pages/Users"))
const Products = lazy(()=> import("../features/product/pages/Products"))

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
                  element: <Products/>
                },
              ]
            }
        ]},
        {path: "/login", element: <Login/>},
        {path: "/register", element: <Register/>}
    ])
  )
}

export default AppRoutes