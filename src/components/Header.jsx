import React, { useEffect, useState } from 'react'
import { Link, useSearchParams } from 'react-router-dom'
import { SignedIn, SignedOut, SignIn, useUser } from '@clerk/clerk-react'
import { Button } from './ui/button'
import { PenBox, Menu, X } from 'lucide-react'
import CustomUserMenu from './CustomUserMenu'
import { ModeToggle } from './ModeToggle'
import ApplyPathLogo from './ApplyPathLogo'

const Header = () => {
  const [showModal, setShowModal] = useState(false)
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  const { user } = useUser()
  const [searchParams, setSearchParams] = useSearchParams()

  useEffect(() => {
    if (searchParams.get("sign-in")) {
      setShowModal(true)
    }
  }, [searchParams])

  const clickOutsideHandle = (e) => {
    if (e.target === e.currentTarget) {
      setShowModal(false)
      setSearchParams({})
    }
  }

  return (
    <div>
      <nav className="flex justify-between items-center px-6 py-3 border-b-2 border-gray-200 bg-white dark:bg-gray-900 dark:border-gray-700">
        {/* Logo */}
        <Link to="/" className="inline-block w-fit">
          <ApplyPathLogo className="apply-path-logo" />
        </Link>

        {/* Desktop menu */}
        <div className="hidden md:flex items-center gap-5">
          <ModeToggle />
          <SignedOut>
            <Button onClick={() => setShowModal(true)}>Log In</Button>
          </SignedOut>
          <SignedIn>
            {user?.unsafeMetadata?.role === 'recruiter' && (
              <Link to="/post-job">
                <Button className="rounded-full bg-yellow-300 hover:bg-yellow-400">
                  <PenBox size={20} className="mr-2" />
                  Post a Job
                </Button>
              </Link>
            )}
            <CustomUserMenu />
          </SignedIn>
        </div>

        {/* Hamburger button (mobile only) */}
        <button
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          className="md:hidden p-2 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-800"
        >
          {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </nav>

      {/* Mobile menu dropdown */}
      {isMenuOpen && (
        <div className="md:hidden flex flex-col gap-4 px-6 py-4 border-b border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900">
          <ModeToggle />
          <SignedOut>
            <Button onClick={() => {
              setShowModal(true)
              setIsMenuOpen(false)
            }}>
              Log In
            </Button>
          </SignedOut>
          <SignedIn>
            {user?.unsafeMetadata?.role === 'recruiter' && (
              <Link to="/post-job" onClick={() => setIsMenuOpen(false)}>
                <Button className="rounded-full bg-yellow-300 hover:bg-yellow-400 w-full">
                  <PenBox size={20} className="mr-2" />
                  Post a Job
                </Button>
              </Link>
            )}
            <CustomUserMenu />
          </SignedIn>
        </div>
      )}

      {/* modal */}
      {showModal && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/80"
          onClick={clickOutsideHandle}
        >
          <SignIn
            signUpForceRedirectUrl="/onboarding"
            fallbackRedirectUrl="/onboarding"
          />
        </div>
      )}
    </div>
  )
}

export default Header
