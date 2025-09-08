import { supabase } from './supabase';
import type { Profile, Resume } from '@/types/database.types';

// Auth utilities
export const auth = {
  async signUp(email: string, password: string) {
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
    });
    return { data, error };
  },

  async signIn(email: string, password: string) {
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });
    return { data, error };
  },

  async signOut() {
    const { error } = await supabase.auth.signOut();
    return { error };
  },

  async getCurrentUser() {
    const {
      data: { user },
    } = await supabase.auth.getUser();
    return user;
  },

  async signInWithProvider(provider: 'google' | 'github') {
    const { data, error } = await supabase.auth.signInWithOAuth({
      provider,
      options: {
        redirectTo: `${location.origin}/auth/callback`,
      },
    });
    return { data, error };
  },
};

// Profile utilities
export const profiles = {
  async create(profile: Omit<Profile, 'id' | 'created_at'>) {
    const { data, error } = await supabase
      .from('profiles')
      .insert(profile)
      .select()
      .single();
    return { data, error };
  },

  async getByUserId(userId: string) {
    const { data, error } = await supabase
      .from('profiles')
      .select('*')
      .eq('user_id', userId)
      .single();
    return { data, error };
  },

  async update(id: string, updates: Partial<Profile>) {
    const { data, error } = await supabase
      .from('profiles')
      .update(updates)
      .eq('id', id)
      .select()
      .single();
    return { data, error };
  },
};

// Resume utilities
export const resumes = {
  async create(resume: Omit<Resume, 'id' | 'created_at'>) {
    const { data, error } = await supabase
      .from('resumes')
      .insert(resume)
      .select()
      .single();
    return { data, error };
  },

  async getByUserId(userId: string) {
    const { data, error } = await supabase
      .from('resumes')
      .select('*')
      .eq('user_id', userId)
      .order('created_at', { ascending: false });
    return { data, error };
  },

  async uploadFile(file: File, userId: string) {
    const fileExt = file.name.split('.').pop();
    const fileName = `${userId}/${Date.now()}.${fileExt}`;

    const { data, error } = await supabase.storage
      .from('resumes')
      .upload(fileName, file);

    if (error) return { data: null, error };

    const {
      data: { publicUrl },
    } = supabase.storage.from('resumes').getPublicUrl(fileName);

    return { data: { ...data, publicUrl }, error: null };
  },
};

// Job utilities
export const jobs = {
  async getAll(limit = 20, offset = 0) {
    const { data, error } = await supabase
      .from('jobs')
      .select('*')
      .order('created_at', { ascending: false })
      .range(offset, offset + limit - 1);
    return { data, error };
  },

  async getById(id: string) {
    const { data, error } = await supabase
      .from('jobs')
      .select('*')
      .eq('id', id)
      .single();
    return { data, error };
  },

  async search(
    query: string,
    filters?: { location?: string; company?: string }
  ) {
    let queryBuilder = supabase
      .from('jobs')
      .select('*')
      .or(`title.ilike.%${query}%, job_description.ilike.%${query}%`);

    if (filters?.location) {
      queryBuilder = queryBuilder.ilike('location', `%${filters.location}%`);
    }

    if (filters?.company) {
      queryBuilder = queryBuilder.ilike('company', `%${filters.company}%`);
    }

    const { data, error } = await queryBuilder
      .order('created_at', { ascending: false })
      .limit(50);

    return { data, error };
  },
};

// Error handling utility
export const handleSupabaseError = (error: unknown) => {
  console.error('Supabase Error:', error);

  if (error && typeof error === 'object' && 'message' in error) {
    return (error as { message: string }).message;
  }

  return 'An unexpected error occurred. Please try again.';
};
