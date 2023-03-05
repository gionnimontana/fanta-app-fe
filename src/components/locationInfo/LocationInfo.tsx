import { RMLocation } from '../../types/locations'
import s from './LocationInfo.module.css'

interface Props {
    location: RMLocation
}

export const LocationInfo = ({ location }: Props) => {
    return (
        <div className={s.mainBlock}>
            <div className={s.infoBlockTitle}>Location</div>
            <div className={s.infoDuple}>
                <div className={s.infoTitle}>Name:</div>
                <div className={s.infoValue}>{location.name}</div>
            </div>
            <div className={s.infoDuple}>
                <div className={s.infoTitle}>Type:</div>
                <div className={s.infoValue}>{location.type}</div>
            </div>
            <div className={s.infoDuple}>
                <div className={s.infoTitle}>Dimension:</div>
                <div className={s.infoValue}>{location.dimension}</div>
            </div>
            <div className={s.infoDuple}>
                <div className={s.infoTitle}>Residents:</div>
                <div className={s.infoValue}>{location.residents.length}</div>
            </div>
        </div>
    )
}

