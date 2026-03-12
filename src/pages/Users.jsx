import { useState, useEffect } from 'react'
import { fetchUsers } from '../services/api'
import DataTable from '../components/DataTable/DataTable'
import SearchBar from '../components/SearchBar/SearchBar'
import AddUserModal from '../components/AddUserModal/AddUserModal'
import { RiUserAddLine, RiTeamLine, RiUserCheckLine, RiUserFollowLine } from 'react-icons/ri'
import styles from './Users.module.css'

function Users() {
  const [users, setUsers] = useState([])
  const [search, setSearch] = useState('')
  const [loading, setLoading] = useState(true)
  const [showModal, setShowModal] = useState(false)

  useEffect(() => {
    fetchUsers().then(data => {
      setUsers(data)
      setLoading(false)
    }).catch(() => setLoading(false))
  }, [])

  const filtered = users.filter(u =>
    u.name?.toLowerCase().includes(search.toLowerCase()) ||
    u.email?.toLowerCase().includes(search.toLowerCase())
  )

  return (
    <div className={styles.page}>
      <div className={styles.statsRow}>
        {[
          { icon: RiTeamLine, label: 'Total Users', value: users.length, color: 'amber' },
          { icon: RiUserCheckLine, label: 'Active', value: Math.floor(users.length * 0.8), color: 'teal' },
          { icon: RiUserFollowLine, label: 'New This Month', value: 3, color: 'blue' },
        ].map(s => (
          <div key={s.label} className={`${styles.stat} ${styles[s.color]}`}>
            <s.icon className={styles.statIcon} />
            <div>
              <div className={styles.statValue}>{s.value}</div>
              <div className={styles.statLabel}>{s.label}</div>
            </div>
          </div>
        ))}
      </div>

      <div className={styles.panel}>
        <div className={styles.panelHeader}>
          <div>
            <h2 className={styles.title}>All Users</h2>
            <p className={styles.sub}>{filtered.length} results</p>
          </div>
          <div className={styles.panelActions}>
            <SearchBar value={search} onChange={setSearch} />
            <button className={styles.addBtn} onClick={() => setShowModal(true)}>
              <RiUserAddLine /> <span>Add User</span>
            </button>
          </div>
        </div>

        {loading ? (
          <div className={styles.loading}>Loading users...</div>
        ) : (
          <DataTable users={filtered} onDelete={id => setUsers(p => p.filter(u => u.id !== id))} />
        )}
      </div>

      {showModal && (
        <AddUserModal
          onClose={() => setShowModal(false)}
          onAdd={u => setUsers(p => [u, ...p])}
        />
      )}
    </div>
  )
}

export default Users
