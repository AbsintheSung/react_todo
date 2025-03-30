import { createBrowserRouter } from "react-router-dom";
// import App from "./App";
import Register from "./pages/register/index";
import Login from "./pages/login/index";
import Home from "./pages/home/index";

const Router = createBrowserRouter([
  {
    path: '/',
    element: <Home />,
  },
  {
    path: 'login',
    element: <Login />,
  },
  {
    path: 'register',
    element: <Register />,
  },
])

export default Router;