import { useDispatch, useSelector } from "react-redux";
import { Link, Outlet, useNavigate } from "react-router-dom";
import { checkAdminState } from "../../functions/security.checkAdmin";
import { setAdmin } from "../../redux/features/loggedInUser";
import { setMessageForModal } from "../../redux/features/modalMessage";
import { RootState } from "../../redux/store";

const Admin = () => {

  const { loggedInUserJson, isAdmin } = useSelector((state: RootState) => state.loggedInUserStore)
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const adminSettingOptions = [
    {name: "Register User", link: "/admin/register"},
    {name: "Admin Access", link: "/admin/access"},
  ]

  if (loggedInUserJson !== null) {
    checkAdminState(loggedInUserJson.email, 'admin')
      .then(res => {
        dispatch(setAdmin(res))
        if (!res) {
            navigate("/", { replace: true })
        }
      }).catch(err => { 
        setMessageForModal(["Failure", "Connection Error"])
      })
  }

  return (
    <div className="p-2 w-full">
      {
        isAdmin && 
        <div className="w-full">
            <p className="dark:text-red-400 text-center tracking-[12px] uppercase font-bold text-emerald-600">Admin Panel</p>
            <div className="flex justify-around items-center w-full mt-6 mb-4">
              {
                adminSettingOptions.map(option => 
                  <Link to={option.link} className=" hover:animate-pulse border-indigo-500 dark:hover:border-indigo-400 border-2 pl-2 pr-2 pt-1 pb-1 rounded-xl">
                    <span className="dark:text-white dark:hover:text-red-300">
                      {option.name}
                    </span>
                  </Link>
                )
              }
            </div>
            <Outlet/>
        </div>
      }
    </div>
  )
}

export default Admin