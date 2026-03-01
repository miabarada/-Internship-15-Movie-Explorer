import { Route, Routes } from 'react-router-dom'
import { Layout } from './components/layout/layout'
import { Dashboard } from './pages/dashboard/dashboard'
import { Movies } from './pages/Movies/Movies'

function App() {
  return (
    <Layout>
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/movies" element={<Movies />} />
      </Routes>
    </Layout>
  )
}

export default App
