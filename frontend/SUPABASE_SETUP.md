# Supabase Setup Guide

## Overview
This project uses Supabase for authentication, database, and file storage. The setup includes:

- **Authentication**: Email/password and OAuth (Google, GitHub)
- **Database**: PostgreSQL with real-time subscriptions
- **Storage**: File uploads for resumes and profile images

## Configuration Files

### Core Files (Different Use Cases)
- `src/lib/supabase.js` - **Client-side** Supabase client (for React components)
- `src/lib/supabase-server.js` - **Middleware** client (for auth routing)
- `src/lib/supabase-server-component.js` - **Server Components & API Routes** client
- `middleware.js` - Auth middleware for protected routes

### When to Use Which File:

| File | Use Case | Example |
|------|----------|---------|
| `supabase.js` | Client Components, Browser | `useEffect`, onClick handlers |
| `supabase-server.js` | Middleware only | Route protection, session refresh |
| `supabase-server-component.js` | Server Components, API Routes | `page.js`, `route.js` files |

### Components & Hooks
- `src/components/providers/supabase-provider.js` - React context provider
- `src/hooks/useAuth.js` - Authentication hook
- `src/lib/database.js` - Database operation helpers

### Configuration
- `src/lib/supabase-config.js` - Constants and schema definitions
- `.env.local` - Environment variables (not committed)

## Environment Variables Required

```env
NEXT_PUBLIC_SUPABASE_URL=your_supabase_project_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
SUPABASE_SERVICE_ROLE_KEY=your_supabase_service_role_key
```

## Next Steps

1. **Create Supabase Project**: Go to [supabase.com](https://supabase.com) and create a new project
2. **Get API Keys**: Copy your project URL and API keys to `.env.local`
3. **Set up Database Tables**: Run SQL migrations for users, profiles, resumes, jobs tables
4. **Configure Storage**: Create buckets for resumes and profile images
5. **Enable Auth Providers**: Configure OAuth providers in Supabase dashboard

## Usage Examples

### Client-Side Authentication
```javascript
import { useAuth } from '@/hooks/useAuth'

function LoginComponent() {
  const { signIn, signUp, user, loading } = useAuth()
  // Use signIn, signUp functions
}
```

### Server Component Database Access
```javascript
import { createClient } from '@/lib/supabase-server-component'

export default async function ProfilePage() {
  const supabase = createClient()
  const { data: user } = await supabase.auth.getUser()
  return <div>Welcome {user?.email}</div>
}
```

### API Route
```javascript
import { createClient } from '@/lib/supabase-server-component'

export async function GET() {
  const supabase = createClient()
  const { data } = await supabase.from('profiles').select('*')
  return Response.json(data)
}
```

### Database Operations
```javascript
import { supabase } from '@/lib/supabase'
import { DatabaseService } from '@/lib/database'

const db = new DatabaseService(supabase)
const profile = await db.getUserProfile(userId)
```

### File Upload
```javascript
import { supabase } from '@/lib/supabase'
import { SUPABASE_CONFIG } from '@/lib/supabase-config'

const { data, error } = await supabase.storage
  .from(SUPABASE_CONFIG.BUCKETS.RESUMES)
  .upload(`${userId}/resume.pdf`, file)
```
