import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { apiFetch } from '../api/client.js'

const Login = () => {
  const navigate = useNavigate()
  const [mode, setMode] = useState('login')
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  async function onSubmit(e) {
    e.preventDefault()
    setError('')
    setLoading(true)
    try {
      const data = await apiFetch(mode === 'register' ? '/auth/register' : '/auth/login', {
        method: 'POST',
        body: JSON.stringify(mode === 'register' ? { name, email, password } : { email, password }),
      })
      if (data.token) localStorage.setItem('token', data.token)
      navigate('/')
    } catch (err) {
      setError(err.message || 'Login failed')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="mx-auto max-w-md py-16">
      <h1 className="text-2xl font-semibold text-neutral-900">
        {mode === 'register' ? 'Create account' : 'Sign in'}
      </h1>
      <p className="mt-2 text-sm text-neutral-500">
        {mode === 'register'
          ? 'Create an account to place orders and view your order history.'
          : 'Sign in to place orders and view your order history.'}
      </p>
      <form onSubmit={onSubmit} className="mt-8 space-y-4 rounded-xl border border-neutral-200 bg-white p-6 shadow-sm">
        {error && <p className="text-sm text-red-600">{error}</p>}
        {mode === 'register' && (
          <div>
            <label htmlFor="name" className="text-xs font-medium uppercase text-neutral-500">
              Name
            </label>
            <input
              id="name"
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
              className="mt-1 w-full rounded-lg border border-neutral-200 px-3 py-2 text-sm"
            />
          </div>
        )}
        <div>
          <label htmlFor="email" className="text-xs font-medium uppercase text-neutral-500">
            Email
          </label>
          <input
            id="email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="mt-1 w-full rounded-lg border border-neutral-200 px-3 py-2 text-sm"
          />
        </div>
        <div>
          <label htmlFor="password" className="text-xs font-medium uppercase text-neutral-500">
            Password
          </label>
          <input
            id="password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            className="mt-1 w-full rounded-lg border border-neutral-200 px-3 py-2 text-sm"
          />
        </div>
        <button
          type="submit"
          disabled={loading}
          className="w-full rounded-lg bg-neutral-900 py-2.5 text-sm font-semibold text-white hover:bg-neutral-800 disabled:opacity-50"
        >
          {loading ? 'Please wait…' : mode === 'register' ? 'Create account' : 'Sign in'}
        </button>
      </form>
      <button
        type="button"
        onClick={() => {
          setError('')
          setMode((current) => (current === 'register' ? 'login' : 'register'))
        }}
        className="mt-5 w-full text-center text-sm font-medium text-neutral-700 underline"
      >
        {mode === 'register' ? 'Already have an account? Sign in' : 'New customer? Create an account'}
      </button>
      <p className="mt-6 text-center text-sm text-neutral-500">
        <Link to="/" className="text-neutral-900 underline">
          Back to home
        </Link>
      </p>
    </div>
  )
}

export default Login
