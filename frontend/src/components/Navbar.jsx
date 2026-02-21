import { NavLink } from "react-router-dom";
import { useContext, useState } from "react";
import { AuthContext } from "../context/AuthContext";
import { Menu, X } from "lucide-react";

const Navbar = () => {
  const { token, logout } = useContext(AuthContext);
  const [isOpen, setIsOpen] = useState(false);

  const linkStyle =
    "px-4 py-2 rounded-lg text-sm font-medium transition";

  const activeStyle = "bg-blue-100 text-blue-600";

  return (
    <nav className="bg-white shadow-sm border-b sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">

        <NavLink to="/" className="text-2xl font-bold text-blue-600">
          MicroMarket
        </NavLink>

        <div className="hidden md:flex items-center space-x-4">

          <NavLink
            to="/"
            className={({ isActive }) =>
              `${linkStyle} ${isActive ? activeStyle : "text-gray-700 hover:bg-gray-100"
              }`
            }
          >
            Home
          </NavLink>


          <NavLink
            to="/add-product"
            className={({ isActive }) =>
              `${linkStyle} ${isActive ? activeStyle : "text-gray-700 hover:bg-gray-100"
              }`
            }
          >
            Add Product
          </NavLink>


          {token ? (
            <button
              onClick={logout}
              className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg cursor-pointer transition"
            >
              Logout
            </button>
          ) : (
            <>
              <NavLink
                to="/login"
                className={({ isActive }) =>
                  `${linkStyle} ${isActive ? activeStyle : "text-gray-700 hover:bg-gray-100"
                  }`
                }
              >
                Login
              </NavLink>

            </>
          )}
        </div>

        {/* Mobile */}
        <div className="md:hidden">
          <button onClick={() => setIsOpen(!isOpen)}>
            {isOpen ? <X /> : <Menu />}
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;