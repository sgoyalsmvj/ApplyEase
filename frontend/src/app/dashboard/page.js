'use client'

import { useEffect, useState, useCallback } from 'react'
import { useRouter } from 'next/navigation'
import { motion, AnimatePresence } from 'framer-motion'
import {
  User,
  Briefcase,
  MapPin,
  DollarSign,
  FileText,
  Search,
  Target,
  TrendingUp,
  BarChart3,
  Upload,
  Sparkles,
  Settings,
  LogOut,
  Calendar,
  Bell,
  Heart,
  Star,
  Zap,
  Clock,
  Eye,
} from 'lucide-react'
import { useAuth } from '@/hooks/useAuth'
import { DatabaseService } from '@/lib/database'
import { useSupabase } from '@/components/providers/supabase-provider'
import { PageLayout } from '@/components/ui/page-layout'
import { MagneticButton } from '@/components/ui/magnetic-button'

export default function DashboardPage() {
  const { user, loading: authLoading, signOut } = useAuth()
  const { supabase } = useSupabase()
  const router = useRouter()
  const [profile, setProfile] = useState(null)
  const [loading, setLoading] = useState(true)

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

  useEffect(() => {
    if (!authLoading && !user) {
      router.push('/login')
      return
    }

    if (user) {
      loadProfile()
    }
  }, [user, authLoading, router, loadProfile])

  const handleSignOut = async () => {
    await signOut()
    router.push('/')
  }

  if (authLoading || loading) {
    return (
      <PageLayout showNavigation={false} showFooter={false}>
        <div className='min-h-screen flex items-center justify-center'>
          <motion.div
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
            className='text-center'
          >
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 2, repeat: Infinity, ease: 'linear' }}
              className='w-20 h-20 mx-auto mb-8 rounded-3xl bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center'
            >
              <Sparkles className='w-10 h-10 text-white' />
            </motion.div>
            <h2 className='text-2xl font-bold text-gradient mb-4'>
              Loading Your Dashboard
            </h2>
            <p className='text-gray-600 dark:text-gray-300'>
              Preparing your personalized workspace...
            </p>
          </motion.div>
        </div>
      </PageLayout>
    )
  }

  if (!user) {
    return null
  }

  return (
    <PageLayout showNavigation={false} showFooter={false}>
      <div className='min-h-screen px-container relative overflow-hidden'>
        {/* Background Effects */}
        <div className='absolute inset-0 -z-10'>
          <div className='absolute top-1/4 left-1/4 w-96 h-96 bg-gradient-to-r from-purple-400 to-pink-400 rounded-full mix-blend-multiply filter blur-xl opacity-10 animate-pulse'></div>
          <div className='absolute bottom-1/4 right-1/4 w-96 h-96 bg-gradient-to-r from-blue-400 to-cyan-400 rounded-full mix-blend-multiply filter blur-xl opacity-10 animate-pulse delay-75'></div>
          <div className='absolute top-1/3 right-1/3 w-64 h-64 bg-gradient-to-r from-green-400 to-blue-400 rounded-full mix-blend-multiply filter blur-xl opacity-10 animate-pulse delay-150'></div>
        </div>

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className='pt-8 pb-12'
        >
          <div className='flex flex-col md:flex-row md:items-center md:justify-between gap-6'>
            <div>
              <motion.h1
                className='display-text text-4xl md:text-5xl mb-4'
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
              >
                Welcome back,{' '}
                <span className='text-gradient'>
                  {profile?.name?.split(' ')[0] || 'there'}
                </span>
                ! 👋
              </motion.h1>
              <motion.p
                className='text-xl text-gray-600 dark:text-gray-300'
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 0.4 }}
              >
                Ready to accelerate your career journey today?
              </motion.p>
            </div>

            <motion.div
              className='flex items-center gap-4'
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.6 }}
            >
              <MagneticButton
                onClick={() => router.push('/profile-setup')}
                variant='outline'
                className='flex items-center gap-2'
              >
                <Settings className='w-4 h-4' />
                Settings
              </MagneticButton>
              <MagneticButton
                onClick={handleSignOut}
                variant='outline'
                className='flex items-center gap-2 border-red-500 text-red-500 hover:bg-red-500 hover:text-white'
              >
                <LogOut className='w-4 h-4' />
                Sign Out
              </MagneticButton>
            </motion.div>
          </div>
        </motion.div>

        {/* Main Content */}
        <main className='pb-12'>
          {/* Main Content Grid */}
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className='grid grid-cols-1 lg:grid-cols-3 gap-8 mb-12'
          >
            {/* Profile Summary Card */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className='lg:col-span-2 glass p-8 rounded-3xl'
            >
              <div className='flex items-center justify-between mb-6'>
                <h3 className='display-text text-2xl'>
                  <User className='inline w-6 h-6 mr-3 text-purple-500' />
                  Profile Overview
                </h3>
                <MagneticButton
                  onClick={() => router.push('/profile-setup')}
                  variant='outline'
                  className='text-sm'
                >
                  <Settings className='w-4 h-4 mr-2' />
                  Edit
                </MagneticButton>
              </div>

              <div className='grid grid-cols-1 sm:grid-cols-2 gap-6'>
                <div className='group'>
                  <div className='flex items-center mb-2'>
                    <Briefcase className='w-4 h-4 mr-2 text-blue-500' />
                    <span className='text-sm font-semibold text-gray-600 dark:text-gray-300'>
                      Role
                    </span>
                  </div>
                  <p className='text-lg font-medium text-gray-900 dark:text-gray-100 group-hover:text-gradient transition-all duration-300'>
                    {profile?.role || 'Not specified'}
                  </p>
                </div>

                <div className='group'>
                  <div className='flex items-center mb-2'>
                    <TrendingUp className='w-4 h-4 mr-2 text-green-500' />
                    <span className='text-sm font-semibold text-gray-600 dark:text-gray-300'>
                      Experience
                    </span>
                  </div>
                  <p className='text-lg font-medium text-gray-900 dark:text-gray-100 group-hover:text-gradient transition-all duration-300'>
                    {profile?.experience_years
                      ? `${profile.experience_years} years`
                      : 'Not specified'}
                  </p>
                </div>

                <div className='group'>
                  <div className='flex items-center mb-2'>
                    <MapPin className='w-4 h-4 mr-2 text-orange-500' />
                    <span className='text-sm font-semibold text-gray-600 dark:text-gray-300'>
                      Location
                    </span>
                  </div>
                  <p className='text-lg font-medium text-gray-900 dark:text-gray-100 group-hover:text-gradient transition-all duration-300'>
                    {profile?.location || 'Not specified'}
                  </p>
                </div>

                <div className='group'>
                  <div className='flex items-center mb-2'>
                    <DollarSign className='w-4 h-4 mr-2 text-emerald-500' />
                    <span className='text-sm font-semibold text-gray-600 dark:text-gray-300'>
                      Salary Range
                    </span>
                  </div>
                  <p className='text-lg font-medium text-gray-900 dark:text-gray-100 group-hover:text-gradient transition-all duration-300'>
                    {profile?.salary_min && profile?.salary_max
                      ? `$${profile.salary_min.toLocaleString()} - $${profile.salary_max.toLocaleString()}`
                      : 'Not specified'}
                  </p>
                </div>
              </div>

              {profile?.skills && profile.skills.length > 0 && (
                <div className='mt-6'>
                  <div className='flex items-center mb-4'>
                    <Zap className='w-4 h-4 mr-2 text-purple-500' />
                    <span className='text-sm font-semibold text-gray-600 dark:text-gray-300'>
                      Skills
                    </span>
                  </div>
                  <div className='flex flex-wrap gap-2'>
                    {profile.skills.map((skill, index) => (
                      <motion.span
                        key={index}
                        initial={{ opacity: 0, scale: 0 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.3, delay: index * 0.1 }}
                        whileHover={{ scale: 1.05 }}
                        className='px-3 py-1 rounded-xl text-sm font-medium glass border border-purple-200 dark:border-purple-700 text-purple-600 dark:text-purple-400 hover:bg-purple-100 dark:hover:bg-purple-900/50 transition-all duration-300'
                      >
                        {skill}
                      </motion.span>
                    ))}
                  </div>
                </div>
              )}

              {profile?.bio && (
                <div className='mt-6'>
                  <div className='flex items-center mb-4'>
                    <FileText className='w-4 h-4 mr-2 text-blue-500' />
                    <span className='text-sm font-semibold text-gray-600 dark:text-gray-300'>
                      Bio
                    </span>
                  </div>
                  <p className='text-gray-700 dark:text-gray-300 leading-relaxed'>
                    {profile.bio}
                  </p>
                </div>
              )}
            </motion.div>

            {/* Quick Stats Card */}
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.6 }}
              className='glass p-6 rounded-3xl'
            >
              <h3 className='display-text text-xl mb-6'>
                <BarChart3 className='inline w-5 h-5 mr-2 text-green-500' />
                Quick Stats
              </h3>

              <div className='space-y-6'>
                <div className='text-center'>
                  <motion.div
                    className='w-16 h-16 mx-auto mb-3 rounded-2xl bg-gradient-to-br from-blue-500 to-cyan-500 flex items-center justify-center'
                    whileHover={{ scale: 1.1, rotate: 5 }}
                    transition={{ duration: 0.3 }}
                  >
                    <Target className='w-8 h-8 text-white' />
                  </motion.div>
                  <p className='text-2xl font-bold text-gradient'>0</p>
                  <p className='text-sm text-gray-600 dark:text-gray-400'>
                    Applications Sent
                  </p>
                </div>

                <div className='text-center'>
                  <motion.div
                    className='w-16 h-16 mx-auto mb-3 rounded-2xl bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center'
                    whileHover={{ scale: 1.1, rotate: -5 }}
                    transition={{ duration: 0.3 }}
                  >
                    <Heart className='w-8 h-8 text-white' />
                  </motion.div>
                  <p className='text-2xl font-bold text-gradient'>0</p>
                  <p className='text-sm text-gray-600 dark:text-gray-400'>
                    Favorites Saved
                  </p>
                </div>

                <div className='text-center'>
                  <motion.div
                    className='w-16 h-16 mx-auto mb-3 rounded-2xl bg-gradient-to-br from-orange-500 to-red-500 flex items-center justify-center'
                    whileHover={{ scale: 1.1, rotate: 5 }}
                    transition={{ duration: 0.3 }}
                  >
                    <Star className='w-8 h-8 text-white' />
                  </motion.div>
                  <p className='text-2xl font-bold text-gradient'>0</p>
                  <p className='text-sm text-gray-600 dark:text-gray-400'>
                    Profile Views
                  </p>
                </div>
              </div>

              <motion.div
                className='mt-6 p-4 rounded-2xl bg-gradient-to-r from-purple-500/10 to-pink-500/10 border border-purple-200 dark:border-purple-800'
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 1 }}
              >
                <div className='flex items-center mb-2'>
                  <Sparkles className='w-4 h-4 mr-2 text-purple-500' />
                  <span className='text-sm font-semibold text-purple-600 dark:text-purple-400'>
                    Pro Tip
                  </span>
                </div>
                <p className='text-sm text-gray-600 dark:text-gray-300'>
                  Complete your profile to get 10x more visibility from
                  recruiters!
                </p>
              </motion.div>
            </motion.div>
          </motion.div>

          {/* Recent Activity Section */}
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.8 }}
            className='glass p-8 rounded-3xl'
          >
            <div className='flex items-center justify-between mb-6'>
              <h3 className='display-text text-2xl'>
                <Clock className='inline w-6 h-6 mr-3 text-orange-500' />
                Recent Activity
              </h3>
              <MagneticButton variant='outline' className='text-sm'>
                <Eye className='w-4 h-4 mr-2' />
                View All
              </MagneticButton>
            </div>

            <div className='text-center py-12'>
              <motion.div
                className='w-20 h-20 mx-auto mb-6 rounded-3xl bg-gradient-to-br from-purple-500/20 to-pink-500/20 flex items-center justify-center'
                animate={{
                  y: [0, -10, 0],
                  rotate: [0, 5, -5, 0],
                }}
                transition={{
                  duration: 4,
                  repeat: Infinity,
                  ease: 'easeInOut',
                }}
              >
                <Briefcase className='w-10 h-10 text-purple-500' />
              </motion.div>

              <h4 className='text-xl font-semibold mb-3 text-gray-900 dark:text-gray-100'>
                Ready to Start Your Journey?
              </h4>
              <p className='text-gray-600 dark:text-gray-300 mb-6 max-w-md mx-auto'>
                Complete your profile and start applying to see your activity
                here. The perfect job is waiting for you!
              </p>

              <div className='flex flex-col sm:flex-row gap-4 justify-center'>
                <MagneticButton
                  className='group'
                  onClick={() => router.push('/jobs')}
                >
                  <Search className='w-4 h-4 mr-2 group-hover:rotate-12 transition-transform duration-300' />
                  Find Jobs
                </MagneticButton>

                <MagneticButton
                  variant='outline'
                  className='group'
                  onClick={() => router.push('/profile-setup')}
                >
                  <Upload className='w-4 h-4 mr-2 group-hover:scale-110 transition-transform duration-300' />
                  Upload Resume
                </MagneticButton>
              </div>
            </div>
          </motion.div>
        </main>
      </div>
    </PageLayout>
  )
}
