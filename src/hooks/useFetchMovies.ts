import { useEffect, useState } from "react"

export interface Movie {
   id: number
   title: string
   year: number
   rating: number
   description: string
   posterUrl: string
   genres: { id: number; name:string }[] 
}

const API_URL = "http://localhost:3000"

export function useFetchMovies(params?: { search?: string; sort?: string; genre?: number }) {
   const [data, setData] = useState<Movie[]>([])
   const [loading, setLoading] = useState(true)
   const [error, setError] = useState<string | null>(null)

   const fetchMovies = async () => {
      try {
         setLoading(true)
         setError(null)

         const query = new URLSearchParams()
         if (params?.search) query.append("search", params.search)
         if (params?.sort) query.append("sort", params.sort) // "rating" | "year" | "title"
         if (params?.genre) query.append("genre", params.genre.toString())

         const res = await fetch(`${API_URL}/movies?${query.toString()}`)
         if (!res.ok)
            throw new Error("Failed to fetch movies")

         const result = await res.json()
         setData(result)
      } catch (error) {
         setError("An error ocurred")
      } finally {
         setLoading(false)
      }
   }

   useEffect(() => {
      fetchMovies()
   }, [params?.search, params?.sort, params?.genre])

   return { data, loading, error, fetchMovies}
}