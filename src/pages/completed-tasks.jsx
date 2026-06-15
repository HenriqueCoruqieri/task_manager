import Footer from "../components/footer"
import Header from "../components/header"
import UserMenu from "../components/user-menu"
import TaskCard from "../components/task-card"

import { useEffect, useState } from "react"
import { SquareCheckBig } from "lucide-react"

const CompletedTasks = () => {
  const [tasks, setTasks] = useState([])

  useEffect(() => {
    const fetchTasks = async () => {
      const userId = localStorage.getItem("userId")
      const response = await fetch(
        `http://localhost:8000/tasks/?user_id=${userId}`
      )
      const data = await response.json()
      setTasks(data.filter((tasks) => tasks.isCompleted))
    }

    fetchTasks()
  }, [])
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <UserMenu />

      <div className="flex flex-1 justify-center items-center">
        <div className="bg-black w-[550px] rounded-3xl p-6">
          <div className="flex justify-between p-2 gap-4">
            <h1 className="text-3xl font-bold text-white text-center">
              Tarefas Concluídas
            </h1>
            <SquareCheckBig className="mt-2 text-emerald-500" />
          </div>
          <ul className="list rounded-box space-y-4 max-h-[60vh] overflow-y-auto pr-2 w-full max-w-[500px] mt-4">
            {tasks.map((task, index) => (
              <li key={task._id}>
                <TaskCard task={task} index={index} />
              </li>
            ))}
          </ul>
        </div>
      </div>

      <Footer />
    </div>
  )
}

export default CompletedTasks
