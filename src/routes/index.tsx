import { createBrowserRouter } from "react-router-dom";
import { routes } from "../constants/routes";
import Home from "./home/Home";
import Match from "./match/Match";
import { Team } from "./team/Team";
import { Teams } from "./teams/Teams";
  
export const router = createBrowserRouter([
  {
    path: routes.Home,
    element: <Home/>,
  },
  {
    path: routes.Match,
    element: <Match/>,
  },
  {
    path: routes.Team,
    element: <Team/>,
  },
  {
    path: routes.Teams,
    element: <Teams/>,
  }
]);