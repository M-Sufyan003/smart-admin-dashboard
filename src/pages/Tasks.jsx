import { useState } from 'react'
import { RiCheckboxCircleLine, RiTimeLine, RiAlertLine, RiAddLine, RiDeleteBinLine } from 'react-icons/ri'
import styles from './Tasks.module.css'

const initialTasks = [
  { id: 1, title: 'Redesign user onboarding flow', priority: 'High', status: 'In Progress', due: '2026-03-20', assignee: 'Alex K.' },
  { id: 2, title: 'Set up CI/CD pipeline', priority: 'High', status: 'Todo', due: '2026-03-25', assignee: 'Sam T.' },
  { id: 3, title: 'Write API documentation', priority: 'Medium', status: 'In Progress', due: '2026-04-01', assignee: 'Jordan L.' },
  { id: 4, title: 'Fix authentication bug on mobile', priority: 'High', status: 'Done', due: '2026-03-10', assignee: 'Alex K.' },
  { id: 5, title: 'Update dependencies to latest', priority: 'Low', status: 'Todo', due: '2026-04-10', assignee: 'Casey M.' },
  { id: 6, title: 'Implement dark mode', priority: 'Medium', status: 'Done', due: '2026-03-08', assignee: 'Jordan L.' },
  { id: 7, title: 'Performance audit & optimization', priority: 'High', status: 'In Progress', due: '2026-03-30', assignee: 'Sam T.' },
  { id: 8, title: 'Add export to CSV feature', priority: 'Low', status: 'Todo', due: '2026-04-15', assignee: 'Casey M.' },
]

const statusConfig = {
  'Todo': { color: 'blue', icon: RiTimeLine },
  'In Progress': { color: 'amber', icon: RiAlertLine },
  'Done': { color: 'teal', icon: RiCheckboxCircleLine },
}

const priorityColor = { High: 'rust', Medium: 'amber', Low: 'teal' }

function Tasks() {
  const [tasks, setTasks] = useState(initialTasks)
  const [filter, setFilter] = useState('All')
  const [adding, setAdding] = useState(false)
  const [newTitle, setNewTitle] = useState('')

  const filters = ['All', 'Todo', 'In Progress', 'Done']
  const counts = { All: tasks.length, Todo: tasks.filter(t => t.status === 'Todo').length, 'In Progress': tasks.filter(t => t.status === 'In Progress').length, Done: tasks.filter(t => t.status === 'Done').length }

  const visible = filter === 'All' ? tasks : tasks.filter(t => t.status === filter)

  const handleAddTask = () => {
    if (!newTitle.trim()) return
    setTasks(p => [...p, {
      id: Date.now(),
      title: newTitle.trim(),
      priority: 'Medium',
      status: 'Todo',
      due: '—',
      assignee: 'You',
    }])
    setNewTitle('')
    setAdding(false)
  }

  const cycleStatus = (id) => {
    const cycle = ['Todo', 'In Progress', 'Done']
    setTasks(p => p.map(t => t.id === id ? { ...t, status: cycle[(cycle.indexOf(t.status) + 1) % cycle.length] } : t))
  }

  return (
    <div className={styles.page}>
      <div className={styles.filterRow}>
        {filters.map(f => (
          <button
            key={f}
            className={`${styles.filterBtn} ${filter === f ? styles.activeFilter : ''}`}
            onClick={() => setFilter(f)}
          >
            {f} <span className={styles.count}>{counts[f]}</span>
          </button>
        ))}
        <button className={styles.addBtn} onClick={() => setAdding(true)}>
          <RiAddLine /> New Task
        </button>
      </div>

      {adding && (
        <div className={styles.addRow}>
          <input
            className={styles.addInput}
            placeholder="Task title..."
            value={newTitle}
            onChange={e => setNewTitle(e.target.value)}
            onKeyDown={e => e.key === 'Enter' && handleAddTask()}
            autoFocus
          />
          <button className={styles.addConfirm} onClick={handleAddTask}>Add</button>
          <button className={styles.addCancel} onClick={() => setAdding(false)}>Cancel</button>
        </div>
      )}

      <div className={styles.taskList}>
        {visible.map(task => {
          const cfg = statusConfig[task.status]
          const Icon = cfg.icon
          return (
            <div key={task.id} className={styles.taskCard}>
              <button className={`${styles.statusIcon} ${styles[cfg.color]}`} onClick={() => cycleStatus(task.id)} title="Click to change status">
                <Icon />
              </button>
              <div className={styles.taskInfo}>
                <span className={`${styles.taskTitle} ${task.status === 'Done' ? styles.done : ''}`}>{task.title}</span>
                <span className={styles.taskMeta}>Due {task.due} · {task.assignee}</span>
              </div>
              <span className={`${styles.priority} ${styles[priorityColor[task.priority]]}`}>{task.priority}</span>
              <span className={`${styles.status} ${styles[cfg.color]}`}>{task.status}</span>
              <button className={styles.deleteBtn} onClick={() => setTasks(p => p.filter(t => t.id !== task.id))}>
                <RiDeleteBinLine />
              </button>
            </div>
          )
        })}
      </div>

      {visible.length === 0 && (
        <div className={styles.empty}>No tasks in this category</div>
      )}
    </div>
  )
}

export default Tasks
