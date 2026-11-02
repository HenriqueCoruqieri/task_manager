import { BookOpenText, ClipboardClock, StickyNotePlus } from "lucide-react";
import NewTask from "../new-task";
import TaskList from "../task-list";
import OverdueTasks from "../overdue-tasks";

export const TABS = [
    {id: "new-task", label: "Nova Tarefa", icon: StickyNotePlus, Component: NewTask },
    {id: "tasks", label: "Tarefas", icon: BookOpenText, Component: TaskList },
    {id: "overdue-task", label: "Tarefas Atrasadas", icon: ClipboardClock, Component: OverdueTasks },
]