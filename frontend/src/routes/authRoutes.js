import Home from "../pages/Home/index.jsx";
import Profile from "../pages/auth/Profile/index.jsx";
const authRoutes = [
    {
        path: "/",
        component: Home
    },
    {
        path: "/profile",
        component: Profile
    }
]

export {authRoutes}