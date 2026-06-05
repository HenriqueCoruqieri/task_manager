import { useParams } from "react-router-dom"

const Dashboard = () => {
  const { username } = useParams()

  return (
    <div className="text-white">
      <h1>Dashboard</h1>
    </div>
  )
}

export default Dashboard
