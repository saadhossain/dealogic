import { createBrowserRouter } from "react-router-dom";
import BlogDetails from "../Components/BlogsComp/BlogDetails";
import ErrorElements from "../Components/ErrorElements/ErrorElements";
import DashboardLayout from "../Layout/DashboardLayout";
import Main from "../Layout/Main";
import AddProducts from "../Pages/AddProducts/AddProducts";
import AllBuyer from "../Pages/AllBuyer/AllBuyer";
import AllProducts from "../Pages/AllProducts/AllProducts";
import AllSeller from "../Pages/AllSeller/AllSeller";
import AllUsers from "../Pages/AllUsers/AllUsers";
import Blogs from "../Pages/Blogs/Blogs";
import BookedProducts from "../Pages/BookedProducts/BookedProducts";
import Dashboard from "../Pages/Dashboard/Dashboard";
import Home from "../Pages/Home/Home";
import Login from "../Pages/Login/Login";
import MyProudcts from "../Pages/MyProudcts/MyProudcts";
import MyPurchase from "../Pages/MyPurchase/MyPurchase";
import Payment from "../Pages/Payment/Payment";
import CategoryProducts from '../Pages/Products/CategoryProducts';
import PulishBlog from "../Pages/PulishBlog/PulishBlog";
import Register from "../Pages/Register/Register";
import AdminRouter from "./AdminRouter";
import BuyerRouter from "./BuyerRouter";
import PrivateRouter from "./PrivateRouter";
import SellerRouter from "./SellerRouter";
import Products from '../Pages/Products/Products';

export const Routers = createBrowserRouter([
    {
        path: '/login',
        element: <Login></Login>
    },
    {
        path: '/register',
        element: <Register></Register>
    },
    {
        path: '/',
        element: <Main></Main>,
        errorElement: <ErrorElements></ErrorElements>,
        children: [
            {
                path: '/',
                element: <Home></Home>
            },
            {
                path: '/products/:category',
                loader: ({ params }) => fetch(`${process.env.REACT_APP_API}/products/${params.category}`),
                element: <CategoryProducts />
            },
            {
                path: '/blogs',
                element: <Blogs />
            },
            {
                path: '/products',
                element: <Products />
            },
            {
                path: '/blogs/:id',
                loader: ({ params }) => fetch(`${process.env.REACT_APP_API}/blogs/${params.id}`),
                element: <BlogDetails />
            }
        ]
    },

    //User dashboard routes
    {
        path: '/dashboard',
        element: <PrivateRouter><DashboardLayout /></PrivateRouter>,
        errorElement: <ErrorElements />,
        children: [
            {
                path: '/dashboard',
                element: <Dashboard />
            },
            {
                path: '/dashboard/addProduct',
                element: <AddProducts />
            },
            {
                path: '/dashboard/allproducts',
                element: <AdminRouter><AllProducts /></AdminRouter>
            },
            {
                path: '/dashboard/allusers',
                element: <AdminRouter><AllUsers /></AdminRouter>
            },
            {
                path: '/dashboard/buyers',
                element: <AdminRouter><AllBuyer></AllBuyer></AdminRouter>
            },
            {
                path: '/dashboard/sellers',
                element: <AdminRouter><AllSeller /></AdminRouter>
            },
            {
                path: '/dashboard/bookedproducts',
                element: <AdminRouter><BookedProducts /></AdminRouter>
            },
            {
                path: '/dashboard/publishblog',
                element: <AdminRouter><PulishBlog /></AdminRouter>
            },
            {
                path: '/dashboard/mypurchase',
                element: <BuyerRouter><MyPurchase /></BuyerRouter>
            },
            {
                path: '/dashboard/myproducts',
                element: <SellerRouter><MyProudcts /></SellerRouter>
            },
            {
                path: '/dashboard/payment/:id',
                loader: ({ params }) => fetch(`${process.env.REACT_APP_API}/products/${params.id}`),
                element: <Payment></Payment>
            }
        ]
    }
]);