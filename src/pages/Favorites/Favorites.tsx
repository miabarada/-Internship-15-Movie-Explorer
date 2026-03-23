import { useNavigate } from 'react-router-dom'
import styles from './Favorites.module.scss'
import { MovieCard } from '../../components/MovieCard/MovieCard'
import { useEffect, useState } from 'react'

export interface Movie {
    id: number;
    title: string;
    year: number;
    description: string;
    rating: number;
    posterUrl?: string;
}

export function Favorites() {
   const [favorites, setFavorites] = useState<Movie[]>([])
   const [loading, setLoading] = useState(true)
   const navigate = useNavigate()

   const token = localStorage.getItem('token')

   const fetchFavorites = async () => {
        try {
            const response = await fetch("http://localhost:3000/favorites", {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            })

            if(!response.ok)
                throw new Error("Failed to fetch favorites");

            const data = await response.json()
            const movies = data.map((fav: any) => fav.movie)
            setFavorites(movies)
        } catch (error) {
            console.error("Error fetching favorites", error)
        } finally {
            setLoading(false)
        }  
   }

    useEffect(() => {
        if (token) {
            fetchFavorites()
        } else {
            setLoading(false)
            navigate('/login')
        }
    }, [token])

    const handleToggleFavorite = async (id: number) => {
        try {
            const response = await fetch(`http://localhost:3000/favorites/${id}`, {
                method: "DELETE",
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            })

            if (response.ok) 
                setFavorites(prev => prev.filter(movie => movie.id !== id))
        } catch (error) {
            console.error("Error deleting favorite", error)
        }        
   }

    if (loading)
        return <p>Loading...</p>

    if(favorites.length === 0) {
      return <p className={styles.empty}>No favorite movies yet.</p>
    }

    return (
      <section className={styles.favorites}>
            <h2 className={styles.title}>Your Favorites</h2>
            <div className={styles.movieList}>
                {favorites.map(movie => (
                    <div
                        key={movie.id}
                        onClick={() => navigate(`/movies/${movie.id}`)}
                        style={{ cursor: "pointer" }}
                    >
                        <MovieCard
                            id={movie.id}
                            title={movie.title}
                            year={movie.year}
                            description={movie.description}
                            rating={movie.rating}
                            isFavorite={true}
                            onToggleFavorite={handleToggleFavorite}
                        />
                    </div>
                ))}
            </div>
        </section>
    )
}