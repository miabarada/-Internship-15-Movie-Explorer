import { useState } from 'react'
import styles from './Register.module.scss'
import { Link, useNavigate } from 'react-router-dom'

export function  Register() {
   const [email, setEmail] = useState('')
   const [password, setPassword] = useState('')
   const [confirmPassword, setConfirmPassword] = useState('')
   const [error, setError] = useState('')
   const [loading, setLoading] = useState(false)
   const navigate = useNavigate();

   const handleSubmit = async (e: React.FormEvent) => {
      e.preventDefault()
      setError('')

      if (password !== confirmPassword) {
         setError('Passwords dont match')
         return
      }

      setLoading(true)

      try {
         const response = await fetch('http://localhost:3000/user/register', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ email, password })
         })

         const data = await response.json()

         if (!response.ok) {
            throw new Error(data.message || 'Registration nije uspjela');
         }

         localStorage.setItem('token', data.token)
         localStorage.setItem('role', data.user.isAdmin ? 'admin' : 'user')

         navigate('/');
         window.location.reload()
      } catch (err: any) {
         setError(err.message)
      } finally {
         setLoading(false)
      }
   }

   return (
      <div className={styles.container}>
         <h1 className={styles.title}>Register</h1>
         {error && <p>{error}</p>}

         <form onSubmit={handleSubmit} className={styles.form}>
            <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="ime@primjer.com" required className={styles.inputField}/>
            <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Unesite lozinku" required className={styles.inputField}/>
            <input type="password" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} placeholder="Ponovite lozinku" required className={styles.inputField}/>
            <button type="submit" disabled={loading} className={styles.button}> {loading ? 'Registracija...' : 'Registriraj se'}</button>
         </form>
         <p className={styles.link}>Already have an account? <Link to="/register">Register here</Link></p>
      </div>
   );
}