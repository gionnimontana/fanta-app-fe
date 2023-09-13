import { pb } from "../../../helpers/pb"
import { Match } from "../../../types/matches"
import { LinkIconButton } from "../../../components/generalUI/linkIconButton/LinkIconButton"
import { useState } from "react"
import { Login } from "../../../components/login/Login"
import { EditFormationWrapper } from "./EditFormationWrapper"
import { getAuthUserTeamId, matchDayHasBegun, userCanEditMatch } from "../../../helpers"
import { MatchDayTS } from "types/utils"
import { Team } from "../../../types/teams"
import { useParams } from "react-router-dom"

interface Props {
  match: Match
  matchDayTS: MatchDayTS[]
  teams: Team[]
}

export const EditFormButton = ({ match, matchDayTS, teams }: Props) => {
  const { league } = useParams()
  const [showLogin, setShowLogin] = useState<boolean>(false)
  const [edit, setEdit] = useState<boolean>(false)
  const isAuthenticated = pb.authStore.isValid
  const userTeamId = getAuthUserTeamId(league)
  const userTeam = (teams || []).find(team => team.id === userTeamId)
  const matchDayHasStarted = matchDayHasBegun(match.day, matchDayTS)
  const canEdit = userCanEditMatch(match, userTeamId, matchDayHasStarted)

  return (
    <>
      {isAuthenticated
        ? canEdit 
            ? <LinkIconButton links={["edit"]} onClick={() => setEdit(true)}/>
            : null
        : <LinkIconButton links={["login"]} onClick={() => setShowLogin(true)}/>
      }
      {showLogin ? <Login onClose={() => setShowLogin(false)}/> : null}
      {edit 
        ? <EditFormationWrapper 
            onClose={() => setEdit(false)} 
            match={match} 
            matchDayHasStarted={matchDayHasStarted}
            team={userTeam}
          /> 
        : null
      }
    </>
  )
}