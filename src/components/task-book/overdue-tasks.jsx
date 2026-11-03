import { isOverdue } from "../../lib/dayjs"
import TaskList from "./task-list"

const isTaskOverdue = (task) => isOverdue(task.expiration_date)

const OverdueTasks = () =>{
    return (
    <TaskList title="Tarefas Atrasadas" filterTasks={isTaskOverdue}/>
    )
}

export default OverdueTasks