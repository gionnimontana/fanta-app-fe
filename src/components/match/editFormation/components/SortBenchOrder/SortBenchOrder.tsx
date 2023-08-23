import { useState } from 'react';
import {SortableList} from '../../../../../components/generalUI/sortableList/SortableList';
import s from '../../../../../components/generalUI/sortableList/styles.module.css';

export const SortBenchOrder = () => {
  const [items, setItems] = useState([
    {
      name: "Item 1",
      id: 1
    },
    {
      name: "Item 2",
      id: 2
    },
    {
      name: "Item 3",
      id: 3
    }
  ]);
  
  const DragComponent = ({ item, index }: any) => {
    return (
      <div className={s.animationMove} style={{ border: "1px dotted #ccc" }}>
        <h2>{item.name}</h2>
        <p>Index - {index}</p>
      </div>
    );
  };

  return (
    <div>
      <SortableList
        items={items}
        setItems={setItems}
        component={DragComponent}
      />
    </div>
  );
}