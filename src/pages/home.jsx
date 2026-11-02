import UserMenu from "../components/user-menu"
import Header from "../components/header"
import Footer from "../components/footer"
import TaskBook from "../components/task-book/task-book"

const Home = () => {

  return (
    <div className="flex flex-col h-screen">
      <Header />

      <div className="flex flex-col flex-1 min-h-0">
        <div className="flex">
          <UserMenu />
        </div>

        <div className="flex flex-col flex-1 min-h-0 items-center">
          <TaskBook />
        </div>
      </div>

      <Footer />
    </div>
  )
}

export default Home
