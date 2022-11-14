import { useAuth } from "./hooks/useAuth"
import Login from "./pages/Login"


export default () => {
    const { isAuthenticated } = useAuth()
    if (!isAuthenticated) {
        return (
            <>
                <Login></Login>
            </>
        )
    }
    return (
        <>
        <Home></Home>
        </>
    )
}