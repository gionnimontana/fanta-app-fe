import s from './Select.module.css'

interface Props {
  value: string;	
  onChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
  options: { value: string, name: string}[];
  label?: string;
}

export const Select = ({ value, label, options, onChange }: Props) => {
    return (
      <div className={s.container}>
        {label && <div className={s.label}>{label}</div>}
        <select value={value}  onChange={onChange} className={s.select}>
          {options.map((o) => (
            <option key={o.value} value={o.value}>
              {o.name}
            </option>
          ))}
        </select>
      </div>
    )
}