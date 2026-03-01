import styles from './Loading.module.scss'

export function Loading() {
   return (
      <section className={styles.loading}>
         <h2>Loading...</h2>
         <p>Please wait while we load</p>
      </section>
   )
}