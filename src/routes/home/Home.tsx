import { routes } from "../../constants/routes";
import { Navigate } from "react-router-dom";

export const Home = () => {
    localStorage.setItem('fba_current_league', 'ernyanuus7tdszx')
    return <Navigate to={routes.Calendar.replace(':id', '').replace(':league', 'ernyanuus7tdszx')}/>
}