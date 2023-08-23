import s from "./styles.module.css";

type Props = {
  id: string;
  children: React.ReactNode;
  item: object;
  onDragStart: (event: any, item: any) => void;
  onDrop: (event: any, item: any) => void;
};

export default function Draggable({ children, id, item , onDragStart, onDrop}: Props) {

  const handleDrag = (ev: any) => {
    onDragStart(ev, item);
  };

  const handleDrop = (ev: any) => {
    onDrop(ev, item);
  };

  return (
    <div
      draggable={true}
      id={id}
      onDragOver={(ev) => ev.preventDefault()}
      onDragStart={handleDrag}
      onDrop={handleDrop}
      className={s.animationMove}
    >
      {children}
    </div>
  );
}
