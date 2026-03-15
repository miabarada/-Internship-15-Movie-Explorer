import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { useFetchMovies } from "../../hooks/useFetchMovies";
import { Link, useNavigate } from "react-router-dom";
import { MovieCard } from "../../components/MovieCard/MovieCard";
import { Loading } from "../Loading/Loading";
import { Error } from "../Error/Error";
import styles from './Movies.module.scss'
import { useLocalStorage } from "../../hooks/useLocalStorage";

export function Movies () {
   const [search, setSearch] = useState("")
   const [sortBy, setSortBy] = useState<"id" | "year" | "rating">("id")
   const [favorites, setFavorites] = useLocalStorage<number[]>("favorites", [])
   const searchRef = useRef<HTMLInputElement | null>(null)
   const navigate = useNavigate()

   const {data, loading, error, fetchMovies} = useFetchMovies()

   useEffect(() => {
      searchRef.current?.focus()
   }, [])

   const visibleMovies = useMemo(() => {
      if (!data) return []
      let visible = data

      const lower = search.toLowerCase();
      if(search.trim() !== "") {
         visible = visible.filter((movie) => movie.title.toLowerCase().includes(lower))
      }

      const sorted = [...visible]

      switch (sortBy) {
         case "id":
            sorted.sort((a, b) => Number(a.id) - Number(b.id))
            break
         case "year":
            sorted.sort((a, b) => a.year-b.year)
            break
         case "rating":
            sorted.sort((a, b) => a.rating-b.rating)
            break
      }

      return sorted
   }, [data, search, sortBy])

   const handleToggleFavorite = useCallback((id: number) => {
      setFavorites((prev) => 
      prev.includes(id) ? prev.filter((favId) => favId !== id) : [...prev, id])
   }, [setFavorites])

   if(loading) return <Loading />

   if(error) {
      return (
         <Error
            message={error}
            onRetry={() => fetchMovies()}
         />
      )
   }

   return (
      <section className={styles.movies}>
         <h2 className={styles.title}>Movies</h2>
         <div className={styles.filters}>
            <input  
               type="search" 
               ref={searchRef} 
               placeholder="Search movies..." 
               value={search} 
               onChange={(e) => setSearch(e.target.value)} 
               className={styles.input}
            />
            <select value={sortBy} onChange={(e) => setSortBy(e.target.value === "year" ? "year" : e.target.value === "id" ? "id" : "rating")} className={styles.dropdown}>
               <option value="id">ID (asc)</option>
               <option value="year">year (asc)</option>
               <option value="rating">rating (asc)</option>
            </select>
         </div>

         <div className={styles.movieList}>
            {visibleMovies.length === 0 ? (
               <p>No Movies found.</p>
            ) : 
            visibleMovies.map((movie) => (
               <div
                  key={movie.id}
                  onClick={() => navigate(`/movies/${movie.id}`)}>
                  
                  <MovieCard 
                     id={movie.id}
                     title={movie.title}
                     year={movie.year}
                     description={movie.description}
                     rating = {movie.rating}
                     isFavorite={favorites.includes(movie.id)}
                     onToggleFavorite={handleToggleFavorite}
                  />
               </div>
            ))}
         </div>
      </section>
   )
}