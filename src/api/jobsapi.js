import supabase from "@/utils/supabase";

export async function getJobs({ location, company_id, SearchQuery }) {
  let query = supabase
    .from("jobs")
    .select("*, company:companies(name, logo_url), saved: saved_jobs(id)");

  if (location) {
    query = query.eq("location", location);
  }

  if (company_id) {
    query = query.eq("company_id", company_id);
  }

  if (SearchQuery) {
    query = query.ilike("title", `%${SearchQuery}%`);
  }

  const { data, error } = await query;

  if (error) {
    throw new Error(error.message);
  }

  return data;
}