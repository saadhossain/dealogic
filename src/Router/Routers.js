import { createBrowserRouter } from "react-router-dom";
import DashboardLayout from "../Layout/DashboardLayout";
import Main from "../Layout/Main";
import AddProducts from "../Pages/AddProducts/AddProducts";
import Blogs from "../Pages/Blogs/Blogs";
import Dashboard from "../Pages/Dashboard/Dashboard";
import Home from "../Pages/Home/Home";
import Login from "../Pages/Login/Login";
import MyProudcts from "../Pages/MyProudcts/MyProudcts";
import MyPurchase from "../Pages/MyPurchase/MyPurchase";
import Products from "../Pages/Products/Products";
import Register from "../Pages/Register/Register";
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
                loader: ({ params }) => fetch(`http://localhost:5000/products/${params.category}`),
                element: <PrivateRouter><Products></Products></PrivateRouter>
            },
            {
                path: '/login',
                element: <Login></Login>
            },
            {
                path: '/register',
                element: <Register></Register>
            },
            {
                path: '/blogs',
                element: <Blogs></Blogs>
            }
        ]
    },

    //User dashboard routes
    {
        path: '/dashboard',
        element: <PrivateRouter><DashboardLayout></DashboardLayout></PrivateRouter>,
        children: [
            {
                path: '/dashboard',
                element: <Dashboard></Dashboard>
            },
            {
                path: '/dashboard/allproducts',
                element: <AddProducts></AddProducts>
            },
            {
                path: '/dashboard/addProduct',
                element: <AddProducts></AddProducts>
            },
            {
                path: '/dashboard/mypurchase',
                element: <MyPurchase></MyPurchase>
            },
            {
                path: '/dashboard/myproducts',
                element: <MyProudcts></MyProudcts>
            }
        ]
    }
])