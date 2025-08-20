import React, { useEffect, useState } from 'react'
import { Link, useSearchParams } from 'react-router-dom'
import HirenixLogo from './HirenixLogo'
import { SignedIn, SignedOut, SignIn, useUser } from '@clerk/clerk-react'
import { Button } from './ui/button'
import { PenBox } from 'lucide-react'
import CustomUserMenu from './CustomUserMenu'
import { ModeToggle } from './ModeToggle'

const Header = () => {

  // for showing modal for login
  const [showModal, setShowModal] = useState(false)

  // for showing post button only to user
  const { user } = useUser();

  // for redirecting unauthenticated users
  const [searchParams, setSearchParams] = useSearchParams();
  useEffect(() => {
    if(searchParams.get("sign-in")){
      setShowModal(true);
    }
  }, [searchParams]);

  // for closing modal when clicking outside
  const clickOutsideHandle = (e) =>{
    if(e.target === e.currentTarget){
      setShowModal(false);
      setSearchParams({});
    }
  }

  return (
    <div>
      <nav className="flex justify-between items-center px-3">
        <div>
          <Link to="/" className="inline-block w-fit">
            <HirenixLogo className="hirenix-logo" accent="yellow" />
          </Link>
        </div>
        <div className='flex items-center gap-5'>
          <div>
            <ModeToggle />
          </div>
          <div className='flex items-center gap-5'>
            <SignedOut>
              <Button className={"hover:cursor-pointer"} onClick={() => setShowModal(true)} >Log In</Button>
            </SignedOut>
            <SignedIn>
              {user?.unsafeMetadata?.role === 'recruiter' && (
                <Link to="/post-job">
                  <Button className={"rounded-full bg-yellow-300 hover:cursor-pointer hover:bg-yellow-400"}>
                    <PenBox size={20} className='mr-2' />
                    Post a Job
                  </Button>
                </Link>
              )}
              {/* <UserButton /> */}
              <CustomUserMenu />
            </SignedIn>
          </div>
        </div>
      </nav>

      {/* modal */}
      {showModal && (
        <div className='fixed inset-0 z-50 flex items-center justify-center bg-black/80'
          onClick={clickOutsideHandle}>
          <SignIn
            signUpForceRedirectUrl='/onboarding'
            fallbackRedirectUrl='/onboarding'
          />
        </div>
      )}


    </div>
  )
}

export default Header