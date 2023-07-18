import s from './LoadingButton.module.css'

interface ButtonProps {
  loading: boolean;
  children?: string | React.ReactNode;
  onClick?: () => void;
  className?: string
}

export const LoadingButton: React.FC<ButtonProps> = ({ loading, children, onClick, className }) => {
  return (
    <button 
        onClick={loading ? undefined : onClick}
        disabled={loading}
        className={className}
    >
      {loading ? <div className={s.spinner}></div> : children}
    </button>
  );
}

