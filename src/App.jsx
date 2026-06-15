import { BrowserRouter, Routes, Route } from "react-router-dom"
import { UserProvider } from "./context/user-context"
import Login from "./pages/login"
import Dashboard from "./pages/dashboard"
import Profile from "./pages/profile"
import Account from "./pages/account"
import CompletedTasks from "./pages/completed-tasks"

function App() {
  return (
    <BrowserRouter>
      <UserProvider>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/:username/dashboard" element={<Dashboard />} />
          <Route path="/:username/dashboard/profile" element={<Profile />} />
          <Route path="/:username/dashboard/account" element={<Account />} />
          <Route
            path="/:username/dashboard/completedtasks"
            element={<CompletedTasks />}
          />
        </Routes>
      </UserProvider>
    </BrowserRouter>
  )
}

export default App
