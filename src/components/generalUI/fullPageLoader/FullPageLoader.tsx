import logo from 'images/logo_min.png'
import s from './FullPageLoader.module.css'

const FullPageLoader = () => {
  return (
    <div className={s.container}>
      <div className={s.ldsring}><div></div><div></div><div></div><div></div></div>
    </div>
  )
}

export default FullPageLoader