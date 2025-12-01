import { navbarCTA, navlinks } from "../constants";
import logo from "../assets/SVG/Logo.svg";
import { useState } from "react";

const Navbar = () => {
  const [mobileOpen, setMobileOpen] = useState(false);
  return (
    //Navbar from daisyUI, padding to zero, because content restraint and padding comes from content class, darker for readibility
    <header className="navbar fixed backdrop-blur-2xl text-white shadow-sm z-30 p-0 bg-gray-900/10">
      <nav aria-label="Main Navigation" className="content flex flex-row">
        <div className="navbar-start hidden lg:flex">
          <ul role="menu" className="menu menu-horizontal uppercase font-bold">
            {navlinks.map((link) => (
              <li key={link.name} role="none">
                <a role="menuitem" href={link.path}>
                  {link.name}
                </a>
              </li>
            ))}
          </ul>
        </div>

        <div className="navbar-center">
          <div className="dropdown">
            {/* Menu button for small screens */}
            <button
              tabIndex={0}
              aria-label="Open navigation menu"
              aria-expanded={mobileOpen}
              aria-controls="mobile-menu"
              onClick={() => setMobileOpen((o) => !o)}
              className="btn btn-ghost lg:hidden"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                {" "}
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h8m-8 6h16"
                />{" "}
              </svg>
            </button>
            {/* Dropdown menu for small screens */}
            <ul
              role="menubar"
              tabIndex="-1"
              className="menu menu-sm dropdown-content backdrop-blur-2xl rounded-box z-1 mt-3 w-52 p-2 shadow"
            >
              {navlinks.map((link) => (
                <li key={link.name} role="none" className="uppercase">
                  <a href={link.path} role="menuitem" className="text-xl">
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>
          {/* Logo */}
          <a className="btn btn-ghost flex flex-row gap-4">
            <img src={logo} alt="Logo" className="w-full h-full" />
            {/* Disabled on small for screen size */}
            <span className="font-sans font-bold text-xl text-white uppercase transition-colors duration-300 ease-in-out hover:text-black hidden sm:inline-block">
              vIrignon
            </span>
          </a>
        </div>

        {/* Navlinks in center */}

        {/* CTA button on the right */}
        <div className="navbar-end">
          <a
            href="#"
            className="btn btn-ghost group relative w-fit overflow-hidden font-bold text-white uppercase -mt-1 transition-colors duration-300 ease-in-out hover:text-black"
          >
            <span className="flex items-center gap-2">
              {/* TEXT */}
              <span className="relative">
                {navbarCTA.name}
                {/* Underline that slides out on hover */}
                <span
                  className="
                    absolute left-0 right-0 bottom-0 h-0.5 bg-current
                    transition-all duration-300
                    group-hover:translate-x-full group-hover:opacity-0
                  "
                />
              </span>
            </span>
          </a>
        </div>
      </nav>
    </header>
  );
};
export default Navbar;
