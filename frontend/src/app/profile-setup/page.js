'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { useAuth } from '@/hooks/useAuth'

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
      <div className='min-h-screen flex items-center justify-center'>
        <div className='text-center'>
          <div className='animate-spin rounded-full h-32 w-32 border-b-2 border-indigo-600'></div>
          <p className='mt-4 text-gray-600'>Loading...</p>
        </div>
      </div>
    )
  }

  if (!user) {
    return null
  }

  return (
    <div className='min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8'>
      <div className='max-w-2xl mx-auto'>
        <div className='bg-white shadow rounded-lg'>
          {/* Progress bar */}
          <div className='px-6 py-4 border-b border-gray-200'>
            <div className='flex items-center justify-between mb-4'>
              <h1 className='text-2xl font-bold text-gray-900'>
                Setup Your Profile
              </h1>
              <span className='text-sm text-gray-500'>Step {step} of 3</span>
            </div>
            <div className='w-full bg-gray-200 rounded-full h-2'>
              <div
                className='bg-indigo-600 h-2 rounded-full transition-all duration-300'
                style={{ width: `${(step / 3) * 100}%` }}
              ></div>
            </div>
          </div>

          <form onSubmit={handleSubmit} className='px-6 py-6 space-y-6'>
            {error && (
              <div className='rounded-md bg-red-50 p-4'>
                <div className='text-sm text-red-700'>{error}</div>
              </div>
            )}

            {/* Step 1: Basic Information */}
            {step === 1 && (
              <div className='space-y-6'>
                <h2 className='text-lg font-medium text-gray-900'>
                  Basic Information
                </h2>

                <div className='grid grid-cols-1 gap-6 sm:grid-cols-2'>
                  <div>
                    <label className='block text-sm font-medium text-gray-700'>
                      Full Name *
                    </label>
                    <input
                      type='text'
                      required
                      value={formData.name}
                      onChange={e => updateFormData('name', e.target.value)}
                      className='mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm'
                      placeholder='Enter your full name'
                    />
                  </div>

                  <div>
                    <label className='block text-sm font-medium text-gray-700'>
                      Current Role *
                    </label>
                    <input
                      type='text'
                      required
                      value={formData.role}
                      onChange={e => updateFormData('role', e.target.value)}
                      className='mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm'
                      placeholder='e.g., Software Engineer'
                    />
                  </div>

                  <div>
                    <label className='block text-sm font-medium text-gray-700'>
                      Years of Experience
                    </label>
                    <select
                      value={formData.experience_years}
                      onChange={e =>
                        updateFormData('experience_years', e.target.value)
                      }
                      className='mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm'
                    >
                      <option value=''>Select experience</option>
                      <option value='0'>Entry Level (0-1 years)</option>
                      <option value='2'>2-3 years</option>
                      <option value='4'>4-5 years</option>
                      <option value='6'>6-8 years</option>
                      <option value='9'>9-12 years</option>
                      <option value='13'>13+ years</option>
                    </select>
                  </div>

                  <div>
                    <label className='block text-sm font-medium text-gray-700'>
                      Location
                    </label>
                    <input
                      type='text'
                      value={formData.location}
                      onChange={e => updateFormData('location', e.target.value)}
                      className='mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm'
                      placeholder='e.g., San Francisco, CA'
                    />
                  </div>
                </div>

                <div>
                  <label className='block text-sm font-medium text-gray-700'>
                    Bio
                  </label>
                  <textarea
                    rows={4}
                    value={formData.bio}
                    onChange={e => updateFormData('bio', e.target.value)}
                    className='mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm'
                    placeholder='Tell us about yourself and your career goals...'
                  />
                </div>
              </div>
            )}

            {/* Step 2: Job Preferences */}
            {step === 2 && (
              <div className='space-y-6'>
                <h2 className='text-lg font-medium text-gray-900'>
                  Job Preferences
                </h2>

                <div className='grid grid-cols-1 gap-6 sm:grid-cols-2'>
                  <div>
                    <label className='block text-sm font-medium text-gray-700'>
                      Salary Range (USD)
                    </label>
                    <div className='mt-1 flex space-x-2'>
                      <input
                        type='number'
                        placeholder='Min'
                        value={formData.salary_min}
                        onChange={e =>
                          updateFormData('salary_min', e.target.value)
                        }
                        className='block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm'
                      />
                      <span className='flex items-center text-gray-500'>
                        to
                      </span>
                      <input
                        type='number'
                        placeholder='Max'
                        value={formData.salary_max}
                        onChange={e =>
                          updateFormData('salary_max', e.target.value)
                        }
                        className='block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm'
                      />
                    </div>
                  </div>

                  <div>
                    <label className='block text-sm font-medium text-gray-700'>
                      Work Authorization
                    </label>
                    <select
                      value={formData.work_authorization}
                      onChange={e =>
                        updateFormData('work_authorization', e.target.value)
                      }
                      className='mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm'
                    >
                      <option value=''>Select authorization</option>
                      <option value='authorized'>Authorized to work</option>
                      <option value='requires_sponsorship'>
                        Requires sponsorship
                      </option>
                      <option value='student_visa'>Student visa</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className='block text-sm font-medium text-gray-700'>
                    Skills (comma-separated)
                  </label>
                  <input
                    type='text'
                    value={formData.skills.join(', ')}
                    onChange={e => handleArrayInput('skills', e.target.value)}
                    className='mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm'
                    placeholder='e.g., JavaScript, React, Node.js, Python'
                  />
                </div>

                <div>
                  <label className='block text-sm font-medium text-gray-700'>
                    Preferred Job Types
                  </label>
                  <div className='mt-2 space-y-2'>
                    {['full-time', 'part-time', 'contract', 'remote'].map(
                      type => (
                        <label
                          key={type}
                          className='inline-flex items-center mr-6'
                        >
                          <input
                            type='checkbox'
                            checked={formData.preferred_job_types.includes(
                              type
                            )}
                            onChange={e => {
                              if (e.target.checked) {
                                updateFormData('preferred_job_types', [
                                  ...formData.preferred_job_types,
                                  type,
                                ])
                              } else {
                                updateFormData(
                                  'preferred_job_types',
                                  formData.preferred_job_types.filter(
                                    t => t !== type
                                  )
                                )
                              }
                            }}
                            className='form-checkbox h-4 w-4 text-indigo-600'
                          />
                          <span className='ml-2 text-sm text-gray-700 capitalize'>
                            {type.replace('-', ' ')}
                          </span>
                        </label>
                      )
                    )}
                  </div>
                </div>

                <div>
                  <label className='block text-sm font-medium text-gray-700'>
                    Preferred Locations (comma-separated)
                  </label>
                  <input
                    type='text'
                    value={formData.preferred_locations.join(', ')}
                    onChange={e =>
                      handleArrayInput('preferred_locations', e.target.value)
                    }
                    className='mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm'
                    placeholder='e.g., San Francisco, New York, Remote'
                  />
                </div>
              </div>
            )}

            {/* Step 3: Social Links */}
            {step === 3 && (
              <div className='space-y-6'>
                <h2 className='text-lg font-medium text-gray-900'>
                  Social Profiles (Optional)
                </h2>

                <div className='space-y-4'>
                  <div>
                    <label className='block text-sm font-medium text-gray-700'>
                      LinkedIn URL
                    </label>
                    <input
                      type='url'
                      value={formData.linkedin_url}
                      onChange={e =>
                        updateFormData('linkedin_url', e.target.value)
                      }
                      className='mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm'
                      placeholder='https://linkedin.com/in/yourprofile'
                    />
                  </div>

                  <div>
                    <label className='block text-sm font-medium text-gray-700'>
                      GitHub URL
                    </label>
                    <input
                      type='url'
                      value={formData.github_url}
                      onChange={e =>
                        updateFormData('github_url', e.target.value)
                      }
                      className='mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm'
                      placeholder='https://github.com/yourusername'
                    />
                  </div>

                  <div>
                    <label className='block text-sm font-medium text-gray-700'>
                      Portfolio URL
                    </label>
                    <input
                      type='url'
                      value={formData.portfolio_url}
                      onChange={e =>
                        updateFormData('portfolio_url', e.target.value)
                      }
                      className='mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm'
                      placeholder='https://yourportfolio.com'
                    />
                  </div>
                </div>
              </div>
            )}

            {/* Navigation buttons */}
            <div className='flex justify-between pt-6 border-t border-gray-200'>
              <button
                type='button'
                onClick={prevStep}
                disabled={step === 1}
                className='px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50 disabled:cursor-not-allowed'
              >
                Previous
              </button>

              {step < 3 ? (
                <button
                  type='button'
                  onClick={nextStep}
                  className='px-4 py-2 text-sm font-medium text-white bg-indigo-600 border border-transparent rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500'
                >
                  Next
                </button>
              ) : (
                <button
                  type='submit'
                  disabled={loading}
                  className='px-4 py-2 text-sm font-medium text-white bg-indigo-600 border border-transparent rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50'
                >
                  {loading ? 'Saving...' : 'Complete Setup'}
                </button>
              )}
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}
