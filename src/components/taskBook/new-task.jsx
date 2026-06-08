const NewTask = () => {
  return (
    <div className="card w-150 card-lg">
      <div className="card-body space-y-6">
        <div className="space-y-2">
          <h2 className="card-title card-actions text-emerald-500">
            Título da Tarefa
          </h2>
          <input
            type="text"
            placeholder="Dê um título para a tarefa"
            className="input input-md w-full border border-emerald-500"
          />
        </div>

        <div className="space-y-2">
          <h2 className="card-title card-actions text-emerald-500">
            Descrição
          </h2>
          <input
            type="text"
            placeholder="Descreva a tarefa"
            className="input input-md w-full border border-emerald-500"
          />
        </div>
        <div className="justify-center card-actions mt-6">
          <button className="btn btn-success min-w-[150px] text-white">
            Criar
          </button>
        </div>
      </div>
    </div>
  )
}

export default NewTask
