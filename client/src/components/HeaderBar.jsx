import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Menu, X, Ticket, ShoppingCart, User, LogIn } from "lucide-react";

const HeaderBar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const navigate = useNavigate();

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  const handleImportantClick = () => {
    navigate("/under-processing");
  };

  return (
    <header className="sticky top-0 z-50 bg-white/95 backdrop-blur-sm shadow-lg dark:bg-veryDarkBlue/95 border-b border-gray-200 dark:border-gray-700">
      <nav className="container mx-auto flex flex-col md:flex-row items-center justify-between px-4 py-4 md:py-6">
        {/* Logo */}
        <Link
          to="/"
          className="group flex items-center space-x-2"
          aria-label="Egy-Events Home"
        >
          <span className="font-serif text-xl md:text-2xl font-bold bg-gradient-to-r from-brightRed to-yellow-500 bg-clip-text text-transparent group-hover:from-brightRedLight group-hover:to-yellow-400 transition-all duration-300">
            Egy-Events
          </span>
        </Link>

        {/* Desktop Nav */}
        <div className="hidden md:flex items-center gap-8">
          <NavLinks />
          <div className="flex items-center gap-4">
            <Link
              to="/login"
              className="h-10 px-6 flex items-center justify-center gap-2 text-white bg-gradient-to-r from-brightRed to-brightRedLight rounded-lg shadow-lg hover:shadow-xl hover:from-brightRedLight hover:to-brightRed transition-all duration-300 transform hover:scale-105 focus:ring-2 focus:ring-brightRed focus:outline-none"
            >
              <LogIn size={18} />
              Login
            </Link>
            <button
              onClick={handleImportantClick}
              className="h-10 px-6 flex items-center justify-center gap-2 bg-gradient-to-r from-brightRed to-yellow-500 text-white font-semibold rounded-lg shadow-lg hover:shadow-xl hover:from-brightRedLight hover:to-yellow-400 transition-all duration-300 transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-yellow-500"
            >
              <Ticket size={18} />
              Important Click Here
            </button>
          </div>
        </div>

        {/* Mobile Toggle */}
        <button
          className="md:hidden text-gray-700 dark:text-white hover:text-brightRed focus:outline-none transition-colors duration-300 p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800"
          onClick={toggleMenu}
          aria-expanded={isMenuOpen}
          aria-label="Toggle navigation menu"
        >
          {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>

        {/* Mobile Nav */}
        {isMenuOpen && (
          <div className="w-full mt-4 flex flex-col items-center gap-4 md:hidden border-t pt-4 border-gray-200 dark:border-gray-700 animate-fadeIn">
            <NavLinks mobile />
            <div className="flex flex-col w-full gap-4">
              <Link
                to="/login"
                className="h-10 w-full flex items-center justify-center gap-2 text-white bg-gradient-to-r from-brightRed to-brightRedLight rounded-lg shadow-lg hover:shadow-xl hover:from-brightRedLight hover:to-brightRed transition-all duration-300 transform hover:scale-105 focus:ring-2 focus:ring-brightRed focus:outline-none"
              >
                <LogIn size={18} />
                Login
              </Link>
              <button
                onClick={handleImportantClick}
                className="h-10 w-full flex items-center justify-center gap-2 bg-gradient-to-r from-brightRed to-yellow-500 text-white font-semibold rounded-lg shadow-lg hover:shadow-xl hover:from-brightRedLight hover:to-yellow-400 transition-all duration-300 transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-yellow-500"
              >
                <Ticket size={18} />
                Important Click Here
              </button>
            </div>
          </div>
        )}
      </nav>
    </header>
  );
};

const NavLinks = ({ mobile = false }) => {
  const baseClasses =
    "h-10 px-6 flex items-center justify-center gap-2 transition-all duration-300 text-gray-700 dark:text-gray-200 hover:text-brightRed rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800";
  const mobileClasses = mobile ? "w-full" : "";

  const links = [
    {
      to: "/under-processing",
      label: "My Tickets",
      icon: <Ticket size={18} />,
    },
    {
      to: "/events",
      label: "Events",
      icon: <ShoppingCart size={18} />,
    },
    {
      to: "/under-processing",
      label: "Cart",
      icon: <User size={18} />,
    },
  ];

  return (
    <>
      {links.map((link) => (
        <Link
          key={link.to}
          to={link.to}
          className={`${baseClasses} ${mobileClasses} group`}
        >
          {link.icon}
          <span className="group-hover:translate-x-1 transition-transform duration-300">
            {link.label}
          </span>
        </Link>
      ))}
    </>
  );
};

export default HeaderBar;
