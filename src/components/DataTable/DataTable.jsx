import { useEffect, useRef } from 'react'
import { RiDeleteBinLine, RiEditLine, RiUserLine } from 'react-icons/ri'
import ScrollReveal from 'scrollreveal'
import styles from './DataTable.module.css'

function DataTable({ users, onDelete, onEdit }) {
  const tableRef = useRef(null)

  useEffect(() => {
    const sr = ScrollReveal({ reset: false })
    if (tableRef.current) {
      sr.reveal(tableRef.current, { distance: '20px', origin: 'bottom', duration: 600, delay: 100 })
    }
    return () => sr.destroy()
  }, [])

  if (!users || users.length === 0) {
    return (
      <div className={styles.empty}>
        <RiUserLine className={styles.emptyIcon} />
        <p>No users found</p>
      </div>
    )
  }

  return (
    <div className={styles.wrapper} ref={tableRef}>
      <div className={styles.scroll}>
        <table className={styles.table}>
          <thead>
            <tr>
              <th>#</th>
              <th>Name</th>
              <th>Email</th>
              <th>Phone</th>
              <th>Company</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user, idx) => (
              <tr key={user.id || idx}>
                <td className={styles.idCell}>{idx + 1}</td>
                <td>
                  <div className={styles.nameCell}>
                    <div className={styles.avatar}>
                      {user.name?.charAt(0)?.toUpperCase() || '?'}
                    </div>
                    <span>{user.name}</span>
                  </div>
                </td>
                <td className={styles.emailCell}>{user.email}</td>
                <td className={styles.phoneCell}>{user.phone}</td>
                <td>
                  <span className={styles.company}>
                    {typeof user.company === 'object' ? user.company?.name : user.company}
                  </span>
                </td>
                <td>
                  <div className={styles.actions}>
                    {onEdit && (
                      <button className={`${styles.actionBtn} ${styles.edit}`} onClick={() => onEdit(user)} title="Edit">
                        <RiEditLine />
                      </button>
                    )}
                    {onDelete && (
                      <button className={`${styles.actionBtn} ${styles.delete}`} onClick={() => onDelete(user.id)} title="Delete">
                        <RiDeleteBinLine />
                      </button>
                    )}
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default DataTable
