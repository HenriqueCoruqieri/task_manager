import { Link, useParams } from "react-router-dom"
import { useUser } from "../context/user-context"

const UserMenu = () => {
  const { username } = useParams()
  const { userData } = useUser()

  return (
    <div className="flex">
      <details className="dropdown flex p-6">
        <summary className="btn btn-circle">
          <div className="avatar gap-2">
            <div className="ring-emerald-600 ring-offset-base-100 w-14 rounded-full ring-2 ring-offset-2">
              <img src={userData?.image_url || "/default_profile.png"} />
            </div>
          </div>
        </summary>
        <ul className="menu dropdown-content font-semibold bg-emerald-600 z-1 w-52 ml-4 mt-6 p-2 rounded-box shadow-sm">
          <li>
            <Link to={`/${username}/dashboard/profile`}>Perfil</Link>
          </li>
          <li>
            <Link to={`/${username}/dashboard/account`}>Conta</Link>
          </li>
          <li>
            <a>Tarefas concluídas</a>
          </li>
        </ul>
      </details>

      <div className="mt-4">
        {userData && (
          <h1 className="text-white font-bold">
            {userData.first_name} {userData.last_name}
          </h1>
        )}
      </div>
    </div>
  )
}

export default UserMenu
