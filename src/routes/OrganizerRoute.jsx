import { Navigate, useLocation } from "react-router-dom";
import useAuth from "../hooks/useAuth";
import PropTypes from 'prop-types';
import { ImSpinner9 } from "react-icons/im";
import useOrganizer from "../hooks/useOrganizer";


const OrganizerRoute = ({ children }) => {
    const { user, isUserLoding } = useAuth();
    const [isOrganizer, isOrganizerLoading] = useOrganizer();
    const location = useLocation();

    if (isUserLoding || isOrganizerLoading) {
        return  <div className="flex justify-center items-center"><ImSpinner9 className="text-3xl animate-spin text-center text-green-500" /></div>
    }

    if (user && isOrganizer) {
        return children;
    }

    return <Navigate to="/" state={{ from: location }} replace></Navigate>

};


OrganizerRoute.propTypes = {
    children: PropTypes.node
};


export default OrganizerRoute;