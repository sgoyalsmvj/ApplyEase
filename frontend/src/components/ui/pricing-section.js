'use client'

import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import { useState } from 'react'
import { Check, X, Zap, Crown, Rocket } from 'lucide-react'
import { MagneticButton } from './magnetic-button'

export function PricingSection() {
  const [ref, inView] = useInView({
    threshold: 0.1,
    triggerOnce: true,
  })

  const [isAnnual, setIsAnnual] = useState(false)

  const plans = [
    {
      name: 'Starter',
      icon: Zap,
      description: 'Perfect for getting started',
      price: { monthly: 0, annual: 0 },
      popular: false,
      features: [
        'Basic AI job matching',
        'Up to 5 applications per month',
        'Standard resume templates',
        'Email support',
        'Basic analytics',
      ],
      notIncluded: [
        'Priority support',
        'Advanced AI features',
        'Custom branding',
      ],
      gradient: 'from-gray-500 to-gray-600',
      buttonText: 'Get Started Free',
    },
    {
      name: 'Pro',
      icon: Crown,
      description: 'Most popular choice',
      price: { monthly: 19, annual: 15 },
      popular: true,
      features: [
        'Advanced AI job matching',
        'Unlimited applications',
        'Premium resume templates',
        'Priority support',
        'Advanced analytics',
        'Interview preparation',
        'Salary insights',
        'Company culture match',
      ],
      notIncluded: ['Custom branding', 'API access'],
      gradient: 'from-purple-500 to-pink-500',
      buttonText: 'Start Pro Trial',
    },
    {
      name: 'Enterprise',
      icon: Rocket,
      description: 'For teams and agencies',
      price: { monthly: 49, annual: 39 },
      popular: false,
      features: [
        'Everything in Pro',
        'Team collaboration',
        'Custom branding',
        'API access',
        'Dedicated support',
        'Custom integrations',
        'Analytics dashboard',
        'White-label solution',
      ],
      notIncluded: [],
      gradient: 'from-blue-500 to-cyan-500',
      buttonText: 'Contact Sales',
    },
  ]

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.1,
      },
    },
  }

  const cardVariants = {
    hidden: { y: 100, opacity: 0, scale: 0.8 },
    visible: {
      y: 0,
      opacity: 1,
      scale: 1,
      transition: {
        type: 'spring',
        stiffness: 100,
        damping: 12,
      },
    },
  }

  return (
    <section
      ref={ref}
      className='section px-container relative overflow-hidden'
    >
      {/* Background */}
      <div className='absolute inset-0 -z-10'>
        <div className='absolute inset-0 bg-gradient-to-b from-purple-50/30 to-pink-50/30 dark:from-purple-900/20 dark:to-pink-900/20' />
      </div>

      <div className='container'>
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
          transition={{ duration: 0.8 }}
          className='text-center mb-16'
        >
          <h2 className='display-text text-5xl md:text-6xl mb-6'>
            Simple, <span className='text-gradient'>Transparent</span> Pricing
          </h2>
          <p className='text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto mb-12'>
            Choose the plan that fits your career goals. All plans include our
            core AI features.
          </p>

          {/* Billing Toggle */}
          <motion.div
            className='flex items-center justify-center gap-4 mb-8'
            initial={{ opacity: 0, scale: 0.8 }}
            animate={
              inView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.8 }
            }
            transition={{ delay: 0.3 }}
          >
            <span
              className={`text-lg font-medium transition-colors ${!isAnnual ? 'text-purple-600 dark:text-purple-400' : 'text-gray-500'}`}
            >
              Monthly
            </span>
            <motion.button
              onClick={() => setIsAnnual(!isAnnual)}
              className='relative w-16 h-8 bg-gray-200 dark:bg-gray-700 rounded-full p-1 focus:outline-none focus:ring-2 focus:ring-purple-500'
              whileTap={{ scale: 0.95 }}
            >
              <motion.div
                className='w-6 h-6 bg-white dark:bg-gray-800 rounded-full shadow-md'
                animate={{ x: isAnnual ? 32 : 0 }}
                transition={{ type: 'spring', stiffness: 500, damping: 30 }}
              />
            </motion.button>
            <span
              className={`text-lg font-medium transition-colors ${isAnnual ? 'text-purple-600 dark:text-purple-400' : 'text-gray-500'}`}
            >
              Annual
            </span>
            {isAnnual && (
              <motion.span
                initial={{ opacity: 0, scale: 0 }}
                animate={{ opacity: 1, scale: 1 }}
                className='px-3 py-1 bg-gradient-to-r from-green-500 to-emerald-500 text-white text-sm rounded-full font-medium'
              >
                Save 25%
              </motion.span>
            )}
          </motion.div>
        </motion.div>

        {/* Pricing Cards */}
        <motion.div
          variants={containerVariants}
          initial='hidden'
          animate={inView ? 'visible' : 'hidden'}
          className='grid md:grid-cols-3 gap-8 max-w-5xl mx-auto'
        >
          {plans.map((plan, index) => (
            <motion.div
              key={index}
              variants={cardVariants}
              className={`relative group ${plan.popular ? 'md:-mt-8' : ''}`}
              whileHover={{
                y: -10,
                scale: 1.02,
              }}
            >
              {/* Popular Badge */}
              {plan.popular && (
                <motion.div
                  initial={{ opacity: 0, y: -20 }}
                  animate={
                    inView ? { opacity: 1, y: 0 } : { opacity: 0, y: -20 }
                  }
                  transition={{ delay: 0.5 + index * 0.1 }}
                  className='absolute -top-4 left-1/2 transform -translate-x-1/2 z-10'
                >
                  <span className='bg-gradient-to-r from-purple-500 to-pink-500 text-white px-6 py-2 rounded-full text-sm font-semibold shadow-lg'>
                    Most Popular
                  </span>
                </motion.div>
              )}

              <div
                className={`glass h-full p-8 rounded-3xl relative overflow-hidden ${plan.popular ? 'ring-2 ring-purple-500/50' : ''}`}
              >
                {/* Header */}
                <div className='mb-8'>
                  <div
                    className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${plan.gradient} p-4 mb-6`}
                  >
                    <plan.icon className='w-full h-full text-white' />
                  </div>

                  <h3 className='text-2xl font-bold mb-2'>{plan.name}</h3>
                  <p className='text-gray-600 dark:text-gray-300'>
                    {plan.description}
                  </p>
                </div>

                {/* Price */}
                <div className='mb-8'>
                  <div className='flex items-baseline gap-2'>
                    <span className='text-4xl font-bold'>
                      ${isAnnual ? plan.price.annual : plan.price.monthly}
                    </span>
                    <span className='text-gray-600 dark:text-gray-300'>
                      {plan.price.monthly > 0 ? '/month' : 'Free'}
                    </span>
                  </div>
                  {isAnnual && plan.price.monthly > 0 && (
                    <p className='text-sm text-gray-500 mt-1'>
                      Billed annually at ${plan.price.annual * 12}
                    </p>
                  )}
                </div>

                {/* Features */}
                <div className='mb-8'>
                  <ul className='space-y-3'>
                    {plan.features.map((feature, featureIndex) => (
                      <motion.li
                        key={featureIndex}
                        className='flex items-center gap-3'
                        initial={{ opacity: 0, x: -20 }}
                        animate={
                          inView ? { opacity: 1, x: 0 } : { opacity: 0, x: -20 }
                        }
                        transition={{
                          delay: 0.7 + index * 0.1 + featureIndex * 0.05,
                        }}
                      >
                        <Check className='w-5 h-5 text-green-500 flex-shrink-0' />
                        <span className='text-gray-700 dark:text-gray-300'>
                          {feature}
                        </span>
                      </motion.li>
                    ))}
                    {plan.notIncluded.map((feature, featureIndex) => (
                      <motion.li
                        key={`not-${featureIndex}`}
                        className='flex items-center gap-3 opacity-50'
                        initial={{ opacity: 0, x: -20 }}
                        animate={
                          inView
                            ? { opacity: 0.5, x: 0 }
                            : { opacity: 0, x: -20 }
                        }
                        transition={{
                          delay: 0.8 + index * 0.1 + featureIndex * 0.05,
                        }}
                      >
                        <X className='w-5 h-5 text-gray-400 flex-shrink-0' />
                        <span className='text-gray-500'>{feature}</span>
                      </motion.li>
                    ))}
                  </ul>
                </div>

                {/* CTA Button */}
                <MagneticButton
                  className={`w-full py-4 font-semibold rounded-xl transition-all duration-300 ${
                    plan.popular
                      ? 'btn-primary'
                      : 'glass border-2 border-transparent hover:border-purple-500/50'
                  }`}
                >
                  {plan.buttonText}
                </MagneticButton>

                {/* Background Glow */}
                <div
                  className={`absolute inset-0 bg-gradient-to-br ${plan.gradient} opacity-0 group-hover:opacity-5 transition-opacity duration-500 rounded-3xl`}
                />
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* FAQ Mention */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
          transition={{ duration: 0.8, delay: 0.8 }}
          className='text-center mt-16'
        >
          <p className='text-gray-600 dark:text-gray-300 mb-6'>
            Questions? We've got answers. Check out our{' '}
            <a
              href='#faq'
              className='text-purple-600 dark:text-purple-400 hover:underline font-medium'
            >
              FAQ section
            </a>{' '}
            or{' '}
            <a
              href='#contact'
              className='text-purple-600 dark:text-purple-400 hover:underline font-medium'
            >
              contact our team
            </a>
            .
          </p>

          <div className='flex flex-wrap justify-center gap-6 text-sm text-gray-500'>
            <span className='flex items-center gap-2'>
              ✅ 30-day money-back guarantee
            </span>
            <span className='flex items-center gap-2'>🔒 Secure payments</span>
            <span className='flex items-center gap-2'>📞 24/7 support</span>
          </div>
        </motion.div>
      </div>

      {/* Floating Elements */}
      <motion.div
        className='absolute top-20 right-20 w-24 h-24 morphing-blob opacity-10'
        style={{ background: 'var(--gradient-primary)' }}
        animate={{
          y: [0, -30, 0],
          x: [0, 15, 0],
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
      />
    </section>
  )
}
