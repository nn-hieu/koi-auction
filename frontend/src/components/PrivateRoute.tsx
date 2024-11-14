
import { Navigate } from 'react-router-dom'
import ForbiddenPage from './403'
import { jwtDecode } from 'jwt-decode';
import { CustomJwtPayload } from '@/type/jwt';


const PrivateRoute = ({ element, allowedRoles }: { element: JSX.Element, allowedRoles: string[] }) => {

   const token = localStorage.getItem('token');
   const user = token ? jwtDecode(token) as CustomJwtPayload : null;

   if (user && allowedRoles && !allowedRoles.includes(user.scope)) {
      return <ForbiddenPage />
   }


   if (!user) {
      return <Navigate to="/signin" />
   }


   return element
}

export default PrivateRoute
