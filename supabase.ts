// Minimal types for selecting from Supabase REST only.
// We do not use the Supabase SDK; we fetch via the REST endpoint.

export type Project = {
  id: number;
  name: string;
  description: string | null;
  url: string | null;
  cover_image: string | null;
  additional_images: string[] | null;
  client_name: string | null;
  date: string | null;
  created_at: string | null;
  updated_at: string | null;
  summary: string | null;
};

export type ApiError = { error: string };
