import s from "./TeamHeaderCard.module.css"

export const TeamHeaderCard = () => {
    return (
        <div className={s.outer}>
            <div className={s.container}>
                <div className={s.card}>
                    <p className={s.rank}>#</p>
                    <p className={s.name}>Name</p>
                    <p className={s.value}>🏆</p>
                    <p className={s.value}>MP</p>
                    <p className={s.value}>W</p>
                    <p className={s.value}>D</p>
                    <p className={s.value}>L</p>
                    <p className={s.value}>💰</p>
                </div>
            </div>
        </div>
    )
}
