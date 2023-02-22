import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { RootState } from '../../redux/store';

const UnAuthorized = () => {
  const { loggedInUserJson } = useSelector((state: RootState) => state.loggedInUserStore)
  const navigate = useNavigate();
  useEffect(() => {
    if (loggedInUserJson === null) {
      navigate("/", { replace: true })
    }
  }, [])
  return (
    <div>UnAuthorized</div>
  )
}

export default UnAuthorized