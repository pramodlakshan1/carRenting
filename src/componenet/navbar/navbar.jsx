import React, { useState, Fragment } from "react";
import { Menu, Transition } from "@headlessui/react";
import { ChevronDownIcon, UserCircleIcon } from "@heroicons/react/24/solid";
import { useNavigate } from "react-router-dom"; // ✅ Correct hook

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const navigate = useNavigate(); // ✅ useNavigate hook

  const toggleNavbar = () => {
    setIsOpen(!isOpen);
  };

  const handleLogin = () => {
    navigate("/login"); // ✅ correct route navigation
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
  };

  return (
    <nav className="absolute top-0 left-0 w-full z-50 bg-white/10 backdrop-blur-md">
      <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
        <a href="/" className="flex items-center space-x-3 rtl:space-x-reverse">
          <img
            src="https://flowbite.com/docs/images/logo.svg"
            className="h-8"
            alt="Logo"
          />
          <span className="self-center text-2xl font-semibold whitespace-nowrap dark:text-white">
            Flowbite
          </span>
        </a>

        <div className="flex items-center space-x-4 md:order-2">
          {!isLoggedIn ? (
            <button
              onClick={handleLogin}
              className="text-white bg-blue-700 hover:bg-blue-800 font-medium rounded-lg text-sm px-4 py-2"
            >
              Login
            </button>
          ) : (
            <Menu as="div" className="relative inline-block text-left">
              <Menu.Button className="flex items-center space-x-2 bg-gray-100 p-2 rounded-full hover:bg-gray-200">
                <UserCircleIcon className="h-8 w-8 text-gray-600" />
                <ChevronDownIcon className="h-4 w-4 text-gray-600" />
              </Menu.Button>

              <Transition
                as={Fragment}
                enter="transition ease-out duration-100"
                enterFrom="transform opacity-0 scale-95"
                enterTo="transform opacity-100 scale-100"
                leave="transition ease-in duration-75"
                leaveFrom="transform opacity-100 scale-100"
                leaveTo="transform opacity-0 scale-95"
              >
                <Menu.Items className="absolute right-0 mt-2 w-48 origin-top-right rounded-md bg-white dark:bg-gray-800 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                  <div className="py-1">
                    <Menu.Item>
                      {({ active }) => (
                        <a
                          href="#"
                          className={`${
                            active ? "bg-gray-100 dark:bg-gray-700" : ""
                          } block px-4 py-2 text-sm text-gray-700 dark:text-white`}
                        >
                          Account Details
                        </a>
                      )}
                    </Menu.Item>
                    <Menu.Item>
                      {({ active }) => (
                        <a
                          href="#"
                          className={`${
                            active ? "bg-gray-100 dark:bg-gray-700" : ""
                          } block px-4 py-2 text-sm text-gray-700 dark:text-white`}
                        >
                          My Rentals
                        </a>
                      )}
                    </Menu.Item>
                    <Menu.Item>
                      {({ active }) => (
                        <a
                          href="#"
                          className={`${
                            active ? "bg-gray-100 dark:bg-gray-700" : ""
                          } block px-4 py-2 text-sm text-gray-700 dark:text-white`}
                        >
                          My Promotions
                        </a>
                      )}
                    </Menu.Item>
                    <Menu.Item>
                      {({ active }) => (
                        <button
                          onClick={handleLogout}
                          className={`${
                            active ? "bg-gray-100 dark:bg-gray-700" : ""
                          } block w-full text-left px-4 py-2 text-sm text-gray-700 dark:text-white`}
                        >
                          Logout
                        </button>
                      )}
                    </Menu.Item>
                  </div>
                </Menu.Items>
              </Transition>
            </Menu>
          )}

          {/* Hamburger Button */}
          <button
            onClick={toggleNavbar}
            type="button"
            className="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none"
          >
            <span className="sr-only">Open main menu</span>
            <svg
              className="w-5 h-5"
              fill="none"
              viewBox="0 0 17 14"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M1 1h15M1 7h15M1 13h15"
              />
            </svg>
          </button>
        </div>

        {/* Nav Links */}
        <div
          className={`${
            isOpen ? "block" : "hidden"
          } w-full md:block md:w-auto md:order-1`}
        >
          <ul className="font-medium flex flex-col p-4 md:p-0 mt-4 rounded-lg md:flex-row md:space-x-8 md:mt-0 text-white">
            <li>
              <a href="#" className="block py-2 px-3 hover:text-blue-500">
                Home
              </a>
            </li>
            <li>
              <a href="#" className="block py-2 px-3 hover:text-blue-500">
                About
              </a>
            </li>
            <li>
              <a href="#" className="block py-2 px-3 hover:text-blue-500">
                Services
              </a>
            </li>
            <li>
              <a href="#" className="block py-2 px-3 hover:text-blue-500">
                Pricing
              </a>
            </li>
            <li>
              <a href="#" className="block py-2 px-3 hover:text-blue-500">
                Contact
              </a>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
}
