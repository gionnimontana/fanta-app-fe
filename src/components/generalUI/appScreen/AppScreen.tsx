import { FullPageLoader } from '../fullPageLoader/FullPageLoader';
import s from './AppScreen.module.css'

interface Props {
    children: React.ReactNode
    loading?: boolean
    header?: React.ReactNode | string
}

export const AppScreen = ({ children, loading, header }: Props) => {
    const cn = header ? s.container : s.containerNoHeader
    return (
        <div className={s.outer}>
            {header ? <div className={s.header}>{header}</div> : null}
            <div className={cn}>
                {loading ? (
                    <div className={s.loader}><FullPageLoader/></div>
                ): (
                    children
                )}
            </div>
        </div>
    );
}