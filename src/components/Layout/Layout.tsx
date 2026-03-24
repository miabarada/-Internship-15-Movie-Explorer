import { NavLink, useNavigate } from 'react-router-dom'
import styles from './Layout.module.scss'

type LayoutProps = {
   children: React.ReactNode
}

export function Layout({children}: LayoutProps) {
   const navigate = useNavigate()
   const token = localStorage.getItem('token')

   const handleLogout = () => {
      localStorage.removeItem('token')
      localStorage.removeItem('role')

      navigate('/login')
      window.location.reload();
   }

   return (
      <div className={styles.container}>
         <header className={styles.header}>
            <h1>Movie explorer</h1>
            <nav className={styles.nav}>
               <NavLink to="/" className={styles.navlink}>Dashboard</NavLink>
               <NavLink to="/movies" className={styles.navlink}>Movies</NavLink>
               {token && (<NavLink to="/favorites" className={styles.navlink}>Favorites</NavLink>)}
               {token ? (<button onClick={handleLogout} className={styles.navlink}>Logout</button>
               ) : (
                  <NavLink to="/login" className={styles.navlink}>Login</NavLink>
               )}
               <NavLink to="/manager" className={styles.navlink}>Manager</NavLink>
            </nav>
         </header>
         <main className={styles.main}>{children}</main>
      </div>
   )
}