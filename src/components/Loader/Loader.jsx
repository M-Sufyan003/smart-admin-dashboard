import styles from './Loader.module.css'

function Loader({ startup }) {
  return (
    <div className={`${styles.loader} ${startup ? styles.startup : ''}`}>
      {startup ? (
        <div className={styles.startupInner}>
          <div className={styles.logoMark}>
            <span className={styles.logoDot} />
            <span className={styles.logoDot} />
            <span className={styles.logoDot} />
          </div>
          <h1 className={styles.title}>Smart Admin</h1>
          <p className={styles.subtitle}>Dashboard</p>
          <div className={styles.progressBar}>
            <div className={styles.progress} />
          </div>
        </div>
      ) : (
        <div className={styles.spinner}>
          <div className={styles.ring} />
          <div className={styles.ring} />
        </div>
      )}
    </div>
  )
}

export default Loader
