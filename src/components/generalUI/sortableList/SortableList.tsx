import { useState } from "react";
import { arrayMove } from "./array-move";
import Draggable from "./Draggable";

export interface DraggableItem {
  id: string | number;
}

export interface DraggableItems {
  items: Array<DraggableItem | any>;
  setItems: (items: any) => void;
  children?: React.ReactNode;
  component: (item: any) => JSX.Element;
}

export const SortableList = ({ items, setItems, component }: DraggableItems) => {
  const [dragId, setDragId] = useState("");

  const onDrop = (ev: any, item: any) => {
    let currentPos = 0,
      droppedPos = 0;

    for (let i = 0; i < items.length; i++) {
      if (dragId == items[i].id) {
        currentPos = i;
      }

      if (ev.currentTarget.id == items[i].id) {
        droppedPos = i;
      }
    }

    const newItems = arrayMove([...items], currentPos, droppedPos);
    setItems(newItems);
  };

  const onDragStart = (ev: any, item: any) => {
    setDragId(item.id);
  };

  const renderComponent = (componentJsx: any, item: any, index: number) => {
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
          onDragStart={onDragStart}
          item={item}
        >
          {renderComponent(component, item, index)}
        </Draggable>
      ))}
    </>
  );
};

