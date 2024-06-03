import { Navigate, useLocation } from "react-router";
import useAuth from "../hooks/useAuth";
import PropTypes from 'prop-types';
import { ImSpinner9 } from "react-icons/im";

const PrivateRoute = ({ children }) => {
    const { user, isUserLoading } = useAuth();
    const location = useLocation();

    if(isUserLoading){
        return <div className="flex justify-center items-center"><ImSpinner9 className="text-3xl animate-spin text-center text-green-500" /></div>
    }

    if (user) {
        return children;
    }
    return <Navigate to="/signin" state={{from: location}} replace></Navigate>
};

PrivateRoute.propTypes = {
    children: PropTypes.node
};

export default PrivateRoute;