import { PencilLine } from "lucide-react"

const TaskList = () => {
  return (
    <div className="min-w-[500px]">
      <ul className="list rounded-box space-y-4">
        <li className="text-xs opacity-60 tracking-wide ml-14 p-4 pb-2">
          Lista de Tarefas
        </li>

        <li className="flex items-center gap-4">
          <button className="btn btn-sm border-2 border-white border-solid rounded-xl mt-2">
            <PencilLine />
          </button>
          <div className="list-row bg-emerald-600">
            <div className="text-4xl font-thin opacity-30 tabular-nums">01</div>
            <div className="list-col-grow">
              <div className="font-bold uppercase">Estudar Programação</div>
              <div className="text-xs font-semibold opacity-60">
                Concluir o conteúdo da trilha de formação em SOLID do
                FullStackClub
              </div>
            </div>
            <div className="mt-2">
              <input
                type="checkbox"
                defaultChecked
                className="checkbox checkbox-neutral"
              />
            </div>
          </div>
        </li>

        <li className="flex items-center gap-4">
          <button className="btn btn-sm border-2 border-white border-solid rounded-xl mt-2">
            <PencilLine />
          </button>
          <div className="list-row bg-emerald-600">
            <div className="text-4xl font-thin opacity-30 tabular-nums">01</div>
            <div className="list-col-grow">
              <div className="font-bold uppercase">Estudar Programação</div>
              <div className="text-xs font-semibold opacity-60">
                Concluir o conteúdo da trilha de formação em SOLID do
                FullStackClub
              </div>
            </div>
            <div className="mt-2">
              <input
                type="checkbox"
                defaultChecked
                className="checkbox checkbox-neutral"
              />
            </div>
          </div>
        </li>

        <li className="flex items-center gap-4">
          <button className="btn btn-sm border-2 border-white border-solid rounded-xl mt-2">
            <PencilLine />
          </button>
          <div className="list-row bg-emerald-600">
            <div className="text-4xl font-thin opacity-30 tabular-nums">01</div>
            <div className="list-col-grow">
              <div className="font-bold uppercase">Estudar Programação</div>
              <div className="text-xs font-semibold opacity-60">
                Concluir o conteúdo da trilha de formação em SOLID do
                FullStackClub
              </div>
            </div>
            <div className="mt-2">
              <input
                type="checkbox"
                defaultChecked
                className="checkbox checkbox-neutral"
              />
            </div>
          </div>
        </li>

        <li className="flex items-center gap-4">
          <button className="btn btn-sm border-2 border-white border-solid rounded-xl mt-2">
            <PencilLine />
          </button>
          <div className="list-row bg-emerald-600">
            <div className="text-4xl font-thin opacity-30 tabular-nums">01</div>
            <div className="list-col-grow">
              <div className="font-bold uppercase">Estudar Programação</div>
              <div className="text-xs font-semibold opacity-60">
                Concluir o conteúdo da trilha de formação em SOLID do
                FullStackClub
              </div>
            </div>
            <div className="mt-2">
              <input
                type="checkbox"
                defaultChecked
                className="checkbox checkbox-neutral"
              />
            </div>
          </div>
        </li>

        <li className="flex items-center gap-4">
          <button className="btn btn-sm border-2 border-white border-solid rounded-xl mt-2">
            <PencilLine />
          </button>
          <div className="list-row bg-emerald-600">
            <div className="text-4xl font-thin opacity-30 tabular-nums">01</div>
            <div className="list-col-grow">
              <div className="font-bold uppercase">Estudar Programação</div>
              <div className="text-xs font-semibold opacity-60">
                Concluir o conteúdo da trilha de formação em SOLID do
                FullStackClub
              </div>
            </div>
            <div className="mt-2">
              <input
                type="checkbox"
                defaultChecked
                className="checkbox checkbox-neutral"
              />
            </div>
          </div>
        </li>
      </ul>

      <div className="flex mt-4 justify-center">
        <button className="btn btn-disabled rounded-md w-[150px] ml-19">
          Salvar
        </button>
      </div>
    </div>
  )
}

export default TaskList
