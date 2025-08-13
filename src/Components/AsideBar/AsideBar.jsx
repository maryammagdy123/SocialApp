import { initFlowbite } from 'flowbite';
import React, { useContext, useEffect, useState } from 'react'
import { UserDataContext } from '../../Context/UserDataContext';
import { NavLink, useNavigate } from 'react-router';
import { CgProfile } from "react-icons/cg";
import { CgFeed } from "react-icons/cg";
import { BsFillMenuAppFill } from 'react-icons/bs';
export default function AsideBar() {

	 let { setUser } = useContext(UserDataContext)
  let logOut = useNavigate()
    const [isOpen, setIsOpen] = useState(false);
  function handleLogOut() {
    localStorage.removeItem("token")
    setUser(null)
    logOut("/login")
  }
		useEffect(() => {
			initFlowbite();
		}, []);
	  function getNavLinkClasses(isActive) {
    return `flex items-center p-2 rounded-lg group transition-colors duration-200 
      ${isActive 
        ? "bg-gray-200 text-blue-600 dark:bg-gray-700 dark:text-white" 
        : "text-gray-900 dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700"
      }`;
  }

  function getIconClasses(isActive) {
    return `transition duration-75 ${
      isActive 
        ? "text-blue-600 dark:text-white" 
        : "text-gray-500 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white"
    }`;
  }

return (
    <>
     
 

      <aside 
        id="default-sidebar" 
        className={`fixed top-0 left-0 z-40 w-64 h-screen transition-transform  bg-indigo-500 shadow-2xl
          ${isOpen ? "translate-x-0" : "-translate-x-full"} 
          lg:translate-x-0`} 
        aria-label="Sidebar"
      >
        <div className="h-full px-3 py-4 overflow-y-auto border-gray-200 dark:border-gray-700">
          <ul className="space-y-2 mt-14 font-medium">

            <li>
              <NavLink to="profile" className={({ isActive }) => getNavLinkClasses(isActive)}>
                {({ isActive }) => (
                  <>
                    <CgProfile color='white' size={35} className={getIconClasses(isActive)} />
                    <span className="ms-3">Profile</span>
                  </>
                )}
              </NavLink>
            </li>

            <li>
              <NavLink to="/" className={({ isActive }) => getNavLinkClasses(isActive)}>
                {({ isActive }) => (
                  <>
                    <CgFeed color='white' size={35} className={getIconClasses(isActive)} />
                    <span className="ms-3">Feeds</span>
                  </>
                )}
              </NavLink>
            </li>

            <li onClick={handleLogOut}>
              <a href="#" className="flex items-center p-2 text-gray-900 rounded-lg 
                                    dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group">
                <span className="flex-1 ms-3 whitespace-nowrap">Logout</span>
              </a>
            </li>

          </ul>
        </div>
      </aside>

   
    </>
  );
}

