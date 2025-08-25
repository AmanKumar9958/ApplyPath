import supabase, { setAuthToken } from "@/utils/supabase";
import { toast } from "react-toastify";

export async function savedJobs(token, { alreadySaved }, savedData) {
    setAuthToken(token);
    const { job_id } = savedData;
    const user_id = savedData.user_id;

    if (alreadySaved) {
        const { data, error } = await supabase
            .from("saved_jobs")
            .delete()
            .eq("job_id", job_id)
            .eq("user_id", user_id);

        if (error) {
            toast.error("Error deleting saved job");
            return null;
        }
        return data;
    } else {
        const { data, error } = await supabase
            .from("saved_jobs")
            .insert([{ job_id, user_id }])
            .select();

        if (error) {
            toast.error("Error saving job");
            return null;
        }
        return data;
    }
}