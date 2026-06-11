import { BrowserRouter, Routes, Route } from "react-router-dom"
import Login from "./pages/login"
import Dashboard from "./pages/dashboard"
import Profile from "./pages/profile"

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/:username/dashboard" element={<Dashboard />} />
        <Route path="/:username/dashboard/profile" element={<Profile />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
