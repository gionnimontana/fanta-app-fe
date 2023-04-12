import { Link } from "react-router-dom"
import s from './BottomButton.module.css'

interface Props {
    to: string
    label: string
}

export const BottomButton = ({to, label}: Props) => {
    return (
        <Link to={to} className={s.backbuttonLink}>
            <button className={s.backbutton}>{label}</button>
        </Link>
    );
}