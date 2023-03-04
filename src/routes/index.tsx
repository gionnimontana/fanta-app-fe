import { createBrowserRouter } from "react-router-dom";
import { routes } from "../constants/routes";
import Home from "./home/Home";
import Profile from "./profile/Profile";
  
export const router = createBrowserRouter([
  {
    path: routes.Home,
    element: <Home/>,
  },
  {
    path: routes.Profile,
    element: <Profile/>,
  },
]);