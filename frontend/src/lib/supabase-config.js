// Supabase Configuration Constants

export const SUPABASE_CONFIG = {
  // Storage buckets
  BUCKETS: {
    RESUMES: "resumes",
    PROFILE_IMAGES: "profile-images",
    TAILORED_RESUMES: "tailored-resumes",
  },

  // Database tables
  TABLES: {
    PROFILES: "profiles",
    RESUMES: "resumes",
    JOBS: "jobs",
    TAILORED_RESUMES: "tailored_resumes",
    USER_PREFERENCES: "user_preferences",
    APPLICATIONS: "applications",
  },

  // OAuth providers
  OAUTH_PROVIDERS: {
    GOOGLE: "google",
    GITHUB: "github",
    LINKEDIN: "linkedin",
  },

  // File upload limits
  FILE_LIMITS: {
    RESUME_MAX_SIZE: 5 * 1024 * 1024, // 5MB
    ALLOWED_RESUME_TYPES: [
      "application/pdf",
      "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
    ],
    PROFILE_IMAGE_MAX_SIZE: 2 * 1024 * 1024, // 2MB
    ALLOWED_IMAGE_TYPES: ["image/jpeg", "image/png", "image/webp"],
  },
};

// Database schema types (for reference)
export const SCHEMA_TYPES = {
  PROFILES: {
    user_id: "uuid",
    name: "text",
    role: "text",
    location: "text",
    salary_min: "integer",
    salary_max: "integer",
    experience_years: "integer",
    skills: "text[]",
    bio: "text",
    linkedin_url: "text",
    github_url: "text",
    portfolio_url: "text",
    created_at: "timestamp",
    updated_at: "timestamp",
  },

  RESUMES: {
    id: "uuid",
    user_id: "uuid",
    file_name: "text",
    file_url: "text",
    parsed_data: "jsonb",
    created_at: "timestamp",
  },

  JOBS: {
    id: "uuid",
    title: "text",
    company: "text",
    location: "text",
    job_description: "text",
    requirements: "text[]",
    salary_range: "text",
    source_url: "text",
    source: "text",
    created_at: "timestamp",
  },
};
