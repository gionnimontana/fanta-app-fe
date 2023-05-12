import { pb } from "../../../helpers/pb"
import { Match } from "types/matches"
import { LinkIconButton } from "../../../components/generalUI/linkIconButton/LinkIconButton"
import { useState } from "react"
import { Login } from "../../../components/login/Login"

interface Props {
  match: Match
}

export const EditFormButton = ({ match }: Props) => {
  const [showLogin, setShowLogin] = useState<boolean>(false)
  const isAuthenticated = pb.authStore.isValid

  return (
    <>
      {isAuthenticated
        ? <LinkIconButton link="edit"/>
        : <LinkIconButton link="login" onClick={() => setShowLogin(true)}/>
      }
      {showLogin ? <Login onClose={() => setShowLogin(false)}/> : null}
    </>
  )
}