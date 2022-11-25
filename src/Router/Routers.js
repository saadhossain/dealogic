import { createBrowserRouter } from "react-router-dom";
import DashboardLayout from "../Layout/DashboardLayout";
import Main from "../Layout/Main";
import AddProducts from "../Pages/AddProducts/AddProducts";
import Blogs from "../Pages/Blogs/Blogs";
import Home from "../Pages/Home/Home";
import Login from "../Pages/Login/Login";
import Products from "../Pages/Products/Products";
import Register from "../Pages/Register/Register";
import Sell from "../Pages/Sell/Sell";
import PrivateRouter from "./PrivateRouter";

export const Routers = createBrowserRouter([
    {
        path: '/',
        element: <Main></Main>,
        children: [
            {
                path: '/',
                element: <Home></Home>
            },
            {
                path: '/products/:category',
                loader: ({params}) => fetch(`http://localhost:5000/products/${params.category}`),
                element: <Products></Products>
            },
            {
                path: '/login',
                element: <Login></Login>
            },
            {
                path:'/register',
                element: <Register></Register>
            },
            {
                path: '/blogs',
                element: <Blogs></Blogs>
            },
            {
                path: '/sell',
                element: <PrivateRouter><Sell></Sell></PrivateRouter>
            }
        ]
    },

    //User dashboard routes
    {
        path:'/dashboard',
        element:<DashboardLayout></DashboardLayout>,
        children: [
            {
                path:'/dashboard',
                element: <PrivateRouter><AddProducts></AddProducts></PrivateRouter>
            }
        ]
    }
])