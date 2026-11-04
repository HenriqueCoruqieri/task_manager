import { BrowserRouter, Routes, Route } from "react-router-dom"
import { UserProvider } from "./context/user-provider"
import { ROUTES } from "./constants/routes"
import Login from "./pages/login"
import Home from "./pages/home"
import Profile from "./pages/profile"
import Account from "./pages/account"
import CompletedTasks from "./pages/completed-tasks"

function App() {
  return (
    <BrowserRouter>
      <UserProvider>
        <Routes>
          <Route path={ROUTES.login} element={<Login />} />
          <Route path={ROUTES.home} element={<Home />} />
          <Route path={ROUTES.profile} element={<Profile />} />
          <Route path={ROUTES.account} element={<Account />} />
          <Route path={ROUTES.completedTasks} element={<CompletedTasks />}/>
        </Routes>
      </UserProvider>
    </BrowserRouter>
  )
}

export default App
