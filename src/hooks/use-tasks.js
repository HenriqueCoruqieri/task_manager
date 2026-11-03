import { useEffect, useState } from "react"
import { getTasks } from "../services/task-service"

export const useTasks = () => {
    const [tasks, setTasks] = useState([])

    useEffect(() => {
        const fetchTasks = async () => {
          const userId = localStorage.getItem("userId")
          const response = await getTasks(userId)
          const data = await response.json()
          setTasks(data.filter((task) => !task.isCompleted))
        }
    
        fetchTasks()
      }, [])


    return {tasks, setTasks}
} 