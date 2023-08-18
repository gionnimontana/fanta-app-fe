import { useState } from "react";
import { PlayerMap, Purchase } from "../../../types/players";
import { Team } from "../../../types/teams";
import { PlayerTable } from "./PlayerTable";
import { Input } from "../../generalUI/Input/Input";
import { Select } from "../../generalUI/Select/Select";
import s from "./PlayerTable.module.css";

interface Props {
  players: PlayerMap;
  teams: Team[];
  activePurchases: Purchase[];
}

export const PlayerTableWrapper = ({ players, teams, activePurchases }: Props) => {
  const [role, setRole] = useState<string>('all');
  const [team, setTeam] = useState<string>('');
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
            value={search} 
            onChange={(e) => setSearch(e.target.value)}
            label="🔎 (Name / From)"
          />
          <Select
            value={role}
            onChange={(e) => setRole(e.target.value)}
            options={[
              { value: 'all', name: 'All' },
              { value: 'p', name: 'P' },
              { value: 'd', name: 'D' },
              { value: 'c', name: 'C' },
              { value: 'a', name: 'A' },
            ]}
            label="Role"
          />
          <Select
            value={team}
            onChange={(e) => setTeam(e.target.value)}
            options={[
              { value: 'all', name: 'All' },
              { value: '', name: 'Free 🛒' },
              ...teams.map((t) => ({ value: t.id, name: t.name + ' ' + t.emoji })),
            ]}
            label="Team"
          />
      </div>
      <PlayerTable players={filteredPlayers} teams={teams} activePurchases={activePurchases}/>
    </>
  );
}
