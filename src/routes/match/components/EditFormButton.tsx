import { pb } from "../../../helpers/pb"
import { Match } from "types/matches"
import { LinkIconButton } from "../../../components/generalUI/linkIconButton/LinkIconButton"
import { useState } from "react"
import { Login } from "../../../components/login/Login"
import { EditFormationWrapper } from "./EditFormationWrapper"
import { userCanEditMatch } from "../../../helpers"

interface Props {
  match: Match
}

export const EditFormButton = ({ match }: Props) => {
  const [showLogin, setShowLogin] = useState<boolean>(false)
  const [edit, setEdit] = useState<boolean>(false)
  const isAuthenticated = pb.authStore.isValid
  const userTeam = pb.authStore.model?.team
  const canEdit = userCanEditMatch(match, userTeam)

  return (
    <>
      {isAuthenticated
        ? canEdit 
            ? <LinkIconButton link="edit" onClick={() => setEdit(true)}/>
            : null
        : <LinkIconButton link="login" onClick={() => setShowLogin(true)}/>
      }
      {showLogin ? <Login onClose={() => setShowLogin(false)}/> : null}
      {edit ? <EditFormationWrapper onClose={() => setEdit(false)} match={match}/> : null}
    </>
  )
}