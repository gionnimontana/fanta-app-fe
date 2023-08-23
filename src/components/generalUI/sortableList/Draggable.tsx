import { useEffect } from "react";
import { DraggableItem } from "./SortableList";

type Props = {
  id: string;
  children: React.ReactNode;
  item: DraggableItem;
  setDragId: (id: string) => void;
  onDrop: (toId: string, fromId?: string, items?: DraggableItem[]) => void;
  items?: DraggableItem[];
};

export default function Draggable({ children, id, item , setDragId, onDrop, items}: Props) {

  useEffect(() => {
    const target = document.getElementById(id);
    const touchend = (e: any) => {
      var changedTouch = e.changedTouches[0];
      var elem = document.elementFromPoint(changedTouch.clientX, changedTouch.clientY)
      if (elem) onDrop(elem.id, e.target.id, items)
    }
    if (target) {
      target.addEventListener("touchend", touchend, { passive: false })
    }
    return () => {
      if (target) {
        target.removeEventListener("touchend", touchend)
      }
    };
  }, [items])

  const handleDrag = (ev: any) => setDragId(item.id)
  const handleDrop = (ev: any) => onDrop(ev.currentTarget.id)

  return (
    <div
      draggable={true}
      id={id}
      onDragOver={(ev) => ev.preventDefault()}
      onDragStart={handleDrag}
      onDrop={handleDrop}
    >
      {children}
    </div>
  );
}
