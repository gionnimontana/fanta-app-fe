import { createBrowserRouter } from "react-router-dom";
import { routes } from "../constants/routes";
import { HomeWrapper as Home } from "./home/HomeWrapper";
import { Match } from "./match/Match";
import { Team } from "./team/Team";
import { Teams } from "./teams/Teams";
import { Market } from "./market/Market";
import { PlayerDetail } from "./player/PlayerDetail";
  
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
  },
  {
    path: routes.Market,
    element: <Market/>,
  },
  {
    path: routes.Player,
    element: <PlayerDetail/>,
  }
]);