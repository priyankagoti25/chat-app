import {Routes, Route, Navigate} from "react-router-dom";
import Navbar from "./components/Navbar/index.jsx";
import Login from "./pages/auth/Login/index.jsx";
import Signup from "./pages/auth/Signup/index.jsx";
import Settings from "./pages/Settings/index.jsx";
import {useAuthStore} from "./store/useAuthStore.js";
import {useEffect} from "react";
import {Loader} from "lucide-react";
import AuthProtected from "./routes/AuthProtected.jsx";
import {authRoutes} from "./routes/authRoutes.js"
import {Toaster} from "react-hot-toast";


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

        <Route path="/login" element={ !authUser ? <Login/> : <Navigate to="/"/> }/>
        <Route path="/signup" element={ !authUser ? <Signup/> : <Navigate to="/"/> }/>
        <Route path="/settings" element={<Settings/>}/>
      </Routes>
        <Toaster/>
    </div>
  )
}

export default App
