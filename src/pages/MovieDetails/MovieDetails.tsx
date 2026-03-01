import { useNavigate, useParams } from "react-router-dom";
import { movies } from "../../data/movies";
import { useEffect, useState } from "react";
import { NotFound } from "../NotFound/NotFound";
import styles from './MovieDetails.module.scss'

export function MovieDetails() {
   const {id} = useParams()
   const navigate = useNavigate()

   const movieId = Number(id)
   const movie = movies.find((m) => m.id === movieId)

   const [isFavorite, setIsFavorite] = useState(false)

   const handleToggleFavorite = () => {
      setIsFavorite((prev) => !prev)
   }

   useEffect(() => {
      if(movie)
         document.title = `${movie.title} - Movie Explorer`
   }, [movie])

   if(!movie)
      return <NotFound />

   return (
      <section className={styles.movie}>
         <div className={styles.poster}></div>
         <div className={styles.details}>
            <h2>{movie.title}</h2>
            <p><strong>Year:</strong> {movie.year}</p>
            <p><strong>Genre:</strong> {movie.genre}</p>
            <p><strong>Rating:</strong> {movie.rating.toFixed(1)}</p>
            <p><strong>Description:</strong> {movie.description}</p>

            <div className={styles.actions}>
               <button onClick={handleToggleFavorite}>
                  {isFavorite ? "Remove from favorites" : "Add to favorites"}
               </button>

               <button onClick={() => navigate(-1)}>
                  Back
               </button>
            </div>
         </div>
      </section>
   )
}