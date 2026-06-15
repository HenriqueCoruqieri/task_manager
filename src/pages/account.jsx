import Footer from "../components/footer"
import Header from "../components/header"
import UserMenu from "../components/user-menu"

const Account = () => {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <UserMenu />
      <div className="flex flex-1 flex-col items-center justify-center mb-40">
        <h1 className="text-emerald-500 font-bold text-3xl shadow-3xl">
          Configurações de Conta
        </h1>
        <div className="flex mt-12">
          <button className="btn btn-success">Deletar Conta</button>
        </div>
      </div>
      <Footer />
    </div>
  )
}

export default Account
