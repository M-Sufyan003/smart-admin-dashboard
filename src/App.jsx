import React, { Suspense, useState, useEffect, createContext, useContext } from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Sidebar from './components/Sidebar/Sidebar'
import Navbar from './components/Navbar/Navbar'
import Loader from './components/Loader/Loader'
import styles from './App.module.css'

// Lazy loaded pages
const Dashboard = React.lazy(() => import('./pages/Dashboard'))
const Users = React.lazy(() => import('./pages/Users'))
const Tasks = React.lazy(() => import('./pages/Tasks'))
const Reports = React.lazy(() => import('./pages/Reports'))
const Settings = React.lazy(() => import('./pages/Settings'))

export const ThemeContext = createContext()
export const useTheme = () => useContext(ThemeContext)

function App() {
  const [theme, setTheme] = useState('light')
  const [appLoading, setAppLoading] = useState(true)
  const [sidebarOpen, setSidebarOpen] = useState(false)

  useEffect(() => {
    const saved = localStorage.getItem('theme') || 'light'
    setTheme(saved)
    document.documentElement.setAttribute('data-theme', saved)
    const timer = setTimeout(() => setAppLoading(false), 1800)
    return () => clearTimeout(timer)
  }, [])

  const toggleTheme = () => {
    const next = theme === 'light' ? 'dark' : 'light'
    setTheme(next)
    document.documentElement.setAttribute('data-theme', next)
    localStorage.setItem('theme', next)
  }

  if (appLoading) return <Loader startup />

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      <BrowserRouter>
        <div className={styles.app}>
          <Sidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />
          <div className={styles.main}>
            <Navbar onMenuToggle={() => setSidebarOpen(o => !o)} />
            <div className={styles.content}>
              <Suspense fallback={<Loader />}>
                <Routes>
                  <Route path="/" element={<Dashboard />} />
                  <Route path="/users" element={<Users />} />
                  <Route path="/tasks" element={<Tasks />} />
                  <Route path="/reports" element={<Reports />} />
                  <Route path="/settings" element={<Settings />} />
                </Routes>
              </Suspense>
            </div>
          </div>
          {sidebarOpen && (
            <div className={styles.overlay} onClick={() => setSidebarOpen(false)} />
          )}
        </div>
      </BrowserRouter>
    </ThemeContext.Provider>
  )
}

export default App
