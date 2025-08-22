import supabaseClient from "@/utils/supabase";

export async function getJobs(token, {location, company_id, SearchQuery}){
    const supabase = await supabaseClient(token);
    let query = supabase.from('jobs').select("*");

    if(location){
        query = query.eq('location', location);
    }

    if(company_id){
        query = query.eq('company_id', company_id);
    }

    if(SearchQuery){
        query = query.ilike('title', `%${SearchQuery}%`)
    }

    const { data, error } = await query;

    if (error) {
        throw new Error(error.message);
    }

    return data;
}