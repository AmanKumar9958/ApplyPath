import { useUser } from "@clerk/clerk-react";
import BarLoader from "react-spinners/BarLoader";
import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const OnBoarding = () => {
  const { isSignedIn, user, isLoaded } = useUser();
  const navigate = useNavigate();

  const handleRoleSelection = async(role) => {
    await user
    .update({
      unsafeMetadata:{role},
    })
    .then(() => {
      navigate(role === 'recruiter' ? '/post-job' : '/jobs');
    })
    .catch((error) => {
      console.error("Error updating user role:", error);
    });
  }

  useEffect(() => {
    if(user?.unsafeMetadata?.role){
      navigate(user.unsafeMetadata.role === 'recruiter' ? '/post-job' : '/jobs');
    }
  }, [user, navigate])

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
    <div className="min-h-screen flex flex-col items-center justify-center bg-black text-white px-6">
      {/* Heading */}
      <h2 className="font-extrabold text-6xl sm:text-8xl tracking-tighter text-center">
        I am a..
      </h2>

      {/* Options */}
      <div className="mt-16 grid grid-cols-1 md:grid-cols-2 gap-6 w-full max-w-2xl">
        <button 
          className="hover:cursor-pointer py-8 rounded-lg font-bold text-2xl bg-gradient-to-r from-yellow-400 to-yellow-500 text-black shadow-lg hover:scale-105 hover:shadow-yellow-500/50 transition-transform"
          onClick={() => handleRoleSelection("candidate")}
        >
          Candidate
        </button>
        <button 
          className="hover:cursor-pointer py-8 rounded-lg font-bold text-2xl bg-gradient-to-r from-yellow-500 to-yellow-400 text-black shadow-lg hover:scale-105 hover:shadow-yellow-400/50 transition-transform"
          onClick={() => handleRoleSelection("recruiter")}
        >
          Recruiter
        </button>
      </div>

      {/* Subtext */}
      <p className="mt-12 text-gray-400 text-lg max-w-xl text-center">
        Choose your role to get started with{" "}
        <span className="text-yellow-400 font-semibold">Hirenix</span>.  
        Whether you're finding your <span className="text-yellow-300">dream job </span>  
        or hiring top talent, we’ve got you covered 🚀
      </p>
    </div>
  );
};

export default OnBoarding;
