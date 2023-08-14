import { Article } from "types/articles"
import s from "./MatchArticle.module.css"

interface Props {
    day?: number
    article?: Article
}

export const MatchArticle = ({ day, article }: Props) => {

    if (!day || !article) return null

    return (
        <div className={s.articlecontainer}>
            <div className={s.title}>{article.title}</div>
            <div className={s.articleText}>
                {article.content}
            </div>
        </div>
    )
}