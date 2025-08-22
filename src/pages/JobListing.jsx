import { getJobs } from '@/api/jobsapi';
import useFetch from '@/hooks/useFetch';
import { useUser } from '@clerk/clerk-react';
import React, { useEffect, useState } from 'react';
import { BarLoader } from 'react-spinners';

const JobListing = () => {

  const { isLoaded } = useUser();

  const [searchQuery, setSearchQuery] = useState("");
  const [location, setLocation] = useState("");
  const [companyId, setCompanyId] = useState("");

  const {fn: fetchJobs, data: dataJobs, loading: loadingJobs} = useFetch(getJobs, {});

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
    <div className="p-6 max-w-5xl mx-auto">
      {/* Heading */}
      <h1 className="text-4xl font-extrabold mb-6 text-center bg-gradient-to-r from-yellow-400 via-pink-500 to-purple-600 bg-clip-text text-transparent animate-pulse">
        🚀 Latest Jobs
      </h1>

      {/* Search / Filters */}
      
    </div>
  );
};

export default JobListing;