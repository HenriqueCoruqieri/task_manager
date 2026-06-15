import Footer from "../components/footer"
import Header from "../components/header"
import UserMenu from "../components/user-menu"

const CompletedTasks = () => {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <UserMenu />

      <div className="flex flex-1 justify-center items-center">
        <h1>Conteúdo da página</h1>
      </div>

      <Footer />
    </div>
  )
}

export default CompletedTasks
