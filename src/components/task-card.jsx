const TaskCard = ({ task, index, isSelected, onToggleSelect }) => {
  return (
    <div className="w-full">
      <div className="list-row flex-1 bg-emerald-600">
        <div className="text-4xl font-thin opacity-30 tabular-nums">
          {String(index + 1).padStart(2, "0")}
        </div>
        <div className="list-col-grow">
          <h1 className="font-bold uppercase">{task.title}</h1>
          <h3 className="text-xs font-semibold opacity-60">
            {task.description}
          </h3>
        </div>
        {onToggleSelect && (
          <div className="mt-2">
            <input
              className="checkbox checkbox-neutral"
              type="checkbox"
              checked={isSelected}
              onChange={onToggleSelect}
            />
          </div>
        )}
      </div>
    </div>
  )
}

export default TaskCard
