import { navlinks } from "../constants";
import logo from "../assets/SVG/Logo.svg";

const Navbar = () => {
  return (
    //Navbar from daisyUI, padding to zero, because content restraint and padding comes from content class
    <div className="navbar fixed backdrop-blur-2xl text-white shadow-sm z-30 p-0">
      <div className="content flex flex-row">
        <div className="navbar-start">
          <div className="dropdown">
            {/* Menu button for small screens */}
            <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
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
            </div>
            {/* Dropdown menu for small screens */}
            <ul
              tabIndex="-1"
              className="menu menu-sm dropdown-content backdrop-blur-2xl rounded-box z-1 mt-3 w-52 p-2 shadow"
            >
              {navlinks.map((link) => (
                <li key={link.name} className="uppercase">
                  <a href={link.path} className="text-xl">
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>
          {/* Logo */}
          <a className="btn btn-ghost flex flex-row gap-4">
            <img src={logo} alt="Logo" className="w-full h-full" />
            <span className="font-sans font-bold text-xl text-white uppercase transition-colors duration-300 ease-in-out hover:text-black hidden sm:inline-block">
              vIrignon
            </span>
          </a>
        </div>

        {/* Navlinks in center */}
        <div className="navbar-center hidden lg:flex">
          <ul className="menu menu-horizontal uppercase font-bold px-1">
            {navlinks.map((link) => (
              <li key={link.name}>
                <a href={link.path}>{link.name}</a>
              </li>
            ))}
          </ul>
        </div>

        {/* CTA button on the right */}
        <div className="navbar-end">
          <a
            href="#"
            className="btn btn-ghost relative -mt-1 group w-fit text-white uppercase font-bold  overflow-hidden transition-colors duration-300 ease-in-out hover:text-black "
          >
            <span className="flex items-center gap-2">
              {/* TEXT */}
              <span className="relative">
                Contact Us
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
      </div>
    </div>
  );
};
export default Navbar;
