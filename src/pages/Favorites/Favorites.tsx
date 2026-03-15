import { useNavigate } from 'react-router-dom'
import { useLocalStorage } from '../../hooks/useLocalStorage'
import styles from './Favorites.module.scss'
import { MovieCard } from '../../components/MovieCard/MovieCard'
import { useFetchMovies } from '../../hooks/useFetchMovies'

export function Favorites() {
   const [favorites, setFavorites] = useLocalStorage<number[]>("favorites", [])
   const navigate = useNavigate()

   const { data: movies, loading, error } = useFetchMovies()

   const favoriteMovies = movies.filter(m => favorites.includes(m.id));

   const handleToggleFavorite = (id: number) => {
        setFavorites(prev => prev.filter(favId => favId !== id));
    };

    if(favoriteMovies.length === 0) {
      return <p className={styles.empty}>No favorite movies yet.</p>
    }

    return (
      <section className={styles.favorites}>
            <h2 className={styles.title}>Your Favorites</h2>
            <div className={styles.movieList}>
                {favoriteMovies.map(movie => (
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