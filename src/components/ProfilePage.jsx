import React from 'react'
import { UserProfile } from '@clerk/clerk-react';

const ProfilePage = () => {
    return (
        <div className="min-h-screen">
        {/* Centered container */}
        <div className="flex justify-center items-start mt-10">
            <UserProfile />
        </div>
        </div>
    );
}

export default ProfilePage