import { initFlowbite } from 'flowbite';
import React, { useContext, useEffect, useState } from 'react';
import { UserDataContext } from '../../Context/UserDataContext';
import { NavLink, useNavigate } from 'react-router';
import { CgProfile, CgFeed } from "react-icons/cg";

export default function AsideBar() {
  const { setUser } = useContext(UserDataContext);
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);

  function handleLogOut() {
    localStorage.removeItem("token");
    setUser(null);
    navigate("/login");
  }

  useEffect(() => {
    initFlowbite();
  }, []);

  function getNavLinkClasses(isActive) {
    return `flex items-center p-2 rounded-lg group transition-colors duration-200
      ${isActive
        ? "bg-[var(--primary-100)] text-[var(--primary-600)]"
        : "text-[var(--text-main)] hover:bg-[var(--primary-50)]"
      }`;
  }

  function getIconClasses(isActive) {
    return `transition duration-75 ${isActive
      ? "text-[var(--primary-600)]"
      : "text-[var(--text-soft)] group-hover:text-[var(--text-main)]"
      }`;
  }

  return (
    <aside
      id="default-sidebar"
      className={`fixed top-0 left-0 z-40 w-64 h-screen transition-transform bg-[var(--background)] shadow-lg
        ${isOpen ? "translate-x-0" : "-translate-x-full"} lg:translate-x-0`}
      aria-label="Sidebar"
    >
      <div className="h-full px-3 py-4 overflow-y-auto">
        <ul className="space-y-2 mt-14 font-medium">
          <li>
            <NavLink to="profile" className={({ isActive }) => getNavLinkClasses(isActive)}>
              {({ isActive }) => (
                <>
                  <CgProfile size={28} className={getIconClasses(isActive)} />
                  <span className="ms-3">Profile</span>
                </>
              )}
            </NavLink>
          </li>

          <li>
            <NavLink to="/" className={({ isActive }) => getNavLinkClasses(isActive)}>
              {({ isActive }) => (
                <>
                  <CgFeed size={28} className={getIconClasses(isActive)} />
                  <span className="ms-3">Feeds</span>
                </>
              )}
            </NavLink>
          </li>

          <li onClick={handleLogOut}>
            <button
              className="flex items-center w-full p-2 rounded-lg text-[var(--text-main)] hover:bg-[var(--primary-50)] transition"
            >
              <span className="flex-1 ms-3 whitespace-nowrap">Logout</span>
            </button>
          </li>
        </ul>
      </div>
    </aside>
  );
}
