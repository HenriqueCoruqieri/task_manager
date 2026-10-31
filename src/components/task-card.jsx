const TaskCard = ({
  task,
  index,
  isSelected,
  onToggleSelect,
  onOpen,
  className = "w-full",
}) => {
  return (
    <div className={className}>
      <div
        className={`list-row h-22 items-center bg-emerald-600 ${onOpen ? "cursor-pointer hover:bg-emerald-700 transition-colors" : ""}`}
        onClick={onOpen}
      >
        <div className="text-4xl font-thin opacity-30 tabular-nums">
          {String(index + 1).padStart(2, "0")}
        </div>
        <div className="list-col-grow min-w-0">
          <h1 className="font-bold uppercase truncate">{task.title}</h1>
          <h3 className="text-xs font-semibold opacity-60 line-clamp-2 break-words">
            {task.description}
          </h3>
        </div>
        {onToggleSelect && (
          <div>
            <input
              className="checkbox checkbox-neutral"
              type="checkbox"
              checked={isSelected}
              onChange={onToggleSelect}
              onClick={(e) => e.stopPropagation()}
            />
          </div>
        )}
      </div>
    </div>
  )
}

export default TaskCard
