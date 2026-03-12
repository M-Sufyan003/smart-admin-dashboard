import { useEffect, useRef } from 'react'
import { RiBarChartLine, RiLineChartLine, RiPieChartLine, RiDownloadLine } from 'react-icons/ri'
import ScrollReveal from 'scrollreveal'
import styles from './Reports.module.css'

const monthlyData = [
  { month: 'Sep', users: 38, revenue: 22 },
  { month: 'Oct', users: 52, revenue: 31 },
  { month: 'Nov', users: 47, revenue: 28 },
  { month: 'Dec', users: 61, revenue: 45 },
  { month: 'Jan', users: 74, revenue: 52 },
  { month: 'Feb', users: 68, revenue: 48 },
  { month: 'Mar', users: 90, revenue: 68 },
]

const maxVal = Math.max(...monthlyData.map(d => Math.max(d.users, d.revenue)))

const pieData = [
  { label: 'Desktop', pct: 48, color: '#c9a84c' },
  { label: 'Mobile', pct: 35, color: '#52b788' },
  { label: 'Tablet', pct: 17, color: '#7a9cc8' },
]

function Reports() {
  const cardsRef = useRef([])

  useEffect(() => {
    const sr = ScrollReveal({ reset: false })
    cardsRef.current.forEach((el, i) => {
      if (el) sr.reveal(el, { delay: i * 80, origin: 'bottom', distance: '20px', duration: 500 })
    })
    return () => sr.destroy()
  }, [])

  return (
    <div className={styles.page}>
      <div className={styles.grid}>
        {/* Bar Chart */}
        <div className={styles.card} ref={el => cardsRef.current[0] = el}>
          <div className={styles.cardHead}>
            <div>
              <h3 className={styles.cardTitle}>Monthly Overview</h3>
              <p className={styles.cardSub}>Users vs Revenue (scaled)</p>
            </div>
            <RiBarChartLine className={styles.cardIcon} />
          </div>
          <div className={styles.barChart}>
            {monthlyData.map(d => (
              <div key={d.month} className={styles.barGroup}>
                <div className={styles.bars}>
                  <div className={styles.barWrap}>
                    <div
                      className={`${styles.bar} ${styles.barAmber}`}
                      style={{ height: `${(d.users / maxVal) * 100}%` }}
                      title={`Users: ${d.users}`}
                    />
                  </div>
                  <div className={styles.barWrap}>
                    <div
                      className={`${styles.bar} ${styles.barTeal}`}
                      style={{ height: `${(d.revenue / maxVal) * 100}%` }}
                      title={`Revenue: ${d.revenue}k`}
                    />
                  </div>
                </div>
                <span className={styles.barLabel}>{d.month}</span>
              </div>
            ))}
          </div>
          <div className={styles.legend}>
            <span className={styles.legendItem}><span className={`${styles.legendDot} ${styles.dotAmber}`} />Users</span>
            <span className={styles.legendItem}><span className={`${styles.legendDot} ${styles.dotTeal}`} />Revenue</span>
          </div>
        </div>

        {/* Pie / Donut */}
        <div className={styles.card} ref={el => cardsRef.current[1] = el}>
          <div className={styles.cardHead}>
            <div>
              <h3 className={styles.cardTitle}>Device Breakdown</h3>
              <p className={styles.cardSub}>Traffic by device type</p>
            </div>
            <RiPieChartLine className={styles.cardIcon} />
          </div>
          <div className={styles.pieSection}>
            <svg viewBox="0 0 100 100" className={styles.donut}>
              {(() => {
                let offset = 0
                return pieData.map(d => {
                  const dash = d.pct
                  const el = (
                    <circle
                      key={d.label}
                      cx="50" cy="50" r="36"
                      fill="none"
                      stroke={d.color}
                      strokeWidth="14"
                      strokeDasharray={`${dash} ${100 - dash}`}
                      strokeDashoffset={-offset}
                      style={{ transformOrigin: 'center', transform: 'rotate(-90deg)' }}
                    />
                  )
                  offset += dash
                  return el
                })
              })()}
              <text x="50" y="55" textAnchor="middle" className={styles.donutText}>100%</text>
            </svg>
            <div className={styles.pieLegend}>
              {pieData.map(d => (
                <div key={d.label} className={styles.pieRow}>
                  <span className={styles.pieDot} style={{ background: d.color }} />
                  <span className={styles.pieLabel}>{d.label}</span>
                  <span className={styles.pieVal}>{d.pct}%</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Trend line */}
        <div className={`${styles.card} ${styles.wide}`} ref={el => cardsRef.current[2] = el}>
          <div className={styles.cardHead}>
            <div>
              <h3 className={styles.cardTitle}>Growth Trend</h3>
              <p className={styles.cardSub}>User acquisition over 7 months</p>
            </div>
            <div className={styles.cardActions}>
              <button className={styles.exportBtn}><RiDownloadLine /> Export</button>
              <RiLineChartLine className={styles.cardIcon} />
            </div>
          </div>
          <div className={styles.lineChart}>
            <svg viewBox="0 0 700 160" preserveAspectRatio="none" className={styles.lineSvg}>
              <defs>
                <linearGradient id="grad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#c9a84c" stopOpacity="0.3" />
                  <stop offset="100%" stopColor="#c9a84c" stopOpacity="0" />
                </linearGradient>
              </defs>
              {(() => {
                const pts = monthlyData.map((d, i) => {
                  const x = (i / (monthlyData.length - 1)) * 680 + 10
                  const y = 150 - (d.users / maxVal) * 130
                  return `${x},${y}`
                })
                const polyline = pts.join(' ')
                const area = `10,150 ${polyline} ${(monthlyData.length - 1) / (monthlyData.length - 1) * 680 + 10},150`
                return (
                  <>
                    <polygon points={area} fill="url(#grad)" />
                    <polyline points={polyline} fill="none" stroke="#c9a84c" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
                    {pts.map((p, i) => {
                      const [x, y] = p.split(',')
                      return <circle key={i} cx={x} cy={y} r="4" fill="#c9a84c" />
                    })}
                  </>
                )
              })()}
            </svg>
            <div className={styles.lineLabels}>
              {monthlyData.map(d => <span key={d.month}>{d.month}</span>)}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Reports
