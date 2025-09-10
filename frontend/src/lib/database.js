// Database helper functions for common Supabase operations

export class DatabaseService {
  constructor(supabase) {
    this.supabase = supabase;
  }

  // User Profile Operations
  async createUserProfile(userId, profileData) {
    const { data, error } = await this.supabase
      .from("profiles")
      .insert([
        {
          user_id: userId,
          ...profileData,
          created_at: new Date().toISOString(),
          updated_at: new Date().toISOString(),
        },
      ])
      .select();

    if (error) throw error;
    return data[0];
  }

  async getUserProfile(userId) {
    const { data, error } = await this.supabase
      .from("profiles")
      .select("*")
      .eq("user_id", userId)
      .single();

    if (error && error.code !== "PGRST116") throw error; // PGRST116 = no rows returned
    return data;
  }

  async updateUserProfile(userId, updates) {
    const { data, error } = await this.supabase
      .from("profiles")
      .update({
        ...updates,
        updated_at: new Date().toISOString(),
      })
      .eq("user_id", userId)
      .select();

    if (error) throw error;
    return data[0];
  }

  // Resume Operations
  async saveResume(userId, resumeData) {
    const { data, error } = await this.supabase
      .from("resumes")
      .insert([
        {
          user_id: userId,
          ...resumeData,
          created_at: new Date().toISOString(),
        },
      ])
      .select();

    if (error) throw error;
    return data[0];
  }

  async getUserResumes(userId) {
    const { data, error } = await this.supabase
      .from("resumes")
      .select("*")
      .eq("user_id", userId)
      .order("created_at", { ascending: false });

    if (error) throw error;
    return data;
  }

  // Job Operations
  async getJobsForUser(userId, limit = 10) {
    const { data, error } = await this.supabase
      .from("jobs")
      .select("*")
      .order("created_at", { ascending: false })
      .limit(limit);

    if (error) throw error;
    return data;
  }

  // Storage Operations
  async uploadFile(bucket, filePath, file) {
    const { data, error } = await this.supabase.storage
      .from(bucket)
      .upload(filePath, file);

    if (error) throw error;
    return data;
  }

  async getPublicUrl(bucket, filePath) {
    const { data } = this.supabase.storage.from(bucket).getPublicUrl(filePath);

    return data.publicUrl;
  }

  async deleteFile(bucket, filePath) {
    const { error } = await this.supabase.storage
      .from(bucket)
      .remove([filePath]);

    if (error) throw error;
  }
}
