import { Episode } from '../../types/episodes'
import s from './EpisodeInfo.module.css'

interface Props {
    episodes: Episode[]
}

export const EpisodeInfo = ({ episodes }: Props) => {
    return (
        <div className={s.mainBlock}>
            <div className={s.infoBlockTitle}>Episodes</div>
            {episodes.map((episode) => (
                <div className={s.infoTitle}>{episode.name}</div>
            ))}
        </div>
    )
}

