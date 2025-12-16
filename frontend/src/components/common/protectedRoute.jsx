import { useSelector } from "react-redux"
import { Navigate } from "react-router-dom"

function ProtectRoute({children, role}) {
    const {user} = useSelector((state) => state.auth)
    if (!user || (user && user.role !== role)) {
        return <Navigate to="/" replace/>
    }

    return children
}

export default ProtectRoute