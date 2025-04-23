import Home from "../pages/Home/index.js";
import Profile from "../pages/auth/Profile/index.js";
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