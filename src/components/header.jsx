import { useUser } from "../context/user-context"

import { Link, generatePath, useNavigate, useParams } from "react-router-dom"
import { LogOut } from "lucide-react"
import { ROUTES } from "../constants/routes"

const Header = () => {
  const { username } = useParams()
  const { setUserData } = useUser()
  const navigate = useNavigate()

  const handleLogout = () => {
    localStorage.removeItem("token")
    localStorage.removeItem("userId")
    setUserData(null)
    navigate(ROUTES.login)
  }

  return (
    <div className="navbar bg-primary shadow-sm">
      <div className="navbar-start">
        <Link to={generatePath(ROUTES.home, { username })} className="btn btn-ghost text-xl">
          Home
        </Link>
      </div>

      <div className="navbar-center">
        <img
          alt="Pen Header Image"
          src="/header_image.png"
          className="w-75 h-13.75"
        />
      </div>

      <div className="navbar-end">
        <button className="btn btn-square btn-ghost" onClick={handleLogout}>
          <LogOut />
        </button>
      </div>
    </div>
  )
}

export default Header
