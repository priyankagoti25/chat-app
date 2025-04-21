import { Routes, Route} from "react-router-dom";
import Navbar from "./components/Navbar/index.js";
import Home from "./pages/Home/index.js";
import Login from "./pages/auth/Login/index.js";
import Signup from "./pages/auth/Signup/index.js";
import Profile from "./pages/auth/Profile/index.js";
import Settings from "./pages/Settings/index.js";
import {useAuthStore} from "./store/useAuthStore.js";
import {useEffect} from "react";

function App() {
    const {authUser, checkAuth} = useAuthStore()

    useEffect(() => {
        checkAuth()
    }, [checkAuth]);
    console.log('authUser', authUser)
  return (
    <div>
      <Navbar/>
      <Routes>
        <Route path="/" element={<Home/>}/>
        <Route path="/login" element={<Login/>}/>
        <Route path="/signup" element={<Signup/>}/>
        <Route path="/profile" element={<Profile/>}/>
        <Route path="/settings" element={<Settings/>}/>
      </Routes>
    </div>
  )
}

export default App
