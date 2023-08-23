import { useState } from 'react';
import {DraggableItem, SortableList} from '../../../../../components/generalUI/sortableList/SortableList';
import s from './SortBenchOrder.module.css';
import { PlayerVote, PreMatchFormation } from 'types/matches';

interface Props {
  formation: PreMatchFormation
  setFormation: (formation: PreMatchFormation) => void
}

export const SortBenchOrder = ({ formation, setFormation }: Props) => {
  const benchList = formation.b.map((p, i) => ({ id: p.id, name: p.name, role: p.role }))
  const [items, setItems] = useState<DraggableItem[]>(benchList);
  
  const DragComponent = ({ item, index, role }: any) => {
    return (
      <div className={s.dragComponent} id={item.id}>
        {index + 1}° - <strong>{item.role.toUpperCase()}</strong> - {item.name}
      </div>
    );
  };

  const onSetItems = (items: DraggableItem[]) => {
    const benchers = formation.b
    const benchersSortedOnItemId = items.map(i => benchers.find(b => b.id == i.id)) as PlayerVote[]
    const newFormation = {...formation, b: benchersSortedOnItemId}
    setItems(items)
    setFormation(newFormation)
  }

  return (
    <div>
      <div className={s.header}>👀 Bench order 👀</div>
      <div className={s.subheader}> (drag to edit) </div>
      <div className={s.dragContainer}>
        <SortableList
          items={items}
          setItems={onSetItems}
          component={DragComponent}
        />
      </div>
    </div>
  );
}