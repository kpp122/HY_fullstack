import { useState, useEffect } from 'react'
import { useMutation } from '@apollo/client'
import { LOGIN } from '../queries.js'

const LoginForm = ({ show, setToken, setPage }) => {
  const [username, setUsename] = useState('')
  const [password, setPassword] = useState('')
  const [login, result] = useMutation(LOGIN, {
    onError: (error) => {
      console.log(error.graphQLErrors[0].message)
    },
  })

  useEffect(() => {
    if (result.data) {
      const token = result.data.login.value
      setToken(token)
      localStorage.setItem('loggedLibraryUser', token)
      setPage('authors')
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [result.data])

  const handleLogin = (e) => {
    e.preventDefault()
    login({ variables: { username, password } })
    setUsename('')
    setPassword('')
  }

  if (!show) {
    return null
  }

  return (
    <div>
      <form onSubmit={handleLogin}>
        <label htmlFor="username-input">username</label>
        <input value={username} onChange={(e) => setUsename(e.target.value)} />
        <br />
        <label htmlFor="password-input">password</label>
        <input value={password} onChange={(e) => setPassword(e.target.value)} />
        <button type="submit">login</button>
      </form>
    </div>
  )
}

export default LoginForm
