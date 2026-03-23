import { useState } from 'react'
import styles from './Login.module.scss'
import { useNavigate } from 'react-router-dom'

export function Login() {
   const [email, setEmail] = useState('')
   const [password, setPassword] = useState('')
   const [error, setError] = useState('')
   const navigate = useNavigate()

   const handleSubmit = async (e: React.FormEvent) => {
      e.preventDefault()
      setError('')

      try {
         const response = await fetch('http://localhost:3000/user/login', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ email, password })
         });

         const data = await response.json()

         if (!response.ok) {
            throw new Error(data.message || 'Neuspješna prijava')
         }

         localStorage.setItem('token', data.token)
         localStorage.setItem('role', data.user.isAdmin? 'admin' : 'user')

         navigate('/');
         window.location.reload()
      } catch (err: any) {
         setError(err.message)
      }
   }

   return (
      <div className={styles.container}>
         <h1 className={styles.title}>Prijava</h1>
         {error && <p>{error}</p>}
         <form onSubmit={handleSubmit} className={styles.form}>
            <input type="email" placeholder='Email' value={email} onChange={(e) => setEmail(e.target.value)} required className={styles.inputField}/>
            <input type="password" placeholder='Password' value={password} onChange={(e) => setPassword(e.target.value)} required  className={styles.inputField} />
            <button type='submit' className={styles.button}>Login</button>
         </form>
      </div>
   )
}