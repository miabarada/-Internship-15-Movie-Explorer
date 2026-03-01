import { NavLink } from 'react-router-dom'
import styles from './Layout.module.scss'

type LayoutProps = {
   children: React.ReactNode
}

export function Layout({children}: LayoutProps) {
   return (
      <div className={styles.container}>
         <header className={styles.header}>
            <h1>Movie explorer</h1>
            <nav className={styles.nav}>
               <NavLink to="/" className={styles.navlink}>Dashboard</NavLink>
               <NavLink to="/movies" className={styles.navlink}>Movies</NavLink>
               <NavLink to="/favorites" className={styles.navlink}>Favorites</NavLink>
            </nav>
         </header>
         <main className={styles.main}>{children}</main>
      </div>
   )
}