# ApplyEase Authentication & User Profile System

This document outlines the authentication and user profile system implementation for ApplyEase.

## Overview

The authentication system is built using:
- **Supabase Auth** for user authentication
- **Next.js 14+** with App Router
- **Server-Side Rendering (SSR)** support
- **Row Level Security (RLS)** for data protection

## Architecture

### Authentication Flow

1. **User Registration/Login** (`/login`, `/signup`)
2. **OAuth Callback** (`/auth/callback`)
3. **Profile Setup** (`/profile-setup`)
4. **Dashboard Access** (`/dashboard`)

### Key Components

#### 1. Authentication Hook (`src/hooks/useAuth.js`)
- Manages user session state
- Provides sign-in, sign-up, and sign-out functions
- Supports OAuth providers (Google, GitHub)
- Handles metadata for profile creation

#### 2. Supabase Provider (`src/components/providers/supabase-provider.js`)
- Provides Supabase client throughout the app
- Handles SSR and client-side rendering

#### 3. Middleware (`src/middleware.js`)
- Protects routes based on authentication status
- Redirects users based on profile completion
- Handles OAuth callback routing

#### 4. Database Service (`src/lib/database.js`)
- Abstracted database operations
- User profile CRUD operations
- Type-safe database interactions

## Database Schema

### Profiles Table (`profiles`)

```sql
CREATE TABLE profiles (
    id UUID REFERENCES auth.users(id) ON DELETE CASCADE PRIMARY KEY,
    name TEXT,
    email TEXT,
    role TEXT,
    experience_years INTEGER,
    location TEXT,
    salary_min INTEGER,
    salary_max INTEGER,
    skills TEXT[],
    bio TEXT,
    preferred_work_type TEXT,
    availability_date DATE,
    profile_completed BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);
```

### Row Level Security (RLS)

- Users can only access their own profile data
- Automatic profile creation on user signup
- Secure data isolation between users

## API Routes

### Profile Management (`/api/profile`)

- **POST**: Create or update user profile
- **GET**: Retrieve user profile
- Authentication required via Supabase session

## Pages & Routes

### Public Routes
- `/` - Landing page
- `/login` - User login
- `/signup` - User registration

### Protected Routes
- `/dashboard` - Main dashboard (requires completed profile)
- `/profile-setup` - Profile setup form (redirects if completed)

### Auth Routes
- `/auth/callback` - OAuth callback handler

## Environment Variables

Required environment variables in `.env.local`:

```env
# Supabase
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
SUPABASE_SERVICE_ROLE_KEY=your_service_role_key

# Google OAuth (optional)
GOOGLE_CLIENT_ID=your_google_client_id
GOOGLE_CLIENT_SECRET=your_google_client_secret

# GitHub OAuth (optional)
GITHUB_CLIENT_ID=your_github_client_id
GITHUB_CLIENT_SECRET=your_github_client_secret
```

## Security Features

1. **Row Level Security (RLS)** - Database-level security
2. **JWT Token Validation** - Automatic session management
3. **CSRF Protection** - Built into Supabase Auth
4. **Secure Cookies** - HTTPOnly, Secure, SameSite
5. **Route Protection** - Middleware-based access control

## Implementation Details

### User Registration Flow

1. User fills out signup form
2. Supabase creates auth user
3. Database trigger creates profile record
4. User redirected to profile setup
5. Profile completion enables dashboard access

### OAuth Integration

1. User clicks OAuth provider button
2. Redirected to provider's authorization page
3. Provider redirects to `/auth/callback`
4. Session established and user redirected to profile setup

### Profile Setup

1. Multi-step form for user information
2. Real-time validation and error handling
3. API route saves data to profiles table
4. Completion status tracked in database

### Dashboard Protection

1. Middleware checks authentication status
2. Verifies profile completion
3. Redirects to appropriate page based on state
4. Loads user data securely

## Development Commands

```bash
# Start development server
pnpm run dev

# Run linting
pnpm run lint

# Format code
pnpm run format

# Build for production
pnpm run build
```

## Database Migration

To set up the database schema, run the SQL migration:

```bash
# Connect to your Supabase database and run:
# database/migrations/001_create_profiles_table.sql
```

## Testing Authentication

1. Start the development server: `pnpm run dev`
2. Navigate to `http://localhost:3000`
3. Test signup/login flows
4. Verify profile setup and dashboard access
5. Test OAuth providers (if configured)

## Common Issues & Solutions

### Issue: User stuck in redirect loop
**Solution**: Check profile completion status in database

### Issue: OAuth not working
**Solution**: Verify redirect URLs in provider settings

### Issue: RLS policy errors
**Solution**: Ensure policies match the table schema

### Issue: Session not persisting
**Solution**: Check cookie settings and domain configuration

## Next Steps

1. Add password reset functionality
2. Implement email verification
3. Add two-factor authentication
4. Create admin dashboard
5. Add audit logging

## File Structure

```
src/
├── app/
│   ├── auth/callback/route.js     # OAuth callback
│   ├── api/profile/route.js       # Profile API
│   ├── dashboard/page.js          # Dashboard page
│   ├── login/page.js             # Login page
│   ├── signup/page.js            # Signup page
│   └── profile-setup/page.js     # Profile setup
├── components/
│   └── providers/
│       └── supabase-provider.js  # Supabase context
├── hooks/
│   └── useAuth.js                # Authentication hook
├── lib/
│   ├── database.js               # Database service
│   └── supabase/
│       ├── client.js             # Client-side client
│       └── server.js             # Server-side client
└── middleware.js                 # Route protection
```

This implementation provides a solid foundation for user authentication and profile management in the ApplyEase application.
