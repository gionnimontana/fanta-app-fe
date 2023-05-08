import { useEffect } from 'react'
import s from './PageController.module.css'

interface Props {
    page: number
    setPage: (page: number) => void
    tot: number
}

export const PageController = ({ page, setPage, tot }: Props) => {
    const pages = Array.from({ length: tot }, (_, i) => i + 1)

    useEffect(() => {
        setTimeout(() => {
            document.getElementById('scrollIntoView')?.scrollIntoView({ behavior: "smooth", block: "center", inline: "center" })
        }, 100)
    }, [page, tot])

    return (
        <div className={s.container}>
            {pages.map((p, i) => (
                <button
                    id={p === page ? 'scrollIntoView' : undefined}
                    key={i}
                    className={s.button + ' ' + (p === page ? s.active : '')}
                    onClick={() => setPage(p)}
                >
                    {p}
                </button>
            ))}
        </div>
    )
} 