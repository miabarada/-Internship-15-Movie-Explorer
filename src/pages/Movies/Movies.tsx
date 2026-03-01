import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { useFetchMovies } from "../../hooks/useFetchMovies";
import { Link } from "react-router-dom";
import { MovieCard } from "../../components/MovieCard/MovieCard";
import { LoadingPage } from "../Loading/Loading";
import { ErrorPage } from "../Error/Error";
import styles from './Movies.module.scss'

export function Movies () {
   const [search, setSearch] = useState("")
   const [sortBy, setSortBy] = useState<"id" | "year">("id")
   const [favorites, setFavorites] = useState<number[]>([])
   const searchRef = useRef<HTMLInputElement | null>(null)

   const {data, loading, error} = useFetchMovies()

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
      }

      return sorted
   }, [data, search, sortBy])

   const handleToggleFavorite = useCallback((id: number) => {
      setFavorites((prev) => 
      prev.includes(id) ? prev.filter((favId) => favId !== id) : [...prev, id])
   }, [])

   if(loading) return <LoadingPage />

   if(error) {
      return (
         <ErrorPage
            message={error}
            onRetry={() => useFetchMovies()}
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
            <select value={sortBy} onChange={(e) => setSortBy(e.target.value === "year" ? "year" : "id")} className={styles.dropdown}>
               <option value="id">ID (asc)</option>
               <option value="year">year (asc)</option>
            </select>
         </div>

         <div className={styles.movieList}>
            {visibleMovies.map((movie) => (
               <Link
                  key={movie.id}
                  to={`/movies/${movie.id}`}
                  style={{textDecoration: "none", color: "inherit"}}>
                  <MovieCard 
                     id={movie.id}
                     title={movie.title}
                     genre={movie.genre}
                     year={movie.year}
                     description={movie.description}
                     isFavorite={favorites.includes(movie.id)}
                     onToggleFavorite={handleToggleFavorite}
                  />
               </Link>
            ))}
         </div>
      </section>
   )
}