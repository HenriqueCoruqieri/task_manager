import { Link, useParams, generatePath } from "react-router-dom"
import { useUser } from "../context/user-context"
import { MENU_ITEMS } from "../constants/user-menu-items"

const UserMenu = () => {
  const { username } = useParams()
  const { userData } = useUser()

  return (
    <div className="flex">
      <details className="dropdown flex p-6">
        <summary className="btn btn-circle">
          <div className="avatar gap-2">
          <div className="ring-primary ring-offset-base-100 w-14 rounded-full ring-2">
              <img src={userData?.image_url || "/default_profile.png"} />
            </div>
          </div>
        </summary>
        <ul className="dropdown-content flex flex-col gap-1 font-semibold bg-primary z-1 w-52 ml-4 mt-6 p-2 rounded-box shadow-sm">
          {MENU_ITEMS.map(({ label, route }) => (
          <li key={route}>
          <Link
          to={generatePath(route, { username })}
          className="btn btn-ghost w-full justify-start"
          >
            {label}
          </Link>
    </li>
  ))}
</ul>
      </details>

      <div className="mt-4">
        {userData && (
          <h1 className="text-primary-content font-bold">
            {userData.first_name} {userData.last_name}
          </h1>
        )}
      </div>
    </div>
  )
}

export default UserMenu
