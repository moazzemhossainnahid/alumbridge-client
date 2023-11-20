import { signOut } from 'firebase/auth';
import { useAuthState } from 'react-firebase-hooks/auth';
import { Navigate, useLocation } from 'react-router-dom';
import Loading from '../Loading/Loading';
import UseAdmin from '../../../Hooks/useAdmin';
import auth from '../../../../firebase.init';


const RequireAdmin = ({ children }) => {
  let location = useLocation();
  const [user, loading] = useAuthState(auth);
  const [admin, adminLoading] = UseAdmin();


  if (loading || adminLoading) { 
    return <Loading />;
  }

  // console.log(admin);

  if (!user || !admin) {
    signOut(auth);
    localStorage.removeItem("accessToken")
    return <Navigate to="/signin" state={{ from: location }} replace />;
  }
  
  return children;
};

export default RequireAdmin;