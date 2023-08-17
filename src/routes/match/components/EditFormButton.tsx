import { pb } from "../../../helpers/pb"
import { Match } from "types/matches"
import { LinkIconButton } from "../../../components/generalUI/linkIconButton/LinkIconButton"
import { useState } from "react"
import { Login } from "../../../components/login/Login"
import { EditFormationWrapper } from "./EditFormationWrapper"
import { matchDayHasBegun, userCanEditMatch } from "../../../helpers"
import { MatchDayTS } from "types/utils"

interface Props {
  match: Match
  matchDayTS: MatchDayTS[]
}

export const EditFormButton = ({ match, matchDayTS }: Props) => {
  const [showLogin, setShowLogin] = useState<boolean>(false)
  const [edit, setEdit] = useState<boolean>(false)
  const isAuthenticated = pb.authStore.isValid
  const userTeam = pb.authStore.model?.team
  const matchDayHasStarted = matchDayHasBegun(match.day, matchDayTS)
  const canEdit = userCanEditMatch(match, userTeam, matchDayHasStarted)

  return (
    <>
      {isAuthenticated
        ? canEdit 
            ? <LinkIconButton link="edit" onClick={() => setEdit(true)}/>
            : null
        : <LinkIconButton link="login" onClick={() => setShowLogin(true)}/>
      }
      {showLogin ? <Login onClose={() => setShowLogin(false)}/> : null}
      {edit 
        ? <EditFormationWrapper onClose={() => setEdit(false)} match={match} matchDayHasStarted={matchDayHasStarted}/> 
        : null
      }
    </>
  )
}