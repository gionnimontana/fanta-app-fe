import { ChangeEvent } from 'react'
import s from './FormComponent.module.css'

interface FormProps {
  text: string;
  setText: (text: string) => void;
  className?: string
  label?: string
  isPassword?: boolean
}

export const FormComponent: React.FC<FormProps> = ({ text, setText, className, label, isPassword }) => {
  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    setText(event.target.value);
  };

  return (
    <form className={className}>
        {label ? <div className={s.label}>{label}</div> : null}
        <input 
            type={isPassword ? 'password' : 'text'}
            value={text}
            onChange={handleChange}
            className={s.input}
        />
    </form>
  );
}

