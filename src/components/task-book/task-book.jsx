import { useState } from "react"
import { TABS } from "./constants/task-book-tabs"

const TaskBook = () => {
  const [activeView, setActiveView] = useState("new-task")

  const ActiveComponent = TABS.find((tab) => tab.id == activeView).Component

  return (
    <div className="flex flex-col flex-1 min-h-0">
      <div className="tabs justify-center gap-2 p-2">
        {TABS.map(({ id, label, icon: Icon}) => (
          <a 
          key={id} 
          className={`tab gap-2 font-bold ${activeView == id? "tab-active text-emerald-500" : "text-white"}`}
          onClick={() => setActiveView(id)}
          >
          <Icon className="size-4"/>
          {label}
          </a>
        ))}
      </div>

      <div className="flex flex-col ">
        <ActiveComponent />
      </div>
    </div>
  )
}

export default TaskBook
