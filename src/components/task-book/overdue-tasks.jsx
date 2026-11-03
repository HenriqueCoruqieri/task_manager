import { isOverdue } from "../../lib/dayjs"
import TaskList from "./task-list"

const isTaskOverdue = (task) => isOverdue(task.expiration_date)

const OverdueTasks = ({tasks, setTasks}) =>{
    return (
    <TaskList 
    tasks={tasks}
    setTasks={setTasks}
    title="Tarefas Atrasadas" 
    filterTasks={isTaskOverdue}
    />
    )
}

export default OverdueTasks