import { useEffect, useState } from "react"
import { movies, Movie } from "../data/movies"

export function useFetchMovies() {
   const [data, setData] = useState<Movie[]>([])
   const [loading, setLoading] = useState(true)
   const [error, setError] = useState<string | null>(null)

   const fetchMovies = async (params?: { shouldFail?: boolean }) => {
      try {
         setLoading(true);
         setError(null);
            
         await new Promise(resolve => setTimeout(resolve, 800))

         if(params?.shouldFail)
            throw new Error("Failed to fetch movies")

         const result = movies
         setData(result)
      } catch (error) {
         setError(error instanceof Error ? error.message : "An error ocurred")
      } finally {
         setLoading(false)
      }
   }

   useEffect(() => {
      fetchMovies()
   }, [])

   return { data, loading, error, fetchMovies }
}