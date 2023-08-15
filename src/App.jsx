import Home from "./views/Home/Home";
import Simple from "./views/Detail/Detail"
import Form from "./views/Form/Form";
import Admin from "./views/Admin/Admin";
import Edit from "./views/Edit/Edit"
import Update from "./views/Update/Update"
import { createBrowserRouter, RouterProvider, Route, Link } from "react-router-dom";
import Cart2 from "./views/Cart/Cart2";
import OrdersData from "./components/Orders";
import Payment from "./views/Pago/Pago"
import UserProfile from "./views/UserDataFormOverlay(temporary)/UserProfile";
import UsersData from "./components/Users"
import LoginAndSign from "./views/UserDataFormOverlay(temporary)/LoginAndSign";
import MyShopping from "./views/Mis Compras/MyShopping";


const router = createBrowserRouter([
    {
        path:"/",
        element: <Home />,
    },
    {
        path:"/detail/:id",
        element: <Simple />,
    },
    {
        path:"/form",
        element: <Form />,
    },
    {
        path:"/cart",
        element: <Cart2/>,
    }, 

    {   path:"/admin",
        element: <Admin />,
    },
    {   path:"/admin/orders",
        element: <OrdersData/>,
    },
    {   path:"/admin/users",
        element: <UsersData/>,
    },
    {
        path:"/edit",
        element: <Edit />,
    },
    {
        path:"/edit/:id",
        element: <Update />,
    },
    {
        path:"/payment",
        element: <Payment />,
    },
    {
        path:"/Profile",
        element: <UserProfile/>
    },
    {
        path:"/login",
        element: <LoginAndSign/>
    },
    {
        path:"/shopping",
        element: <MyShopping/>
    }

]);

function App() {
    return (
        <div className="App">
            <RouterProvider router={router} />
        </div>
    );
}

export default App;