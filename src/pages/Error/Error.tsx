import styles from './Error.module.scss'

type ErrorPageProps = {
   message?: string
   onRetry?: () => void
}

export function ErrorPage({ message, onRetry }: ErrorPageProps) {
   return (
      <section className={styles.error}>
         <h2>Something went wrong</h2>
         <p>{message || "Unexpected error occurred."}</p>

         {onRetry && (
            <button onClick={onRetry}>Try again</button>
         )}
      </section>
   )
}