'use client'

import { motion, AnimatePresence } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import { useState, useEffect } from 'react'
import { Bot, MessageCircle, Send, Sparkles } from 'lucide-react'

export function ChatbotSection() {
  const [ref, inView] = useInView({
    threshold: 0.1,
    triggerOnce: true,
  })

  const [messages, setMessages] = useState([])
  const [isTyping, setIsTyping] = useState(false)
  const [currentMessageIndex, setCurrentMessageIndex] = useState(0)

  const demoMessages = [
    {
      type: 'bot',
      content:
        "Hey there! 👋 I'm your AI job assistant. What kind of role are you looking for?",
      delay: 1000,
    },
    {
      type: 'user',
      content:
        "I'm looking for a frontend developer position at a tech startup",
      delay: 2000,
    },
    {
      type: 'bot',
      content:
        'Perfect! 🚀 I found 23 matching positions. Here are the top 3 that align with your skills:',
      delay: 1500,
    },
    {
      type: 'bot',
      content:
        '• Senior Frontend Dev at TechFlow (95% match)\n• React Developer at InnovateLab (92% match)\n• UI Engineer at StartupX (89% match)',
      delay: 2000,
    },
    {
      type: 'user',
      content: 'Tell me more about the TechFlow position',
      delay: 1500,
    },
    {
      type: 'bot',
      content:
        'Great choice! TechFlow offers remote work, equity, and focuses on sustainability tech. Should I start your application? 💼',
      delay: 2000,
    },
  ]

  useEffect(() => {
    if (!inView) return

    const timer = setTimeout(() => {
      if (currentMessageIndex < demoMessages.length) {
        const currentMessage = demoMessages[currentMessageIndex]

        if (currentMessage.type === 'bot') {
          setIsTyping(true)
          setTimeout(() => {
            setMessages(prev => [...prev, currentMessage])
            setIsTyping(false)
            setCurrentMessageIndex(prev => prev + 1)
          }, 1000)
        } else {
          setMessages(prev => [...prev, currentMessage])
          setCurrentMessageIndex(prev => prev + 1)
        }
      }
    }, demoMessages[currentMessageIndex]?.delay || 1000)

    return () => clearTimeout(timer)
  }, [currentMessageIndex, inView])

  return (
    <section ref={ref} className='section px-container relative'>
      {/* Background */}
      <div className='absolute inset-0 -z-10'>
        <div className='absolute inset-0 bg-gradient-to-br from-blue-50/50 to-purple-50/50 dark:from-blue-900/20 dark:to-purple-900/20' />
      </div>

      <div className='container'>
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
          transition={{ duration: 0.8 }}
          className='text-center mb-16'
        >
          <h2 className='display-text text-5xl md:text-6xl mb-6'>
            Meet Your <span className='text-gradient'>AI Assistant</span>
          </h2>
          <p className='text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto'>
            Experience the future of job searching with our intelligent AI that
            understands your needs
          </p>
        </motion.div>

        <div className='grid lg:grid-cols-2 gap-16 items-center'>
          {/* Chat Interface */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={inView ? { opacity: 1, x: 0 } : { opacity: 0, x: -50 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className='relative'
          >
            <div className='glass rounded-3xl p-6 max-w-md mx-auto lg:mx-0 relative overflow-hidden'>
              {/* Header */}
              <div className='flex items-center gap-3 mb-6 pb-4 border-b border-white/20'>
                <motion.div
                  className='w-12 h-12 rounded-full bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center'
                  animate={{ rotate: 360 }}
                  transition={{
                    duration: 20,
                    repeat: Infinity,
                    ease: 'linear',
                  }}
                >
                  <Bot className='w-6 h-6 text-white' />
                </motion.div>
                <div>
                  <h3 className='font-semibold'>AI Career Assistant</h3>
                  <div className='flex items-center gap-2 text-sm text-green-500'>
                    <div className='w-2 h-2 bg-green-500 rounded-full animate-pulse' />
                    Online
                  </div>
                </div>
              </div>

              {/* Messages */}
              <div className='h-96 overflow-y-auto space-y-4 mb-4 scrollbar-thin'>
                <AnimatePresence>
                  {messages.map((message, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, y: 20, scale: 0.8 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      transition={{ duration: 0.3 }}
                      className={`flex ${message.type === 'user' ? 'justify-end' : 'justify-start'}`}
                    >
                      <div
                        className={`max-w-xs p-3 rounded-2xl ${
                          message.type === 'user'
                            ? 'bg-gradient-to-r from-purple-500 to-pink-500 text-white ml-auto'
                            : 'bg-white/20 text-gray-800 dark:text-white mr-auto'
                        }`}
                      >
                        <p className='text-sm whitespace-pre-line'>
                          {message.content}
                        </p>
                      </div>
                    </motion.div>
                  ))}
                </AnimatePresence>

                {/* Typing Indicator */}
                {isTyping && (
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className='flex justify-start'
                  >
                    <div className='bg-white/20 p-3 rounded-2xl mr-auto'>
                      <div className='flex space-x-1'>
                        <motion.div
                          className='w-2 h-2 bg-gray-500 rounded-full'
                          animate={{ scale: [1, 1.2, 1] }}
                          transition={{
                            duration: 0.6,
                            repeat: Infinity,
                            delay: 0,
                          }}
                        />
                        <motion.div
                          className='w-2 h-2 bg-gray-500 rounded-full'
                          animate={{ scale: [1, 1.2, 1] }}
                          transition={{
                            duration: 0.6,
                            repeat: Infinity,
                            delay: 0.2,
                          }}
                        />
                        <motion.div
                          className='w-2 h-2 bg-gray-500 rounded-full'
                          animate={{ scale: [1, 1.2, 1] }}
                          transition={{
                            duration: 0.6,
                            repeat: Infinity,
                            delay: 0.4,
                          }}
                        />
                      </div>
                    </div>
                  </motion.div>
                )}
              </div>

              {/* Input */}
              <div className='flex items-center gap-3 p-3 bg-white/10 rounded-xl'>
                <input
                  type='text'
                  placeholder='Type your message...'
                  className='flex-1 bg-transparent outline-none text-sm placeholder-gray-400'
                  disabled
                />
                <motion.button
                  className='w-8 h-8 rounded-full bg-gradient-to-r from-purple-500 to-pink-500 flex items-center justify-center'
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                >
                  <Send className='w-4 h-4 text-white' />
                </motion.button>
              </div>

              {/* Floating Elements */}
              <motion.div
                className='absolute -top-4 -right-4 w-8 h-8 bg-yellow-400 rounded-full flex items-center justify-center'
                animate={{
                  y: [0, -10, 0],
                  rotate: [0, 180, 360],
                }}
                transition={{
                  duration: 4,
                  repeat: Infinity,
                  ease: 'easeInOut',
                }}
              >
                <Sparkles className='w-4 h-4 text-white' />
              </motion.div>
            </div>
          </motion.div>

          {/* Features List */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={inView ? { opacity: 1, x: 0 } : { opacity: 0, x: 50 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className='space-y-8'
          >
            {[
              {
                icon: '🧠',
                title: 'Smart Conversations',
                description:
                  'Natural language processing that understands your career goals and preferences.',
              },
              {
                icon: '⚡',
                title: 'Instant Recommendations',
                description:
                  'Get personalized job matches in real-time based on your skills and interests.',
              },
              {
                icon: '🎯',
                title: 'Application Assistance',
                description:
                  'Get help with cover letters, resume optimization, and interview preparation.',
              },
              {
                icon: '🌱',
                title: 'Career Growth',
                description:
                  'Receive guidance on skill development and career progression pathways.',
              },
            ].map((feature, index) => (
              <motion.div
                key={index}
                className='flex items-start gap-4 group'
                whileHover={{ x: 10 }}
                transition={{ duration: 0.2 }}
              >
                <div className='text-3xl group-hover:scale-110 transition-transform'>
                  {feature.icon}
                </div>
                <div>
                  <h3 className='text-xl font-semibold mb-2 group-hover:text-purple-600 dark:group-hover:text-purple-400 transition-colors'>
                    {feature.title}
                  </h3>
                  <p className='text-gray-600 dark:text-gray-300'>
                    {feature.description}
                  </p>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className='text-center mt-16'
        >
          <motion.button
            className='btn-primary text-lg px-10 py-5 inline-flex items-center gap-3'
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <MessageCircle className='w-5 h-5' />
            Start Chatting with AI
          </motion.button>
        </motion.div>
      </div>
    </section>
  )
}
