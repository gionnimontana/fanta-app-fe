import { routes } from "../../constants/routes"
import { Select } from "../../components/generalUI/Select/Select"
import { Navigate } from "react-router-dom"
import s from "./Home.module.css"
import { useEffect, useState } from "react"

export const Home = () => {
    const [league, setLeague] = useState<string>('ernyanuus7tdszx')
    const [flag, setFlag] = useState<boolean | null>(null)
    const [currentLeague, setCurrentLeague] = useState<string | null>(null)

    useEffect(() => {
        const cl = localStorage.getItem('fba_current_league')
        setCurrentLeague(cl)
    }, [])

    useEffect(() => {
        if (flag === null) return
        flag 
            ? localStorage.setItem('fba_current_league', league)
            : localStorage.removeItem('fba_current_league')
    }, [flag])

    const redirect = currentLeague

    return (
        redirect 
            ? <Navigate to={routes.Calendar.replace(':id', '').replace(':league', league)}/>
            : (
                <div className={s.container}>
                    <div className={s.center}>
                        <div className={s.header}>🤖 FantaBot 🤖</div>
                        <div className={s.text}>Seleziona una lega</div>
                        <Select
                            value={league}
                            onChange={(e) => setLeague(e.target.value)}
                            options={[
                                { value: 'ernyanuus7tdszx', name: 'Master' },
                                { value: '1bn2o4kzza0ufc1', name: 'Develop'}
                            ]}
                            className={s.select}
                        />
                        <button className={s.goButton} onClick={() => setCurrentLeague(league)}>
                            Vai
                        </button>
                        <button onClick={() => setFlag(f => !f)}>
                            Non chiedermelo più {flag ? '✔️' : '❌'}
                        </button>
                    </div>
                </div>
            )
    )
}