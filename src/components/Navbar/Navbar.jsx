import { useLocation } from 'react-router-dom'
import { RiMenuLine, RiSunLine, RiMoonLine, RiNotification3Line, RiUserSmileLine } from 'react-icons/ri'
import { useTheme } from '../../App'
import styles from './Navbar.module.css'

const pageTitles = {
  '/': 'Dashboard',
  '/users': 'Users',
  '/tasks': 'Tasks',
  '/reports': 'Reports',
  '/settings': 'Settings',
}

function Navbar({ onMenuToggle }) {
  const { theme, toggleTheme } = useTheme()
  const location = useLocation()
  const title = pageTitles[location.pathname] || 'Dashboard'
  const today = new Date().toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric' })

  return (
    <header className={styles.navbar}>
      <div className={styles.left}>
        <button className={styles.menuBtn} onClick={onMenuToggle} aria-label="Toggle menu">
          <RiMenuLine />
        </button>
        <div className={styles.titleArea}>
          <h1 className={styles.title}>{title}</h1>
          <span className={styles.date}>{today}</span>
        </div>
      </div>

      <div className={styles.right}>
        <button
          className={styles.iconBtn}
          onClick={toggleTheme}
          aria-label="Toggle theme"
          title={theme === 'light' ? 'Switch to dark mode' : 'Switch to light mode'}
        >
          {theme === 'light' ? <RiMoonLine /> : <RiSunLine />}
        </button>

        <button className={styles.iconBtn} aria-label="Notifications">
          <RiNotification3Line />
          <span className={styles.badge}>3</span>
        </button>

        <div className={styles.avatar}>
          <RiUserSmileLine />
          <div className={styles.avatarOnline} />
        </div>
      </div>
    </header>
  )
}

export default Navbar
