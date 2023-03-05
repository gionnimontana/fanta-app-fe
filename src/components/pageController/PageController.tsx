import s from './PageController.module.css'

interface Props {
    page: number
    setPage: (page: number) => void
    tot: number
}

export const PageController = ({ page, setPage, tot }: Props) => {
    const pages = Array.from({ length: tot }, (_, i) => i + 1)

    return (
        <div className={s.container}>
            {pages.map(p => (
                <button
                    className={s.button + ' ' + (p === page ? s.active : '')}
                    onClick={() => setPage(p)}
                >
                    {p}
                </button>
            ))}
        </div>
    )
} 