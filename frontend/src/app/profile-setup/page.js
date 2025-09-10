'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { motion, AnimatePresence } from 'framer-motion'
import {
  User,
  Briefcase,
  MapPin,
  DollarSign,
  Globe,
  Github,
  Linkedin,
  ExternalLink,
  ArrowRight,
  ArrowLeft,
  Sparkles,
  Code,
  Target,
  Heart,
  TrendingUp,
  FileText,
  Shield,
  Twitter,
} from 'lucide-react'
import { useAuth } from '@/hooks/useAuth'
import { PageLayout } from '@/components/ui/page-layout'
import { MagneticButton } from '@/components/ui/magnetic-button'

export default function ProfileSetupPage() {
  const { user, loading: authLoading } = useAuth()
  const router = useRouter()
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [step, setStep] = useState(1)

  // Form data
  const [formData, setFormData] = useState({
    name: '',
    role: '',
    experience_years: '',
    location: '',
    salary_min: '',
    salary_max: '',
    skills: [],
    bio: '',
    preferred_job_types: [],
    preferred_locations: [],
    work_authorization: '',
    linkedin_url: '',
    github_url: '',
    portfolio_url: '',
  })

  // Redirect if not authenticated
  useEffect(() => {
    if (!authLoading && !user) {
      router.push('/login')
    }
  }, [user, authLoading, router])

  const updateFormData = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value,
    }))
  }

  const handleArrayInput = (field, value) => {
    const items = value
      .split(',')
      .map(item => item.trim())
      .filter(Boolean)
    updateFormData(field, items)
  }

  const handleSubmit = async e => {
    e.preventDefault()
    if (!user) return

    setLoading(true)
    setError('')

    try {
      // Prepare the data
      const profileData = {
        ...formData,
        experience_years: parseInt(formData.experience_years) || null,
        salary_min: parseInt(formData.salary_min) || null,
        salary_max: parseInt(formData.salary_max) || null,
        profile_completed: true,
        onboarding_completed: true,
      }

      const response = await fetch('/api/profile', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(profileData),
      })

      if (!response.ok) {
        const errorData = await response.json()
        throw new Error(errorData.error || 'Failed to save profile')
      }

      const result = await response.json()
      console.log('Profile saved:', result)

      // Redirect to dashboard
      router.push('/dashboard')
    } catch (error) {
      console.error('Profile setup error:', error)
      setError(error.message)
    } finally {
      setLoading(false)
    }
  }

  const nextStep = () => {
    if (step < 3) setStep(step + 1)
  }

  const prevStep = () => {
    if (step > 1) setStep(step - 1)
  }

  if (authLoading) {
    return (
      <PageLayout showNavigation={false} showFooter={false}>
        <div className='min-h-screen flex items-center justify-center'>
          <motion.div
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
            className='text-center'
          >
            {/* <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 2, repeat: Infinity, ease: 'linear' }}
              className='w-16 h-16 mx-auto mb-6 rounded-2xl bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center'
            >
              <Sparkles className='w-8 h-8 text-white' />
            </motion.div> */}
            <p className='text-xl text-gradient font-semibold'>
              Setting up your workspace...
            </p>
          </motion.div>
        </div>
      </PageLayout>
    )
  }

  if (!user) {
    return null
  }

  const stepConfig = [
    {
      title: 'Basic Information',
      subtitle: 'Tell us about yourself',
      icon: User,
      color: 'from-purple-500 to-pink-500',
    },
    {
      title: 'Job Preferences',
      subtitle: 'What are you looking for?',
      icon: Target,
      color: 'from-blue-500 to-cyan-500',
    },
    {
      title: 'Social Profiles',
      subtitle: 'Connect your professional profiles',
      icon: Globe,
      color: 'from-green-500 to-emerald-500',
    },
  ]

  return (
    <PageLayout showNavigation={false} showFooter={false}>
      <div className='min-h-screen px-container relative overflow-hidden py-12'>
        {/* Background Effects */}
        <div className='absolute inset-0 -z-10'>
          <div className='absolute top-1/4 left-1/4 w-96 h-96 bg-gradient-to-r from-purple-400 to-pink-400 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse'></div>
          <div className='absolute bottom-1/4 right-1/4 w-96 h-96 bg-gradient-to-r from-blue-400 to-cyan-400 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse delay-75'></div>
          <div className='absolute top-1/3 right-1/3 w-64 h-64 bg-gradient-to-r from-green-400 to-blue-400 rounded-full mix-blend-multiply filter blur-xl opacity-15 animate-pulse delay-150'></div>
        </div>

        <div className='max-w-4xl mx-auto relative z-10'>
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: -50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className='text-center mb-12'
          >
            {/* <motion.div
              className='w-24 h-24 mx-auto mb-8 rounded-3xl bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center'
              animate={{
                rotate: [0, 360],
                scale: [1, 1.1, 1],
              }}
              transition={{
                rotate: { duration: 20, repeat: Infinity, ease: 'linear' },
                scale: { duration: 2, repeat: Infinity, ease: 'easeInOut' },
              }}
            >
              <Heart className='text-white w-12 h-12' />
            </motion.div> */}

            <h1 className='display-text text-5xl md:text-6xl mb-6'>
              Let's Build Your{' '}
              <span className='text-gradient'>Dream Profile</span>
            </h1>
            <p className='text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto'>
              Help us understand your career goals so we can find the perfect
              opportunities for you
            </p>
          </motion.div>

          {/* Progress Steps */}
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className='flex justify-center mb-12'
          >
            <div className='flex items-center space-x-4 glass p-4 rounded-2xl'>
              {stepConfig.map((stepInfo, index) => {
                const StepIcon = stepInfo.icon
                const isActive = step === index + 1
                const isCompleted = step > index + 1

                return (
                  <div key={index} className='flex items-center'>
                    <div
                      className={`
                      relative w-12 h-12 rounded-xl flex items-center justify-center transition-all duration-300
                      ${
                        isActive
                          ? `bg-gradient-to-br ${stepInfo.color} text-white shadow-lg scale-110`
                          : isCompleted
                            ? 'bg-green-500 text-white'
                            : 'bg-gray-200 dark:bg-gray-700 text-gray-500'
                      }
                    `}
                    >
                      <StepIcon className='w-6 h-6' />
                      {isActive && (
                        <motion.div
                          className='absolute inset-0 rounded-xl bg-white/20'
                          animate={{ scale: [1, 1.2, 1] }}
                          transition={{ duration: 2, repeat: Infinity }}
                        />
                      )}
                    </div>
                    {index < stepConfig.length - 1 && (
                      <div
                        className={`
                        w-16 h-1 mx-4 rounded-full transition-colors duration-300
                        ${step > index + 1 ? 'bg-green-500' : 'bg-gray-200 dark:bg-gray-700'}
                      `}
                      />
                    )}
                  </div>
                )
              })}
            </div>
          </motion.div>

          {/* Main Form */}
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className='glass p-8 md:p-12 rounded-3xl'
          >
            {/* Step Header */}
            <div className='text-center mb-8'>
              <h2 className='display-text text-3xl md:text-4xl mb-2'>
                {stepConfig[step - 1].title}
              </h2>
              <p className='text-gray-600 dark:text-gray-300 text-lg'>
                {stepConfig[step - 1].subtitle}
              </p>
            </div>

            <form onSubmit={handleSubmit} className='space-y-8'>
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

              {/* Step 1: Basic Information */}
              {step === 1 && (
                <motion.div
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.5 }}
                  className='space-y-6'
                >
                  <div className='grid md:grid-cols-2 gap-6'>
                    <div>
                      <label className='block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-3'>
                        <User className='inline w-4 h-4 mr-2' />
                        Full Name
                      </label>
                      <input
                        type='text'
                        className='input-field'
                        value={formData.name}
                        onChange={e => updateFormData('name', e.target.value)}
                        placeholder='Your full name'
                        required
                      />
                    </div>
                    <div>
                      <label className='block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-3'>
                        <Briefcase className='inline w-4 h-4 mr-2' />
                        Current Role
                      </label>
                      <input
                        type='text'
                        className='input-field'
                        value={formData.role}
                        onChange={e => updateFormData('role', e.target.value)}
                        placeholder='e.g., Software Engineer'
                        required
                      />
                    </div>
                  </div>

                  <div className='grid md:grid-cols-2 gap-6'>
                    <div>
                      <label className='block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-3'>
                        <TrendingUp className='inline w-4 h-4 mr-2' />
                        Experience Level
                      </label>
                      <select
                        className='input-field'
                        value={formData.experience_years}
                        onChange={e =>
                          updateFormData('experience_years', e.target.value)
                        }
                        required
                      >
                        <option value=''>Select your experience level</option>
                        <option value='0'>🌱 Entry Level (0-1 years)</option>
                        <option value='2'>🚀 Mid Level (2-3 years)</option>
                        <option value='4'>⭐ Experienced (4-5 years)</option>
                        <option value='6'>💼 Senior (6-8 years)</option>
                        <option value='9'>👑 Lead (9-12 years)</option>
                        <option value='13'>🎯 Principal (13+ years)</option>
                      </select>
                    </div>
                    <div>
                      <label className='block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-3'>
                        <MapPin className='inline w-4 h-4 mr-2' />
                        Location
                      </label>
                      <input
                        type='text'
                        className='input-field'
                        value={formData.location}
                        onChange={e =>
                          updateFormData('location', e.target.value)
                        }
                        placeholder='e.g., San Francisco, CA'
                      />
                    </div>
                  </div>

                  <div>
                    <label className='block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-3'>
                      <FileText className='inline w-4 h-4 mr-2' />
                      Bio
                    </label>
                    <textarea
                      rows={4}
                      className='input-field resize-none'
                      value={formData.bio}
                      onChange={e => updateFormData('bio', e.target.value)}
                      placeholder='Tell us about yourself and your career goals... ✨'
                    />
                  </div>
                </motion.div>
              )}

              {/* Step 2: Job Preferences */}
              {step === 2 && (
                <motion.div
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.5 }}
                  className='space-y-6'
                >
                  <div className='grid md:grid-cols-2 gap-6'>
                    <div>
                      <label className='block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-3'>
                        <DollarSign className='inline w-4 h-4 mr-2' />
                        Salary Range (USD)
                      </label>
                      <div className='flex space-x-3'>
                        <input
                          type='number'
                          placeholder='Min salary'
                          value={formData.salary_min}
                          onChange={e =>
                            updateFormData('salary_min', e.target.value)
                          }
                          className='input-field'
                        />
                        <div className='flex items-center px-3 text-gray-500 dark:text-gray-400'>
                          →
                        </div>
                        <input
                          type='number'
                          placeholder='Max salary'
                          value={formData.salary_max}
                          onChange={e =>
                            updateFormData('salary_max', e.target.value)
                          }
                          className='input-field'
                        />
                      </div>
                    </div>

                    <div>
                      <label className='block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-3'>
                        <Shield className='inline w-4 h-4 mr-2' />
                        Work Authorization
                      </label>
                      <select
                        value={formData.work_authorization}
                        onChange={e =>
                          updateFormData('work_authorization', e.target.value)
                        }
                        className='input-field'
                      >
                        <option value=''>Select work status</option>
                        <option value='authorized'>
                          ✅ Authorized to work
                        </option>
                        <option value='requires_sponsorship'>
                          🏢 Requires sponsorship
                        </option>
                        <option value='student_visa'>🎓 Student visa</option>
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className='block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-3'>
                      <Code className='inline w-4 h-4 mr-2' />
                      Skills
                    </label>
                    <input
                      type='text'
                      value={formData.skills.join(', ')}
                      onChange={e => handleArrayInput('skills', e.target.value)}
                      className='input-field'
                      placeholder='e.g., JavaScript, React, Node.js, Python, Design, Marketing'
                    />
                    <p className='text-sm text-gray-500 dark:text-gray-400 mt-2'>
                      💡 Separate skills with commas
                    </p>
                  </div>

                  <div>
                    <label className='block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-4'>
                      <Briefcase className='inline w-4 h-4 mr-2' />
                      Preferred Job Types
                    </label>
                    <div className='grid grid-cols-2 md:grid-cols-4 gap-4'>
                      {[
                        { value: 'full-time', label: 'Full-time', icon: '💼' },
                        { value: 'part-time', label: 'Part-time', icon: '⏰' },
                        { value: 'contract', label: 'Contract', icon: '📝' },
                        { value: 'remote', label: 'Remote', icon: '🏠' },
                      ].map(type => (
                        <motion.label
                          key={type.value}
                          whileHover={{ scale: 1.02 }}
                          className={`
                          flex items-center p-4 rounded-xl border-2 cursor-pointer transition-all duration-300
                          ${
                            formData.preferred_job_types.includes(type.value)
                              ? 'border-purple-500 bg-purple-50 dark:bg-purple-900/20 text-purple-600 dark:text-purple-400'
                              : 'border-gray-200 dark:border-gray-700 hover:border-gray-300 dark:hover:border-gray-600'
                          }
                        `}
                        >
                          <input
                            type='checkbox'
                            checked={formData.preferred_job_types.includes(
                              type.value
                            )}
                            onChange={e => {
                              if (e.target.checked) {
                                updateFormData('preferred_job_types', [
                                  ...formData.preferred_job_types,
                                  type.value,
                                ])
                              } else {
                                updateFormData(
                                  'preferred_job_types',
                                  formData.preferred_job_types.filter(
                                    t => t !== type.value
                                  )
                                )
                              }
                            }}
                            className='sr-only'
                          />
                          <span className='text-2xl mr-3'>{type.icon}</span>
                          <span className='font-medium'>{type.label}</span>
                        </motion.label>
                      ))}
                    </div>
                  </div>

                  <div>
                    <label className='block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-3'>
                      <MapPin className='inline w-4 h-4 mr-2' />
                      Preferred Locations
                    </label>
                    <input
                      type='text'
                      value={formData.preferred_locations.join(', ')}
                      onChange={e =>
                        handleArrayInput('preferred_locations', e.target.value)
                      }
                      className='input-field'
                      placeholder='e.g., San Francisco, New York, Remote, Austin'
                    />
                    <p className='text-sm text-gray-500 dark:text-gray-400 mt-2'>
                      🌍 Separate locations with commas
                    </p>
                  </div>
                </motion.div>
              )}

              {/* Step 3: Social Links */}
              {step === 3 && (
                <motion.div
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.5 }}
                  className='space-y-6'
                >
                  <div className='text-center mb-8'>
                    <p className='text-gray-600 dark:text-gray-300'>
                      Connect your professional profiles to showcase your work
                      🌟
                    </p>
                  </div>

                  <div className='grid md:grid-cols-2 gap-6'>
                    <div>
                      <label className='block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-3'>
                        <Globe className='inline w-4 h-4 mr-2' />
                        LinkedIn URL
                      </label>
                      <input
                        type='url'
                        value={formData.linkedin_url}
                        onChange={e =>
                          updateFormData('linkedin_url', e.target.value)
                        }
                        className='input-field'
                        placeholder='https://linkedin.com/in/yourprofile'
                      />
                    </div>

                    <div>
                      <label className='block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-3'>
                        <Github className='inline w-4 h-4 mr-2' />
                        GitHub URL
                      </label>
                      <input
                        type='url'
                        value={formData.github_url}
                        onChange={e =>
                          updateFormData('github_url', e.target.value)
                        }
                        className='input-field'
                        placeholder='https://github.com/yourusername'
                      />
                    </div>

                    <div>
                      <label className='block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-3'>
                        <ExternalLink className='inline w-4 h-4 mr-2' />
                        Portfolio URL
                      </label>
                      <input
                        type='url'
                        value={formData.portfolio_url}
                        onChange={e =>
                          updateFormData('portfolio_url', e.target.value)
                        }
                        className='input-field'
                        placeholder='https://yourportfolio.com'
                      />
                    </div>

                    <div>
                      <label className='block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-3'>
                        <Twitter className='inline w-4 h-4 mr-2' />
                        Twitter URL
                      </label>
                      <input
                        type='url'
                        value={formData.twitter_url || ''}
                        onChange={e =>
                          updateFormData('twitter_url', e.target.value)
                        }
                        className='input-field'
                        placeholder='https://twitter.com/yourusername'
                      />
                    </div>
                  </div>

                  <div className='glass p-6 rounded-2xl text-center'>
                    <Sparkles className='w-8 h-8 mx-auto mb-3 text-purple-500' />
                    <p className='text-sm text-gray-600 dark:text-gray-300'>
                      <span className='font-semibold'>Pro tip:</span> Adding
                      your social profiles helps employers learn more about your
                      work and increases your chances of getting hired!
                    </p>
                  </div>
                </motion.div>
              )}

              {/* Navigation Buttons */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
                className='flex justify-between items-center pt-8'
              >
                <MagneticButton
                  type='button'
                  onClick={prevStep}
                  disabled={step === 1}
                  variant='outline'
                  className={`
                  px-6 py-3 rounded-2xl font-semibold transition-all duration-300
                  ${
                    step === 1
                      ? 'opacity-50 cursor-not-allowed'
                      : 'hover:scale-105 active:scale-95'
                  }
                `}
                >
                  <ArrowLeft className='w-4 h-4 mr-2' />
                  Previous
                </MagneticButton>

                <div className='flex space-x-3'>
                  {Array.from({ length: 3 }, (_, i) => (
                    <div
                      key={i}
                      className={`
                      w-3 h-3 rounded-full transition-all duration-300
                      ${
                        step === i + 1
                          ? 'bg-gradient-to-r from-purple-500 to-pink-500 scale-110'
                          : step > i + 1
                            ? 'bg-green-500'
                            : 'bg-gray-300 dark:bg-gray-600'
                      }
                    `}
                    />
                  ))}
                </div>

                {step < 3 ? (
                  <MagneticButton
                    type='button'
                    onClick={nextStep}
                    className='px-6 py-3 rounded-2xl font-semibold bg-gradient-to-r from-purple-500 to-pink-500 text-white hover:scale-105 active:scale-95 transition-all duration-300'
                  >
                    Next
                    <ArrowRight className='w-4 h-4 ml-2' />
                  </MagneticButton>
                ) : (
                  <MagneticButton
                    type='submit'
                    disabled={loading}
                    className={`
                    px-8 py-3 rounded-2xl font-semibold bg-gradient-to-r from-green-500 to-emerald-500 text-white transition-all duration-300
                    ${
                      loading
                        ? 'opacity-50 cursor-not-allowed'
                        : 'hover:scale-105 active:scale-95'
                    }
                  `}
                  >
                    {loading ? (
                      <>
                        <motion.div
                          animate={{ rotate: 360 }}
                          transition={{
                            duration: 1,
                            repeat: Infinity,
                            ease: 'linear',
                          }}
                          className='w-4 h-4 mr-2 border-2 border-white border-t-transparent rounded-full'
                        />
                        Saving...
                      </>
                    ) : (
                      <>
                        <Heart className='w-4 h-4 mr-2' />
                        Complete Setup
                      </>
                    )}
                  </MagneticButton>
                )}
              </motion.div>
            </form>
          </motion.div>
        </div>
      </div>
    </PageLayout>
  )
}
