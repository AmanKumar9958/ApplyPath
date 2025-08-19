import { useUser } from "@clerk/clerk-react"
import { Navigate, useLocation } from "react-router-dom";

const ProtectedRoutes = ({children}) => {

    const { isSignedIn, user, isLoaded } = useUser();   // signed in or not, user details, is user details loaded
    const { pathname } = useLocation();

    if(isLoaded && !isSignedIn && isSignedIn !== undefined){
        return <Navigate to="/?sign-in=true" />
    }

    // checking onboarding status
    if(user !== undefined && !user.unsafeMetadata?.role && pathname !== "/onboarding"){
        return <Navigate to="/onboarding" />
    }

    return children;
}

export default ProtectedRoutes