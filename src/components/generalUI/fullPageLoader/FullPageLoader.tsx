import s from './FullPageLoader.module.css'

export const FullPageLoader = () => {
  return (
    <div className={s.container}>
      <div className={s.ldsring}><div></div><div></div><div></div><div></div></div>
    </div>
  )
}