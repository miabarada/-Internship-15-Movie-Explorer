import styles from'./MovieCard.module.scss'

type MovieCardProps = {
   id: number
   title: string
   genre: string
   year: number
   description: string
   isFavorite?: boolean
   onToggleFavorite?: (id:number) => void
}

export function MovieCard({ id, title, genre, year, description, isFavorite, onToggleFavorite}: MovieCardProps) {
   const handleClick = (e : React.MouseEvent<HTMLButtonElement>) => {
      e.stopPropagation()
      onToggleFavorite?.(id)
   }

   return (
      <div className={styles.taskCard}>
         <div className={styles.info}>
            <div className={styles.title}>
               <h3>{title}<span className={styles.label}> | {year}</span></h3>
               <p>{genre}</p>
            </div>
            <p>{description}</p>
         </div>
         {isFavorite !== undefined && (
            <button 
               onClick={() => onToggleFavorite && onToggleFavorite(id)}
               className={`${isFavorite ? styles.favorite : styles.notFavorite}`}></button>
         )}
      </div>
   )
}