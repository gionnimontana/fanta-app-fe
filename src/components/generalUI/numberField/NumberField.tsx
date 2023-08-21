import s from './NumberField.module.css';

interface Props {
    min?: number;
    max?: number;
    value: number;
    onChange: (value: number) => void;
}

export const NumberField = ({ min, max, value, onChange }: Props) => {
  const disableMinus = min !== undefined && value <= min
  const disablePlus = max !== undefined && value >= max

  const onMinusClick = () => {
    if (disableMinus) return
    onChange(value - 1)
  }

  const onPlusClick = () => {
    if (disablePlus) return
    onChange(value + 1)
  }

  const cn = (disable: boolean) => disable ?  `${s.button} ${s.disabled}` : s.button

  return (
    <div className={s.container}>
      <button className={cn(disableMinus)} onClick={onMinusClick}>➖</button>
      <div className={s.value}>{value}</div>
      <button className={cn(disablePlus)} onClick={onPlusClick}>➕</button>
    </div>
  )
}