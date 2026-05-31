import { UserRoundKey } from "lucide-react"

function App() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-base-200">
      <div className="flex justify-center mb-12">
        <img
          alt="Task Manager Logo"
          src="task_manager.png"
          className="w-[25%] h-[25%]"
        />
      </div>

      <div className="flex flex-row space-x-2 mt-12">
        <h2 className="font-bold">Faça seu login</h2>
        <UserRoundKey />
      </div>

      <form>
        <div className="flex flex-col gap-4 mt-12">
          <input
            type="text"
            placeholder="Usuário"
            className="input input-lg w-100"
          />
          <input
            type="password"
            placeholder="Senha"
            className="input input-lg w-100"
          />
        </div>

        <div className="flex flex-col space-y-2 mt-8">
          <button
            type="submit"
            className="btn btn-success border-4 border-solid w-100 rounded-full text-white"
          >
            Login
          </button>

          <button
            type="outline"
            className="btn border-4 border-solid rounded-full"
          >
            Cadastrar
          </button>
        </div>
      </form>
    </div>
  )
}

export default App
