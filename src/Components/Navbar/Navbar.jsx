import { useContext, useEffect } from 'react'
import { Link, NavLink, useLocation, useNavigate } from 'react-router'
import { UserDataContext } from '../../Context/UserDataContext';
import Spinner from '../Spinner/Spinner';
import { initFlowbite } from "flowbite";
import { PiSignOutBold } from 'react-icons/pi';

export default function Navbar() {
  let { user, setUser } = useContext(UserDataContext)
  let logOut = useNavigate()
  function handleLogOut() {
    localStorage.removeItem("token")
    setUser(null)
    logOut("/login")
  }
  useEffect(() => {
    initFlowbite();
  }, []);
  const location = useLocation()
  const isProfilePage = location.pathname === "/profile"

  return (
    <nav className=" bg-indigo-500 border-gray-200  sm:mr-64 fixed top-0 left-0 w-full z-50 shadow-md">
      <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">


        {isProfilePage ? <span className="flex  items-center   ">
          <span className="self-center text-2xl font-semibold whitespace-nowrap text-white uppercase "> profile</span>
        </span> :
          <Link to="/" className="flex  items-center space-x-3 rtl:space-x-reverse">

            <span className="self-center text-2xl font-semibold whitespace-nowrap text-white ">SOHBA</span>
          </Link>
        }



        {user ? (
          <div className="hidden sm:flex gap-3 items-center">
            {!isProfilePage &&
              <div className='flex gap-2 items-center'>
                <img
                  className="w-10 h-10 rounded-full object-cover"
                  src={user.photo || "/default-avatar.jpg"}
                  alt="User"
                />
                <span className="text-gray-900 dark:text-white">Hello  , {user.name}</span>
              </div>}
            <PiSignOutBold
              className="SignOut-icon cursor-pointer sm:hidden flex"
              aria-label="Sign Out"
              onClick={handleLogOut}
            />
          </div>
        ) : (
          <Spinner />
        )}

        <button
          data-drawer-target="default-sidebar"
          data-drawer-toggle="default-sidebar"
          aria-controls="default-sidebar"
          type="button"
          className="inline-flex items-center p-2 text-sm text-gray-500 rounded-lg  
                     hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 
                     dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600 lg:hidden"
        >
          <span className="sr-only">Open sidebar</span>
          <svg
            className="w-6 h-6"
            aria-hidden="true"
            fill="currentColor"
            viewBox="0 0 20 20"
          >
            <path
              clipRule="evenodd"
              fillRule="evenodd"
              d="M2 4.75A.75.75 0 012.75 4h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 4.75zm0 10.5a.75.75 0 01.75-.75h7.5a.75.75 0 010 1.5h-7.5a.75.75 0 01-.75-.75zM2 10a.75.75 0 01.75-.75h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 10z"
            ></path>
          </svg>
        </button>

      </div>
    </nav>
  )
}



