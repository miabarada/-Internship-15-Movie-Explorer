import styles from'./NotFound.module.scss'
import { useNavigate } from 'react-router-dom'

export function NotFound() {
   const navigate = useNavigate()

   return (
      <section className={styles.notFound}>
            <h2>Movie not found</h2>
            <button onClick={() => navigate(-1)}>Go back</button>
      </section>
   )
}