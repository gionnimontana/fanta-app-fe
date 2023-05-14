import { AppScreen } from '../appScreen/AppScreen'
import s from './Modal.module.css'

interface Props {
    children: React.ReactNode
    onClose?: () => void
    loading?: boolean
}

export const Modal = ({ children, onClose, loading }: Props) => {
    return (
        <div className={s.container}>
            <AppScreen loading={loading}>
                {onClose 
                    ? (
                        <button 
                            onClick={onClose} 
                            className={s.closeButton}
                        >
                            X
                        </button> 
                        )
                    : null
                }
                {children}
            </AppScreen>
        </div>
    )
}