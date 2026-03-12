import { useState } from 'react'
import { RiCloseLine, RiUserAddLine } from 'react-icons/ri'
import styles from './AddUserModal.module.css'

const defaultForm = { name: '', email: '', phone: '', role: 'Viewer' }

function AddUserModal({ onClose, onAdd }) {
  const [form, setForm] = useState(defaultForm)
  const [errors, setErrors] = useState({})

  const validate = () => {
    const errs = {}
    if (!form.name.trim()) errs.name = 'Name is required'
    if (!form.email.trim()) errs.email = 'Email is required'
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) errs.email = 'Email must be valid'
    if (!form.phone.trim()) errs.phone = 'Phone is required'
    else if (!/^\+?[\d\s\-().]{7,}$/.test(form.phone)) errs.phone = 'Phone must be numeric'
    return errs
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    const errs = validate()
    if (Object.keys(errs).length) { setErrors(errs); return }
    onAdd({
      id: Date.now(),
      name: form.name,
      email: form.email,
      phone: form.phone,
      company: { name: form.role },
    })
    onClose()
  }

  const handleChange = (field, value) => {
    setForm(f => ({ ...f, [field]: value }))
    if (errors[field]) setErrors(e => ({ ...e, [field]: '' }))
  }

  return (
    <div className={styles.backdrop} onClick={e => e.target === e.currentTarget && onClose()}>
      <div className={styles.modal}>
        <div className={styles.header}>
          <div className={styles.headerIcon}><RiUserAddLine /></div>
          <div>
            <h2 className={styles.title}>Add New User</h2>
            <p className={styles.subtitle}>Fill in the details below</p>
          </div>
          <button className={styles.closeBtn} onClick={onClose}><RiCloseLine /></button>
        </div>

        <form onSubmit={handleSubmit} className={styles.form} noValidate>
          <div className={styles.field}>
            <label className={styles.label}>Full Name *</label>
            <input
              className={`${styles.input} ${errors.name ? styles.inputError : ''}`}
              type="text"
              value={form.name}
              onChange={e => handleChange('name', e.target.value)}
              placeholder="John Doe"
            />
            {errors.name && <span className={styles.error}>{errors.name}</span>}
          </div>

          <div className={styles.field}>
            <label className={styles.label}>Email Address *</label>
            <input
              className={`${styles.input} ${errors.email ? styles.inputError : ''}`}
              type="email"
              value={form.email}
              onChange={e => handleChange('email', e.target.value)}
              placeholder="john@example.com"
            />
            {errors.email && <span className={styles.error}>{errors.email}</span>}
          </div>

          <div className={styles.field}>
            <label className={styles.label}>Phone Number *</label>
            <input
              className={`${styles.input} ${errors.phone ? styles.inputError : ''}`}
              type="tel"
              value={form.phone}
              onChange={e => handleChange('phone', e.target.value)}
              placeholder="+1 555 000 0000"
            />
            {errors.phone && <span className={styles.error}>{errors.phone}</span>}
          </div>

          <div className={styles.field}>
            <label className={styles.label}>Role</label>
            <select
              className={styles.input}
              value={form.role}
              onChange={e => handleChange('role', e.target.value)}
            >
              <option>Viewer</option>
              <option>Editor</option>
              <option>Admin</option>
              <option>Manager</option>
            </select>
          </div>

          <div className={styles.actions}>
            <button type="button" className={styles.cancelBtn} onClick={onClose}>Cancel</button>
            <button type="submit" className={styles.submitBtn}>Add User</button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default AddUserModal
