import { useSelector } from "react-redux"
import { Outlet } from "react-router-dom"
import UnAuthorized from "../pages/UnAuthorized"
import { RootState } from "../redux/store"

const ProtectedAdminRoutes = () => {
  const { loggedInUserJson } = useSelector((state: RootState) => state.loggedInUserStore)
  return loggedInUserJson === null ?
    <UnAuthorized></UnAuthorized>
    :
    <Outlet></Outlet>
}

export default ProtectedAdminRoutes