import s from './LoadingButton.module.css'

interface ButtonProps {
  loading: boolean;
  children?: string | React.ReactNode;
  onClick?: () => void;
  className?: string
  width?: string;
}

export const LoadingButton: React.FC<ButtonProps> = ({ loading, children, onClick, className, width }) => {
  return (
    <button 
        onClick={loading ? undefined : onClick}
        disabled={loading}
        className={className}
        style={{width: width}}
    >
      <div className={s.container}>
        {loading ? <div className={s.spinner}></div> : children}
      </div>
    </button>
  );
}

