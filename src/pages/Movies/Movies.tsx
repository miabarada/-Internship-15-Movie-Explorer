import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { useFetchMovies } from "../../hooks/useFetchMovies";
import { useNavigate } from "react-router-dom";
import { MovieCard } from "../../components/MovieCard/MovieCard";
import { Loading } from "../Loading/Loading";
import { Error } from "../Error/Error";
import styles from './Movies.module.scss'

export function Movies () {
   const [search, setSearch] = useState("")
   const [sortBy, setSortBy] = useState<"id" | "year" | "rating">("id")
   const [favorites, setFavorites] = useState<number[]>([])
   const searchRef = useRef<HTMLInputElement | null>(null)
   const navigate = useNavigate()

   const [genre, setGenre] = useState<number | undefined>(undefined)
   const [genres, setGenres] = useState<{id: number, name: string}[]>([])

   const {data, loading, error, fetchMovies} = useFetchMovies({search, sort: sortBy, genre})
   const token = localStorage.getItem('token')

   useEffect(() => {
      fetch("http://localhost:3000/genres")
         .then((res) => res.json())
         .then((data) => setGenres(data))
         .catch(console.error)
   }, [])

   useEffect(() => {
      if (token) {
         fetch("http://localhost:3000/favorites", {
            headers: {
               'Authorization': `Bearer ${token}`
            }
         })
         .then(res => {
            return res.json()
         })
         .then(data => {
            const favoriteIds = data.map((f: any) => f.movieId)
            setFavorites(favoriteIds)
         })
         .catch(() => console.log("User not logged in or does not have favorites"))
      }
   }, [token])

   useEffect(() => {
      searchRef.current?.focus();
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

   const handleToggleFavorite = useCallback(async (id: number) => {
      if (!token) {
         alert("Must be signed in to have favorites!")
         navigate("/login")
         return
      }

      const isAlreadyFavorite = favorites.includes(id)

      try {
         if (isAlreadyFavorite) {
            const res = await fetch(`http://localhost:3000/favorites/${id}`, {
               method: 'DELETE',
               headers: { 'Authorization': `Bearer ${token}` }
            });

            if (res.ok) 
               setFavorites(prev => prev.filter(favId => favId !== id))
         } else {
            const res = await fetch(`http://localhost:3000/favorites`, {
               method: 'POST',
               headers: { 
                  'Content-Type': 'application/json',
                  'Authorization': `Bearer ${token}` 
               },
               body: JSON.stringify({ movieId: id })
            });

            if (res.ok) {
               setFavorites(prev => [...prev, id])
            }
         }
      } catch (err) {
         console.error("An error has ocurred:", err)
      }
   }, [favorites, token, navigate])
   

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

            <select value={genre ?? ""} onChange={(e) => setGenre(e.target.value ? Number(e.target.value) : undefined)} className={styles.dropdown}>
               <option value="">All genres</option>
                  {genres.map((g) => (
                     <option key={g.id} value={g.id}>
                        {g.name}
                     </option>
                  ))}
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