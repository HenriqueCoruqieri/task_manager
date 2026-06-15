import { useUser } from "../context/user-context"

import { Link, useNavigate, useParams } from "react-router-dom"
import { LogOut } from "lucide-react"

const Header = () => {
  const { username } = useParams()
  const { setUserData } = useUser()
  const navigate = useNavigate()

  const handleLogout = () => {
    localStorage.removeItem("token")
    localStorage.removeItem("userId")
    setUserData(null)
    navigate("/")
  }

  return (
    <div className="navbar bg-emerald-600 shadow-sm">
      <div className="navbar-start">
        <Link to={`/${username}/dashboard`} className="btn btn-ghost text-xl">
          Home
        </Link>
      </div>

      <div className="navbar-center">
        <img
          alt="Pen Header Image"
          src="/header_image.png"
          className="w-[300px] h-[55px]"
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
