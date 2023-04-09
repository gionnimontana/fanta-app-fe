import { FullPageLoader } from '../fullPageLoader/FullPageLoader';
import s from './AppScreen.module.css'

interface Props {
    children: React.ReactNode
    loading?: boolean
}

export const AppScreen = ({ children, loading }: Props) => {
    return (
        <div className={s.outer}>
            <div className={s.container}>
                {loading ? (
                    <div className={s.loader}><FullPageLoader/></div>
                ): (
                    children
                )}
            </div>
        </div>
    );
}