import { Team } from '../../../../../types/teams'
import s from './EditFormationHeader.module.css'

interface Props {
  setBotMode: (botMode: boolean) => void
  botMode: boolean
  team: Team
  module: string
}

export const EditFormationHeader = ({ setBotMode, team, botMode, module }: Props) => {
  return (
    <div 
        className={s.header}
        onClick={() => setBotMode(!botMode)}
    >
        <p className={s.emoji}>{team.emoji}</p>
        <button 
            className={s.headerText}
            onClick={() => setBotMode(!botMode)}
        >
            {botMode 
                ? 'BotMode'
                : module
            }
        </button>
        <p className={s.emoji}>{team.emoji}</p>
    </div>
  )
}