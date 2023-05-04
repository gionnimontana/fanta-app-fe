import s from "./MatchArticle.module.css"

interface Props {
    day?: number
    article?: string
}

export const MatchArticle = ({ day, article }: Props) => {

    if (!day || !article) return null

    return (
        <div className={s.articlecontainer}>
            <div className={s.title}>Commento tecnico giornata {day}</div>
            <div className={s.articleText}>
                {article}
            </div>
        </div>
    )
}