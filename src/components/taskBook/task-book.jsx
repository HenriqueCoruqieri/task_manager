import { BookOpenText, StickyNotePlus } from "lucide-react"
import NewTask from "./new-task"

const TaskBook = () => {
  return (
    <div className="p-4">
      <div className="breadcrumbs rounded-xl text-emerald-500 font-bold">
        <ul className="w-full justify-center">
          <li className="space-x-2">
            <StickyNotePlus />
            <a>Nova Tarefa</a>
          </li>
          <li className="space-x-2">
            <BookOpenText />
            <a>Tarefas</a>
          </li>
        </ul>
      </div>

      <div className="mt-6">
        <NewTask />
      </div>
    </div>
  )
}

export default TaskBook
