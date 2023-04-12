import s from './Table.module.css'

interface Props {
    children: React.ReactNode
    minWidth: number
    header?: React.ReactNode
}

export const Table = ({children, minWidth, header}: Props) => {
    return (
        <div className={s.container}>
            {header ? header : null}
            <div className={s.tablecontainer}>
                <div className={s.table} style={{minWidth: `${minWidth}rem`}}>
                    {children}
                </div>
            </div>
        </div>
    )
}