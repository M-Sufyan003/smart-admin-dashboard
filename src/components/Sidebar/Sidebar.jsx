import { NavLink } from 'react-router-dom'
import { useEffect, useRef } from 'react'
import {
  RiDashboardLine,
  RiUserLine,
  RiTaskLine,
  RiBarChartLine,
  RiSettingsLine,
  RiPulseLine,
  RiCloseLine
} from 'react-icons/ri'
import ScrollReveal from 'scrollreveal'
import styles from './Sidebar.module.css'

const navItems = [
  { path: '/', icon: RiDashboardLine, label: 'Dashboard' },
  { path: '/users', icon: RiUserLine, label: 'Users' },
  { path: '/tasks', icon: RiTaskLine, label: 'Tasks' },
  { path: '/reports', icon: RiBarChartLine, label: 'Reports' },
  { path: '/settings', icon: RiSettingsLine, label: 'Settings' },
]

function Sidebar({ isOpen, onClose }) {
  const itemsRef = useRef([])

  useEffect(() => {
    const sr = ScrollReveal({ reset: false, distance: '20px', duration: 500, easing: 'ease' })
    itemsRef.current.forEach((el, i) => {
      if (el) sr.reveal(el, { delay: 100 + i * 60, origin: 'left' })
    })
    return () => sr.destroy()
  }, [])

  return (
    <aside className={`${styles.sidebar} ${isOpen ? styles.open : ''}`}>
      <div className={styles.header}>
        <div className={styles.brand}>
          <div className={styles.brandIcon}>
            <RiPulseLine />
          </div>
          <div className={styles.brandText}>
            <span className={styles.brandName}>Smart</span>
            <span className={styles.brandSub}>Admin</span>
          </div>
        </div>
        <button className={styles.closeBtn} onClick={onClose}>
          <RiCloseLine />
        </button>
      </div>

      <div className={styles.section}>
        <span className={styles.sectionLabel}>Menu</span>
        <nav className={styles.nav}>
          {navItems.map((item, i) => (
            <NavLink
              key={item.path}
              to={item.path}
              end={item.path === '/'}
              className={({ isActive }) =>
                `${styles.navItem} ${isActive ? styles.active : ''}`
              }
              onClick={onClose}
              ref={el => itemsRef.current[i] = el}
            >
              <span className={styles.navIcon}><item.icon /></span>
              <span className={styles.navLabel}>{item.label}</span>
              <span className={styles.navIndicator} />
            </NavLink>
          ))}
        </nav>
      </div>

      <div className={styles.footer}>
        <div className={styles.statusDot} />
        <span className={styles.statusText}>All systems operational</span>
      </div>
    </aside>
  )
}

export default Sidebar
