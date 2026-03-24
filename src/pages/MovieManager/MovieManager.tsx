import { useState } from 'react'
import styles from './MovieManager.module.scss'

export function MovieManager() {
   const [title, setTitle] = useState('')
   const token = localStorage.getItem('token')

   const handleAdd = async () => {
      await fetch("http://localhost:3000/movies", {
         method: 'POST', 
         headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
         },
         body: JSON.stringify({ title, year: 2024, description: "A description", rating: 5.2, posterUrl: "", genres:[]})
      });
   }

   return (
      <div className={styles.container}>
         <h2 className={styles.title}>Add Movie</h2>
         <input value={title} onChange={e => setTitle(e.target.value)} placeholder='Movie title' className={styles.inputField}/>
         <button onClick={handleAdd} className={styles.button}>Add</button>
      </div>
   )
}