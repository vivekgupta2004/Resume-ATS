import { Link } from "react-router"
import { FaTrash } from "react-icons/fa";

const Navbar = () => {
  return (
    <nav className="navbar">
      <Link to="/">
        <p className="tect-2xl font-bold text-gradient">RESUMIND</p>
      </Link>
      <div className="flex justify-center items-center gap-1">

        <Link to="/upload">
          <p className=" primary-button w-fit">Upload Resume</p>
        </Link>
        <Link to="/wipe">
          <p className=" primary-button w-fit"><FaTrash size={16} /> </p>
        </Link>
      </div>

    </nav>
  )
}

export default Navbar