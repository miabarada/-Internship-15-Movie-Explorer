import { Route, Routes } from 'react-router-dom'
import { Layout } from './components/layout/layout'
import { Dashboard } from './pages/dashboard/dashboard'
import { Movies } from './pages/Movies/Movies'
import { MovieDetails } from './pages/MovieDetails/MovieDetails'
import { Favorites } from './pages/Favorites/Favorites'
import { Login } from './pages/Login/Login'

function App() {
  return (
    <Layout>
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path='/login' element={<Login />}></Route>
        <Route path="/movies" element={<Movies />} />
        <Route path="/movies/:id" element={<MovieDetails />} />
        <Route path="/favorites" element={<Favorites />} />
      </Routes>
    </Layout>
  )
}

export default App
