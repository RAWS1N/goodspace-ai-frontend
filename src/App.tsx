import { useEffect } from 'react'
import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import ChatPage from "./pages/ChatPage"
import HomePage from "./pages/HomePage"
import LoginPage from "./pages/LoginPage"
import RegisterPage from "./pages/RegisterPage"
import { useAuthContext } from './context/AuthContext'
import ProtectedRoute from './Protected/ProtectedRoute'
import Navbar from './components/Navbar'


const App = () => {
  const { user, getUser } = useAuthContext()

  // checking and setting user if it pre-logged in on initial render
  useEffect(() => {
    getUser()
    console.log(user)
  }, [user])

  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/chat" element={
          <ProtectedRoute element={<ChatPage />} />
        } />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
      </Routes>
    </Router>
  )
}

export default App