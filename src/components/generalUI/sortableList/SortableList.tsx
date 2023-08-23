import { useState } from "react";
import { arrayMove } from "./utils";
import Draggable from "./Draggable";

export interface DraggableItem {
  id: string;
  name: string;
}

interface Props {
  items: DraggableItem[]
  setItems: (items: DraggableItem[]) => void
  component: (item: DraggableItem[]) => JSX.Element
}

export const SortableList = ({ items, setItems, component }: Props) => {
  const [dragId, setDragId] = useState<string>("");

  const onDrop = (toId: string, fromId?: string, i?: DraggableItem[]) => {
    let currentPos = 0
    let droppedPos = 0
    const itm = i ? i : items
    for (let i = 0; i < itm.length; i++) {
      const from = fromId ? fromId : dragId
      if (from == itm[i].id) {
        currentPos = i;
      }
      if (toId == itm[i].id) {
        droppedPos = i;
      }
    }
    const newItems = arrayMove([...itm], currentPos, droppedPos);
    setItems(newItems);
  };

  const renderComponent = (componentJsx: any, item: DraggableItem, index: number) => {
    const Component = componentJsx;
    return <Component item={item} index={index} />;
  };

  return (
    <>
      {items.map((item, index) => (
        <Draggable
          key={index}
          id={item.id}
          onDrop={onDrop}
          setDragId={setDragId}
          item={item}
          items={items}
        >
          {renderComponent(component, item, index)}
        </Draggable>
      ))}
    </>
  );
};

