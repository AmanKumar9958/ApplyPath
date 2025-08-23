import { getJobs } from '@/api/jobsapi';
import JobCard from '@/components/JobCard';
import useFetch from '@/hooks/useFetch';
import { useUser } from '@clerk/clerk-react';
import React, { useEffect, useState } from 'react';
import { BarLoader } from 'react-spinners';

const JobListing = () => {

  const { isLoaded } = useUser();

  const [searchQuery, setSearchQuery] = useState("");
  const [location, setLocation] = useState("");
  const [companyId, setCompanyId] = useState("");

  const {fn: fetchJobs, data: jobsData, loading: loadingJobs} = useFetch(getJobs, {});

  useEffect(() => {
    if(isLoaded) {
      fetchJobs();
    }
  }, [isLoaded, location, companyId, searchQuery]);

  if (!isLoaded) {
    return (
      <BarLoader
        className="mb-4"
        width={"100%"}
        color="#FACC15" // Tailwind yellow-400
      />
    );
  }

  return (
    <div className="p-6 max-w-full mx-auto">
      {/* Heading */}
      <h1 className="text-4xl font-extrabold mb-6 text-center bg-gradient-to-r from-yellow-300 via-yellow-400 to-yellow-500 bg-clip-text text-transparent animate-pulse">
        🚀 Latest Jobs
      </h1>

      {/* Search / Filters */}

      {/* Showing bar loader */}
      {loadingJobs && (
        <BarLoader className="mb-4" width={"100%"} color="#FACC15" />
      )}

      {/* Showing Jobs */}
      {loadingJobs === false && (
        <div>
          {jobsData?.length ? (
            <div>
              {
                jobsData.map((job) => {
                  return <JobCard key={job.id} job={job} />;
                })
              }
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