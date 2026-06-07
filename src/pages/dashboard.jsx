import { useParams } from "react-router-dom"
import AvatarProfile from "../components/avatar-profile"
import { LogOutIcon } from "lucide-react"

const Dashboard = () => {
  const { username } = useParams()

  return (
    <div className="flex flex-col">
      <div className="flex">
        <AvatarProfile />
        <div className="mt-4">
          <h1 className="text-white font-bold"> Henrique Oliveira</h1>
        </div>
      </div>

      <div className="flex flex-col items-center">
        <h1>BOOK DE TAREFAS</h1>
      </div>
    </div>
  )
}

export default Dashboard
