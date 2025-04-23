import { Routes, Route} from "react-router-dom";
import Navbar from "./components/Navbar/index.js";
import Home from "./pages/Home/index.js";
import Login from "./pages/auth/Login/index.js";
import Signup from "./pages/auth/Signup/index.js";
import Profile from "./pages/auth/Profile/index.js";
import Settings from "./pages/Settings/index.js";
import {useAuthStore} from "./store/useAuthStore.js";
import {useEffect} from "react";
import {Loader} from "lucide-react";
import AuthProtected from "./routes/AuthProtected.jsx";
import {authRoutes} from "./routes/authRoutes.js"


function App() {
    const {authUser, checkAuth, isCheckingAuth} = useAuthStore()

    useEffect(() => {
        checkAuth()
    }, [checkAuth]);

     if(isCheckingAuth && !authUser) {
        return (
            <div className="flex items-center justify-center h-screen">
                <Loader className="animate-spin size-14"/>
            </div>
        )
    }
  return (
    <div>
      <Navbar/>
      <Routes>
          {
              authRoutes.map(({path, component: Component}) => (
                  <Route path={path} element={
                      <AuthProtected>
                        <Component/>
                      </AuthProtected>
                  }/>
              ))
          }

        <Route path="/login" element={<Login/>}/>
        <Route path="/signup" element={<Signup/>}/>
        <Route path="/settings" element={<Settings/>}/>
      </Routes>
    </div>
  )
}

export default App
