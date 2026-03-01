import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { useFetchMovies } from "../../hooks/useFetchMovies";
import { Link } from "react-router-dom";
import { MovieCard } from "../../components/MovieCard/MovieCard";

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

   return (
      <section>
         <h2>Movies</h2>
         <div>
            <input  
               type="search" 
               ref={searchRef} 
               placeholder="Search movies..." 
               value={search} 
               onChange={(e) => setSearch(e.target.value)} 
            />
            <select value={sortBy} onChange={(e) => setSortBy(e.target.value === "year" ? "year" : "id")}>
               <option value="id">ID (asc)</option>
               <option value="year">yeard (asc)</option>
            </select>
         </div>

         <div>
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