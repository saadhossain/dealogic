import { createBrowserRouter } from "react-router-dom";
import DashboardLayout from "../Layout/DashboardLayout";
import Main from "../Layout/Main";
import AddProducts from "../Pages/AddProducts/AddProducts";
import AllProducts from "../Pages/AllProducts/AllProducts";
import AllUsers from "../Pages/AllUsers/AllUsers";
import Blogs from "../Pages/Blogs/Blogs";
import BookedProducts from "../Pages/BookedProducts/BookedProducts";
import Dashboard from "../Pages/Dashboard/Dashboard";
import Home from "../Pages/Home/Home";
import Login from "../Pages/Login/Login";
import MyProudcts from "../Pages/MyProudcts/MyProudcts";
import MyPurchase from "../Pages/MyPurchase/MyPurchase";
import Products from "../Pages/Products/Products";
import Register from "../Pages/Register/Register";
import AdminRouter from "./AdminRouter";
import BuyerRouter from "./BuyerRouter";
import PrivateRouter from "./PrivateRouter";
import SellerRouter from "./SellerRouter";

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
                path: '/dashboard/addProduct',
                element: <AddProducts></AddProducts>
            },
            {
                path: '/dashboard/allproducts',
                element: <AdminRouter><AllProducts></AllProducts></AdminRouter>
            },
            {
                path: '/dashboard/allusers',
                element: <AdminRouter><AllUsers></AllUsers></AdminRouter>
            },
            {
                path: '/dashboard/bookedproducts',
                element: <AdminRouter><BookedProducts></BookedProducts></AdminRouter>
            },
            {
                path: '/dashboard/mypurchase',
                element: <BuyerRouter><MyPurchase></MyPurchase></BuyerRouter>
            },
            {
                path: '/dashboard/myproducts',
                element: <SellerRouter><MyProudcts></MyProudcts></SellerRouter>
            }
        ]
    }
])