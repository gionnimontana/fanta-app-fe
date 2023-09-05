import s from './Input.module.css';

interface Props {
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  label?: string;
  className?: string;
}

export const Input = ({ onChange, value, label, className }: Props) => {
  const cN = `${s.input} ${className}`;
  return (
    <div className={s.container}>
      {<div className={s.label}>{label}</div>}
      <input value={value} onChange={onChange} className={cN}/>
    </div>
  )
}