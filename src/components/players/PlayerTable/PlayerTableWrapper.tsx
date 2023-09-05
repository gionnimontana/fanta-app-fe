import { useState } from "react";
import { PlayerMap, Purchase } from "../../../types/players";
import { Team } from "../../../types/teams";
import { PlayerTable } from "./PlayerTable";
import { Input } from "../../generalUI/Input/Input";
import { Select } from "../../generalUI/Select/Select";
import { getLocalStoredFilters, getRoleEmoji, setLocalStoredFilters } from "../../../helpers";
import s from "./PlayerTable.module.css";

interface Props {
  players: PlayerMap;
  teams: Team[];
  activePurchases: Purchase[];
}

export const PlayerTableWrapper = ({ players, teams, activePurchases }: Props) => {
  const lsfilters = getLocalStoredFilters()
  const [role, setRole] = useState<string>(lsfilters['role']);
  const [team, setTeam] = useState<string>(lsfilters['team']);
  const [search, setSearch] = useState<string>('');

  const activePurchaseIds = activePurchases.map((p) => p.player);

  const filteredPlayers = Object.values(players).filter((p) => {
    const roleFilter = role === 'all' ? true : p.role === role;
    const teamFilter = team === 'all' ? true : p.fanta_team === team;
    const searchFilter = p.name.toLowerCase().includes(search.toLowerCase()) || p.team.toLowerCase().includes(search.toLowerCase())
    return roleFilter && teamFilter && searchFilter;
  }).sort((a, b) => b.fvm - a.fvm).sort((a, b) => Number(activePurchaseIds.includes(b.id)) - Number(activePurchaseIds.includes(a.id)));

  return (
    <>
      <div className={s.filterContainer}>
          <Input 
            className={s.input}
            value={search} 
            onChange={(e) => setSearch(e.target.value)}
            label="🔎 (Name / From)"
          />
          <Select
            value={role}
            onChange={setLocalStoredFilters('role', setRole)}
            options={[
              { value: 'all', name: 'All' },
              { value: 'p', name: `${getRoleEmoji("p")}(P)` },
              { value: 'd', name: `${getRoleEmoji("d")}(D)` },
              { value: 'c', name: `${getRoleEmoji("c")}(C)` },
              { value: 'a', name: `${getRoleEmoji("a")}(A)` },
            ]}
            label="Role"
          />
          <Select
            className={s.select}
            value={team}
            onChange={setLocalStoredFilters('team', setTeam)}
            options={[
              { value: 'all', name: 'All' },
              { value: '', name: '🛒 Free' },
              ...teams.map((t) => ({ value: t.id, name: t.emoji + ' ' + t.name })),
            ]}
            label="Team"
          />
      </div>
      <PlayerTable players={filteredPlayers} teams={teams} activePurchases={activePurchases}/>
    </>
  );
}
