'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { Github, Mail, Lock, Eye, EyeOff } from 'lucide-react'
import { useAuth } from '@/hooks/useAuth'
import { PageLayout } from '@/components/ui/page-layout'
import { MagneticButton } from '@/components/ui/magnetic-button'

export default function LoginPage() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const { signIn, signInWithProvider } = useAuth()
  const router = useRouter()

  const handleEmailLogin = async e => {
    e.preventDefault()
    setLoading(true)
    setError('')

    try {
      const { error } = await signIn(email, password)
      if (error) throw error
      router.push('/dashboard')
    } catch (error) {
      setError(error.message)
    } finally {
      setLoading(false)
    }
  }

  const handleOAuthLogin = async provider => {
    setLoading(true)
    setError('')

    try {
      const { error } = await signInWithProvider(provider)
      if (error) throw error
    } catch (error) {
      setError(error.message)
    } finally {
      setLoading(false)
    }
  }

  return (
    <PageLayout showNavigation={false} showFooter={false}>
      <div className='min-h-screen flex items-center justify-center px-container relative overflow-hidden'>
        {/* Background Effects */}
        <div className='absolute inset-0 -z-10'>
          <div className='absolute top-1/4 left-1/4 w-96 h-96 bg-gradient-to-r from-purple-400 to-pink-400 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse'></div>
          <div className='absolute bottom-1/4 right-1/4 w-96 h-96 bg-gradient-to-r from-blue-400 to-cyan-400 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse delay-75'></div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className='w-full max-w-md relative z-10'
        >
          {/* Header */}
          <div className='text-center mb-8'>
            {/* <motion.div
              className='w-20 h-20 mx-auto mb-6 rounded-2xl bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center'
              animate={{ rotate: 360 }}
              transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
            >
              <span className='text-white font-bold text-2xl'>A</span>
            </motion.div> */}

            <h1 className='display-text text-4xl mb-4'>
              Welcome <span className='text-gradient'>Back</span>
            </h1>
            <p className='text-gray-600 dark:text-gray-300'>
              Don't have an account?{' '}
              <Link
                href='/signup'
                className='text-gradient font-semibold hover:underline'
              >
                Sign up here
              </Link>
            </p>
          </div>

          {/* Login Form */}
          <div className='glass p-8 rounded-3xl space-y-6'>
            {/* OAuth Buttons */}
            <div className='space-y-3'>
              <MagneticButton
                onClick={() => handleOAuthLogin('google')}
                disabled={loading}
                className='w-full glass border border-white/20 py-4 rounded-xl font-medium flex items-center justify-center gap-3 hover:bg-white/10 transition-colors'
              >
                <svg className='w-5 h-5' viewBox='0 0 24 24'>
                  <path
                    fill='currentColor'
                    d='M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z'
                  />
                  <path
                    fill='currentColor'
                    d='M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z'
                  />
                  <path
                    fill='currentColor'
                    d='M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z'
                  />
                  <path
                    fill='currentColor'
                    d='M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z'
                  />
                </svg>
                Continue with Google
              </MagneticButton>

              <MagneticButton
                onClick={() => handleOAuthLogin('github')}
                disabled={loading}
                className='w-full bg-gray-900 dark:bg-gray-800 text-white py-4 rounded-xl font-medium flex items-center justify-center gap-3 hover:bg-gray-800 dark:hover:bg-gray-700 transition-colors'
              >
                <Github className='w-5 h-5' />
                Continue with GitHub
              </MagneticButton>
            </div>

            {/* Divider */}
            <div className='relative'>
              <div className='absolute inset-0 flex items-center'>
                <div className='w-full border-t border-white/20' />
              </div>
              <div className='relative flex justify-center text-sm'>
                <span className='px-4 bg-transparent text-gray-500'>
                  Or continue with email
                </span>
              </div>
            </div>

            {/* Email/Password Form */}
            <form onSubmit={handleEmailLogin} className='space-y-4'>
              {error && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className='glass border border-red-500/20 p-4 rounded-xl'
                >
                  <div className='text-sm text-red-600 dark:text-red-400'>
                    {error}
                  </div>
                </motion.div>
              )}

              <div className='space-y-4'>
                <div className='relative'>
                  <Mail className='absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400' />
                  <input
                    id='email'
                    name='email'
                    type='email'
                    autoComplete='email'
                    required
                    className='w-full pl-10 pr-4 py-4 glass border border-white/20 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent placeholder-gray-400 bg-white/5'
                    placeholder='Email address'
                    value={email}
                    onChange={e => setEmail(e.target.value)}
                  />
                </div>

                <div className='relative'>
                  <Lock className='absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400' />
                  <input
                    id='password'
                    name='password'
                    type={showPassword ? 'text' : 'password'}
                    autoComplete='current-password'
                    required
                    className='w-full pl-10 pr-12 py-4 glass border border-white/20 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent placeholder-gray-400 bg-white/5'
                    placeholder='Password'
                    value={password}
                    onChange={e => setPassword(e.target.value)}
                  />
                  <button
                    type='button'
                    onClick={() => setShowPassword(!showPassword)}
                    className='absolute right-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400 hover:text-gray-600 transition-colors'
                  >
                    {showPassword ? <EyeOff /> : <Eye />}
                  </button>
                </div>
              </div>

              <div className='flex items-center justify-between'>
                <div className='text-sm'>
                  <a
                    href='#'
                    className='text-purple-600 dark:text-purple-400 hover:underline font-medium'
                  >
                    Forgot password?
                  </a>
                </div>
              </div>

              <MagneticButton
                type='submit'
                disabled={loading}
                className='w-full btn-primary py-4 text-lg font-semibold'
              >
                {loading ? (
                  <div className='flex items-center justify-center gap-2'>
                    <div className='w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin' />
                    Signing in...
                  </div>
                ) : (
                  'Sign In'
                )}
              </MagneticButton>
            </form>
          </div>
        </motion.div>
      </div>
    </PageLayout>
  )
}
