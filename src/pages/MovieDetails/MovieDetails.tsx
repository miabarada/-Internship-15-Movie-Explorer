import { useNavigate, useParams } from "react-router-dom";
import { movies } from "../../data/movies";
import { useEffect, useState } from "react";
import { NotFound } from "../NotFound/NotFound";
import styles from './MovieDetails.module.scss'
import { useLocalStorage } from "../../hooks/useLocalStorage";

export function MovieDetails() {
   const {id} = useParams()
   const navigate = useNavigate()

   const movieId = Number(id)
   const movie = movies.find((m) => m.id === movieId)

   const [favorites, setFavorites] = useLocalStorage<number[]>("favorites", [])
   const isFavorite = favorites.includes(movieId)

   const handleToggleFavorite = () => {
      setFavorites(prev => prev.includes(movieId) ? prev.filter(id => id !== movieId) : [...prev, movieId])
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