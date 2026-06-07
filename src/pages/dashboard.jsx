import { useParams } from "react-router-dom"
import UserMenu from "../components/user-menu"
import Header from "../components/header"

const Dashboard = () => {
  const { username } = useParams()

  return (
    <div className="flex flex-col">
      <Header />

      <div className="flex">
        <UserMenu />
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
