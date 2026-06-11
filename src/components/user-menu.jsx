import { Link, useParams } from "react-router-dom"

const UserMenu = () => {
  const { username } = useParams()

  return (
    <div>
      <details className="dropdown flex p-6">
        <summary className="btn btn-circle">
          <div className="avatar">
            <div className="ring-emerald-600 ring-offset-base-100 w-14 rounded-full ring-2 ring-offset-2">
              <img src="https://img.daisyui.com/images/profile/demo/spiderperson@192.webp" />
            </div>
          </div>
        </summary>
        <ul className="menu dropdown-content font-semibold bg-emerald-600 z-1 w-52 ml-4 mt-6 p-2 rounded-box shadow-sm">
          <li>
            <Link to={`/${username}/dashboard/profile`}>Perfil</Link>
          </li>
          <li>
            <a>Conta</a>
          </li>
          <li>
            <a>Tarefas concluídas</a>
          </li>
        </ul>
      </details>
    </div>
  )
}

export default UserMenu
