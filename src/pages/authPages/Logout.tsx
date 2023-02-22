import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { auth } from "../../firebase.config";
import { setloggedInUserJson } from "../../redux/features/loggedInUser";
import { RootState } from "../../redux/store";

const Logout = () => {
  const { loggedInUserJson } = useSelector((state: RootState) => state.loggedInUserStore)
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    auth.signOut().then(function () {
      navigate("/", { replace: true })
      dispatch(setloggedInUserJson(null))
    }).catch(function(error) {
    });
  }, [])

  useEffect(() => {
    if (loggedInUserJson === null) {
      navigate("/", { replace: true })
    }
  }, [loggedInUserJson])
  return (
    <div>Logout</div>
  )
}

export default Logout