import { getJobs } from '@/api/jobsapi';
import JobCard from '@/components/JobCard';
import useFetch from '@/hooks/useFetch';
import { useUser, useAuth } from '@clerk/clerk-react';
import React, { useEffect, useState } from 'react';
import { BarLoader } from 'react-spinners';
import { setAuthToken } from '@/utils/supabase';

const JobListing = () => {
  const { isLoaded, user } = useUser();
  const { getToken } = useAuth(); // 👈 yeh se milega token method

  const [searchQuery, setSearchQuery] = useState("");
  const [location, setLocation] = useState("");
  const [companyId, setCompanyId] = useState("");

  const {
    fn: fetchJobs,
    data: jobsData,
    loading: loadingJobs,
    error,
  } = useFetch(getJobs, []);

  useEffect(() => {
    const loadJobs = async () => {
      if (isLoaded && user) {
        try {
          // Clerk se Supabase ke liye token lo
          const token = await getToken({ template: "supabase" });
          console.log("🔑 Clerk token:", token);

          if (token) {
            setAuthToken(token); // supabase client me token inject karo
          }

          fetchJobs({
            location,
            company_id: companyId,
            SearchQuery: searchQuery,
          });
        } catch (err) {
          console.error("❌ Error setting Supabase token:", err);
        }
      }
    };

    loadJobs();
  }, [isLoaded, user, location, companyId, searchQuery]);

  if (!isLoaded) {
    return (
      <BarLoader
        className="mb-4"
        width={"100%"}
        color="#FACC15"
      />
    );
  }

  return (
    <div className="p-6 max-w-full mx-auto">
      <h1 className="text-4xl font-extrabold mb-6 text-center bg-gradient-to-r from-yellow-300 via-yellow-400 to-yellow-500 bg-clip-text text-transparent animate-pulse">
        🚀 Latest Jobs
      </h1>

      {loadingJobs && (
        <BarLoader className="mb-4" width={"100%"} color="#FACC15" />
      )}

      {error && (
        <div className="text-red-500 font-bold">
          Failed to load jobs: {error.message}
        </div>
      )}

      {!loadingJobs && !error && (
        <div>
          {jobsData?.length ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {jobsData.map((job) => (
                <JobCard
                  key={job.id}
                  job={job}
                  savedInt={job?.saved?.length > 0}
                />
              ))}
            </div>
          ) : (
            <div>No Jobs Found</div>
          )}
        </div>
      )}
    </div>
  );
};

export default JobListing;
