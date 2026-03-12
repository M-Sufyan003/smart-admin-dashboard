import { useState } from 'react'
import { useTheme } from '../App'
import {
  RiUserLine, RiPaletteLine, RiShieldLine,
  RiBellLine, RiGlobalLine, RiCheckLine
} from 'react-icons/ri'
import styles from './Settings.module.css'

function ToggleSwitch({ checked, onChange }) {
  return (
    <button
      className={`${styles.toggle} ${checked ? styles.toggleOn : ''}`}
      onClick={() => onChange(!checked)}
      role="switch"
      aria-checked={checked}
    >
      <span className={styles.toggleThumb} />
    </button>
  )
}

function Settings() {
  const { theme, toggleTheme } = useTheme()
  const [saved, setSaved] = useState(false)
  const [notifications, setNotifications] = useState({
    email: true, push: true, weekly: false, alerts: true
  })
  const [profile, setProfile] = useState({
    name: 'Admin User', email: 'admin@dashboard.io', role: 'Administrator'
  })

  const handleSave = () => {
    setSaved(true)
    setTimeout(() => setSaved(false), 2500)
  }

  return (
    <div className={styles.page}>
      <div className={styles.layout}>
        {/* Profile */}
        <section className={styles.section}>
          <div className={styles.sectionHead}>
            <RiUserLine className={styles.sectionIcon} />
            <div>
              <h2 className={styles.sectionTitle}>Profile</h2>
              <p className={styles.sectionSub}>Manage your account details</p>
            </div>
          </div>
          <div className={styles.fields}>
            {['name', 'email'].map(field => (
              <div key={field} className={styles.field}>
                <label className={styles.label}>{field === 'name' ? 'Full Name' : 'Email Address'}</label>
                <input
                  className={styles.input}
                  value={profile[field]}
                  onChange={e => setProfile(p => ({ ...p, [field]: e.target.value }))}
                />
              </div>
            ))}
            <div className={styles.field}>
              <label className={styles.label}>Role</label>
              <input className={styles.input} value={profile.role} readOnly style={{ opacity: 0.6 }} />
            </div>
          </div>
        </section>

        {/* Appearance */}
        <section className={styles.section}>
          <div className={styles.sectionHead}>
            <RiPaletteLine className={styles.sectionIcon} />
            <div>
              <h2 className={styles.sectionTitle}>Appearance</h2>
              <p className={styles.sectionSub}>Customize your interface</p>
            </div>
          </div>
          <div className={styles.toggleRow}>
            <div>
              <div className={styles.toggleLabel}>Dark Mode</div>
              <div className={styles.toggleSub}>Switch between light and dark theme</div>
            </div>
            <ToggleSwitch checked={theme === 'dark'} onChange={toggleTheme} />
          </div>
        </section>

        {/* Notifications */}
        <section className={styles.section}>
          <div className={styles.sectionHead}>
            <RiBellLine className={styles.sectionIcon} />
            <div>
              <h2 className={styles.sectionTitle}>Notifications</h2>
              <p className={styles.sectionSub}>Control what alerts you receive</p>
            </div>
          </div>
          {[
            { key: 'email', label: 'Email Notifications', sub: 'Receive updates via email' },
            { key: 'push', label: 'Push Notifications', sub: 'In-app real-time alerts' },
            { key: 'weekly', label: 'Weekly Digest', sub: 'Summary of activity each week' },
            { key: 'alerts', label: 'System Alerts', sub: 'Critical system messages' },
          ].map(item => (
            <div key={item.key} className={styles.toggleRow}>
              <div>
                <div className={styles.toggleLabel}>{item.label}</div>
                <div className={styles.toggleSub}>{item.sub}</div>
              </div>
              <ToggleSwitch
                checked={notifications[item.key]}
                onChange={v => setNotifications(n => ({ ...n, [item.key]: v }))}
              />
            </div>
          ))}
        </section>

        {/* Security */}
        <section className={styles.section}>
          <div className={styles.sectionHead}>
            <RiShieldLine className={styles.sectionIcon} />
            <div>
              <h2 className={styles.sectionTitle}>Security</h2>
              <p className={styles.sectionSub}>Account security settings</p>
            </div>
          </div>
          <div className={styles.securityNote}>
            <RiGlobalLine />
            <span>Last login: Today at 09:41 AM from 192.168.1.1</span>
          </div>
          <button className={styles.dangerBtn}>Change Password</button>
        </section>
      </div>

      <div className={styles.footer}>
        <button className={styles.saveBtn} onClick={handleSave}>
          {saved ? <><RiCheckLine /> Saved!</> : 'Save Changes'}
        </button>
      </div>
    </div>
  )
}

export default Settings
