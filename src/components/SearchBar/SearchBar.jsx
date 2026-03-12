import { RiSearchLine, RiCloseLine } from 'react-icons/ri'
import styles from './SearchBar.module.css'

function SearchBar({ value, onChange, placeholder = 'Search by name or email...' }) {
  return (
    <div className={styles.wrapper}>
      <span className={styles.icon}><RiSearchLine /></span>
      <input
        type="text"
        className={styles.input}
        value={value}
        onChange={e => onChange(e.target.value)}
        placeholder={placeholder}
      />
      {value && (
        <button className={styles.clear} onClick={() => onChange('')} aria-label="Clear search">
          <RiCloseLine />
        </button>
      )}
    </div>
  )
}

export default SearchBar
