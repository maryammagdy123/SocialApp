import { useContext, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router';
import { UserDataContext } from '../../Context/UserDataContext';
import Spinner from '../Spinner/Spinner';
import { initFlowbite } from "flowbite";
import { PiSignOutBold } from 'react-icons/pi';

export default function Navbar() {
  const { user, setUser } = useContext(UserDataContext);
  const navigate = useNavigate();

  function handleLogOut() {
    localStorage.removeItem("token");
    setUser(null);
    navigate("/login");
  }

  useEffect(() => {
    initFlowbite();
  }, []);

  const location = useLocation();
  const isProfilePage = location.pathname === "/profile";

  return (
    <nav
      style={{
        background: "var(--background)",
        boxShadow: "var(--shadow-md)",
      }}
      className="fixed top-0 left-0 w-full z-50"
    >
      <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
        {/* Logo / Page Title */}
        {isProfilePage ? (
          <span className="flex items-center">
            <span
              style={{ color: "var(--text-main)" }}
              className="self-center text-2xl font-semibold uppercase"
            >
              Profile
            </span>
          </span>
        ) : (
          <Link to="/" className="flex items-center space-x-3 rtl:space-x-reverse">
            <span
              style={{ color: "var(--text-main)" }}
              className="self-center text-2xl font-semibold"
            >
              SOHBA
            </span>
          </Link>
        )}

        {/* User Info / Actions */}
        {user ? (
          <div className="hidden sm:flex gap-3 items-center">
            {!isProfilePage && (
              <div className='flex gap-2 items-center'>
                <img
                  className="w-10 h-10 rounded-full object-cover"
                  src={user.photo || "/default-avatar.jpg"}
                  alt="User"
                />
                <span style={{ color: "var(--text-main)" }}>
                  Hello, {user.name}
                </span>
              </div>
            )}
            <PiSignOutBold
              className="SignOut-icon cursor-pointer"
              aria-label="Sign Out"
              onClick={handleLogOut}
              style={{ color: "var(--primary-600)" }}
            />
          </div>
        ) : (
          !isProfilePage && <Spinner />
        )}

        {/* Mobile Menu Button */}
        <button
          data-drawer-target="default-sidebar"
          data-drawer-toggle="default-sidebar"
          aria-controls="default-sidebar"
          type="button"
          className="inline-flex items-center p-2 text-sm rounded-lg hover:bg-[var(--primary-50)] focus:outline-none focus:ring-2 focus:ring-[var(--primary-200)] lg:hidden"
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
  );
}
