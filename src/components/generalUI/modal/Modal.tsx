import { AppScreen } from '../appScreen/AppScreen'
import s from './Modal.module.css'

interface Props {
    children: React.ReactNode
    onClose?: () => void
}

export const Modal = ({ children, onClose }: Props) => {
    return (
        <div className={s.container}>
            <AppScreen>
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