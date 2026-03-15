import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { NotFound } from "../NotFound/NotFound";
import styles from './MovieDetails.module.scss'
import { useLocalStorage } from "../../hooks/useLocalStorage";

type Movie = {
   id: number
   title: string
   year: number
   rating: number
   description: string
}

export function MovieDetails() {
   const {id} = useParams()
   const navigate = useNavigate()

   const movieId = Number(id)
   
   const [movie, setMovie] = useState<Movie | null>(null)
   const [loading, setLoading] = useState(true)
   const [error, setError] = useState<string | null>(null)

   const [favorites, setFavorites] = useLocalStorage<number[]>("favorites", [])
   const isFavorite = favorites.includes(movieId)

   const handleToggleFavorite = () => {
      setFavorites(prev => prev.includes(movieId) ? prev.filter(id => id !== movieId) : [...prev, movieId])
   }

   useEffect(() => {
      const fetchMovie = async () => {
         try {
            setLoading(true)

            const response = await fetch(`http://localhost:3000/movies/${movieId}`)

            if (!response.ok)
               throw new Error("Movie not found")

            const data = await response.json()
            setMovie(data)

         } catch (err) {
            setError(err instanceof Error ? err.message : "Error loading movie")
         } finally {
            setLoading(false)
         }
      }

      fetchMovie()
   }, [movieId])

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