'use client'

import { useEffect, useState, useCallback } from 'react'
import { useRouter } from 'next/navigation'
import { useAuth } from '@/hooks/useAuth'
import { DatabaseService } from '@/lib/database'
import { useSupabase } from '@/components/providers/supabase-provider'

export default function DashboardPage() {
  const { user, loading: authLoading, signOut } = useAuth()
  const { supabase } = useSupabase()
  const router = useRouter()
  const [profile, setProfile] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (!authLoading && !user) {
      router.push('/login')
      return
    }

    if (user) {
      loadProfile()
    }
  }, [user, authLoading, router, loadProfile])

  const loadProfile = useCallback(async () => {
    try {
      const db = new DatabaseService(supabase)
      const userProfile = await db.getUserProfile(user.id)

      if (!userProfile || !userProfile.profile_completed) {
        router.push('/profile-setup')
        return
      }

      setProfile(userProfile)
    } catch (error) {
      console.error('Error loading profile:', error)
    } finally {
      setLoading(false)
    }
  }, [user?.id, supabase, router])

  const handleSignOut = async () => {
    await signOut()
    router.push('/')
  }

  if (authLoading || loading) {
    return (
      <div className='min-h-screen flex items-center justify-center'>
        <div className='text-center'>
          <div className='animate-spin rounded-full h-32 w-32 border-b-2 border-indigo-600'></div>
          <p className='mt-4 text-gray-600'>Loading your dashboard...</p>
        </div>
      </div>
    )
  }

  if (!user) {
    return null
  }

  return (
    <div className='min-h-screen bg-gray-50'>
      {/* Header */}
      <header className='bg-white shadow'>
        <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>
          <div className='flex justify-between items-center py-6'>
            <div>
              <h1 className='text-3xl font-bold text-gray-900'>
                ApplyEase Dashboard
              </h1>
              <p className='text-gray-600'>
                Welcome back, {profile?.name || user.email}!
              </p>
            </div>
            <div className='flex items-center space-x-4'>
              <button
                onClick={() => router.push('/profile-setup')}
                className='text-gray-700 hover:text-gray-900'
              >
                Edit Profile
              </button>
              <button
                onClick={handleSignOut}
                className='bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-md text-sm font-medium'
              >
                Sign Out
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className='max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8'>
        <div className='grid grid-cols-1 gap-6 lg:grid-cols-3'>
          {/* Profile Summary */}
          <div className='lg:col-span-2'>
            <div className='bg-white overflow-hidden shadow rounded-lg'>
              <div className='px-4 py-5 sm:p-6'>
                <h3 className='text-lg leading-6 font-medium text-gray-900'>
                  Profile Summary
                </h3>
                <div className='mt-5 grid grid-cols-1 gap-5 sm:grid-cols-2'>
                  <div>
                    <dt className='text-sm font-medium text-gray-500'>Role</dt>
                    <dd className='mt-1 text-sm text-gray-900'>
                      {profile?.role || 'Not specified'}
                    </dd>
                  </div>
                  <div>
                    <dt className='text-sm font-medium text-gray-500'>
                      Experience
                    </dt>
                    <dd className='mt-1 text-sm text-gray-900'>
                      {profile?.experience_years
                        ? `${profile.experience_years} years`
                        : 'Not specified'}
                    </dd>
                  </div>
                  <div>
                    <dt className='text-sm font-medium text-gray-500'>
                      Location
                    </dt>
                    <dd className='mt-1 text-sm text-gray-900'>
                      {profile?.location || 'Not specified'}
                    </dd>
                  </div>
                  <div>
                    <dt className='text-sm font-medium text-gray-500'>
                      Salary Range
                    </dt>
                    <dd className='mt-1 text-sm text-gray-900'>
                      {profile?.salary_min && profile?.salary_max
                        ? `$${profile.salary_min.toLocaleString()} - $${profile.salary_max.toLocaleString()}`
                        : 'Not specified'}
                    </dd>
                  </div>
                </div>

                {profile?.skills && profile.skills.length > 0 && (
                  <div className='mt-5'>
                    <dt className='text-sm font-medium text-gray-500'>
                      Skills
                    </dt>
                    <dd className='mt-1'>
                      <div className='flex flex-wrap gap-2'>
                        {profile.skills.map((skill, index) => (
                          <span
                            key={index}
                            className='inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-indigo-100 text-indigo-800'
                          >
                            {skill}
                          </span>
                        ))}
                      </div>
                    </dd>
                  </div>
                )}

                {profile?.bio && (
                  <div className='mt-5'>
                    <dt className='text-sm font-medium text-gray-500'>Bio</dt>
                    <dd className='mt-1 text-sm text-gray-900'>
                      {profile.bio}
                    </dd>
                  </div>
                )}
              </div>
            </div>

            {/* Quick Actions */}
            <div className='mt-6 bg-white overflow-hidden shadow rounded-lg'>
              <div className='px-4 py-5 sm:p-6'>
                <h3 className='text-lg leading-6 font-medium text-gray-900'>
                  Quick Actions
                </h3>
                <div className='mt-5 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3'>
                  <button className='relative p-6 bg-gray-50 rounded-lg hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-indigo-500'>
                    <div>
                      <span className='rounded-lg inline-flex p-3 bg-indigo-600 text-white'>
                        <svg
                          className='w-6 h-6'
                          fill='none'
                          stroke='currentColor'
                          viewBox='0 0 24 24'
                        >
                          <path
                            strokeLinecap='round'
                            strokeLinejoin='round'
                            strokeWidth='2'
                            d='M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z'
                          />
                        </svg>
                      </span>
                    </div>
                    <div className='mt-4'>
                      <h3 className='text-lg font-medium text-gray-900'>
                        Upload Resume
                      </h3>
                      <p className='mt-2 text-sm text-gray-500'>
                        Add your resume for AI-powered tailoring
                      </p>
                    </div>
                  </button>

                  <button className='relative p-6 bg-gray-50 rounded-lg hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-indigo-500'>
                    <div>
                      <span className='rounded-lg inline-flex p-3 bg-green-600 text-white'>
                        <svg
                          className='w-6 h-6'
                          fill='none'
                          stroke='currentColor'
                          viewBox='0 0 24 24'
                        >
                          <path
                            strokeLinecap='round'
                            strokeLinejoin='round'
                            strokeWidth='2'
                            d='M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2-2v2m8 0V6a2 2 0 012 2v6a2 2 0 01-2 2H8a2 2 0 01-2-2V8a2 2 0 012-2z'
                          />
                        </svg>
                      </span>
                    </div>
                    <div className='mt-4'>
                      <h3 className='text-lg font-medium text-gray-900'>
                        Find Jobs
                      </h3>
                      <p className='mt-2 text-sm text-gray-500'>
                        Discover personalized job matches
                      </p>
                    </div>
                  </button>

                  <button className='relative p-6 bg-gray-50 rounded-lg hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-indigo-500'>
                    <div>
                      <span className='rounded-lg inline-flex p-3 bg-purple-600 text-white'>
                        <svg
                          className='w-6 h-6'
                          fill='none'
                          stroke='currentColor'
                          viewBox='0 0 24 24'
                        >
                          <path
                            strokeLinecap='round'
                            strokeLinejoin='round'
                            strokeWidth='2'
                            d='M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z'
                          />
                        </svg>
                      </span>
                    </div>
                    <div className='mt-4'>
                      <h3 className='text-lg font-medium text-gray-900'>
                        AI Insights
                      </h3>
                      <p className='mt-2 text-sm text-gray-500'>
                        Get personalized career recommendations
                      </p>
                    </div>
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className='space-y-6'>
            {/* Stats */}
            <div className='bg-white overflow-hidden shadow rounded-lg'>
              <div className='p-5'>
                <div className='flex items-center'>
                  <div className='flex-shrink-0'>
                    <svg
                      className='h-8 w-8 text-gray-400'
                      fill='none'
                      stroke='currentColor'
                      viewBox='0 0 24 24'
                    >
                      <path
                        strokeLinecap='round'
                        strokeLinejoin='round'
                        strokeWidth='2'
                        d='M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z'
                      />
                    </svg>
                  </div>
                  <div className='ml-5 w-0 flex-1'>
                    <dl>
                      <dt className='text-sm font-medium text-gray-500 truncate'>
                        Applications
                      </dt>
                      <dd className='text-lg font-medium text-gray-900'>0</dd>
                    </dl>
                  </div>
                </div>
              </div>
            </div>

            <div className='bg-white overflow-hidden shadow rounded-lg'>
              <div className='p-5'>
                <div className='flex items-center'>
                  <div className='flex-shrink-0'>
                    <svg
                      className='h-8 w-8 text-gray-400'
                      fill='none'
                      stroke='currentColor'
                      viewBox='0 0 24 24'
                    >
                      <path
                        strokeLinecap='round'
                        strokeLinejoin='round'
                        strokeWidth='2'
                        d='M13 7h8m0 0v8m0-8l-8 8-4-4-6 6'
                      />
                    </svg>
                  </div>
                  <div className='ml-5 w-0 flex-1'>
                    <dl>
                      <dt className='text-sm font-medium text-gray-500 truncate'>
                        Match Score
                      </dt>
                      <dd className='text-lg font-medium text-gray-900'>-</dd>
                    </dl>
                  </div>
                </div>
              </div>
            </div>

            {/* Recent Activity */}
            <div className='bg-white overflow-hidden shadow rounded-lg'>
              <div className='px-4 py-5 sm:p-6'>
                <h3 className='text-lg leading-6 font-medium text-gray-900'>
                  Recent Activity
                </h3>
                <div className='mt-5'>
                  <p className='text-sm text-gray-500'>
                    No recent activity yet.
                  </p>
                  <p className='text-sm text-gray-500 mt-2'>
                    Upload your resume or start applying to jobs to see your
                    activity here.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}
