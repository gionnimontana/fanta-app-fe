import { AppScreen } from "../../components/generalUI/appScreen/AppScreen";
import s from "./ByeByePage.module.css"

const ByeHeader = <div className={s.header}>☠️🤖☠️</div>

export const ByeByePage = () => {
    return (
        <AppScreen header={ByeHeader}>
            <div className={s.iconBox}>
                <div className={s.iconBoxContent}>
                    Non piangere perché è finito, sorridi perché è successo
                </div>
            </div>
        </AppScreen>
    )
}