import { createBrowserRouter } from "react-router-dom";
import Root from "../layout/Root";
import ErrorPage from "../shared/ErrorPage/ErrorPage";
import Home from './../pages/Home/Home';
import AvaiableCapms from './../pages/AvaiableCamps/AvaiableCapms';
import Signin from "../pages/SignIn/Signin";
import SignUp from "../pages/SignUp/SignUp";
import Dashboard from "../layout/Dashboard";
import Profile from "../pages/Dashboard/Organizer/Profile/Profile";
import AddCamp from './../pages/Dashboard/Organizer/AddCamp/AddCamp';
import ManageCamps from './../pages/Dashboard/Organizer/ManageCamps/ManageCamps';
import ManageRegisteredCamps from './../pages/Dashboard/Organizer/ManageRegisteredCamps/ManageRegisteredCamps';
import ParticipantProfile from './../pages/Dashboard/Participant/ParticipantProfile/ParticipantProfile';
import Analytics from './../pages/Dashboard/Participant/Analytics/Analytics';
import RegisteredCamps from './../pages/Dashboard/Participant/RegisteredCamps/RegisteredCamps';
import PaymentHistory from './../pages/Dashboard/Participant/PaymentHistory/PaymentHistory';
import Blogs from "../pages/Blogs/Blogs";
import CampDetails from "../pages/CampDetails/CampDetails";
import PrivateRoute from "./PrivetRoute";
import OrganizerRoute from "./OrganizerRoute";
import UpdateCamp from "../pages/Dashboard/UpdateCamp/UpdateCamp";
import Payment from "../pages/Dashboard/Participant/Payment/Payment";
import Feedback from "../pages/Dashboard/Participant/Feedback/Feedback";

const Routes = createBrowserRouter([
    {
        path : '/',
        element : <Root/>,
        errorElement : <ErrorPage/>,
        children : [
            {
                index : true,
                element : <Home/>
            },
            {
                path : 'avaiable-camps',
                element : <AvaiableCapms/>
            },
            {
                path : 'blogs',
                element : <Blogs/>
            },
            {
                path : 'camp/details/:id',
                element : <PrivateRoute><CampDetails/></PrivateRoute>
            },
            {
                path : 'signin',
                element : <Signin/>
            },
            {
                path : 'signup',
                element : <SignUp/>
            },
        ]

    },
    {
        path:'/dashboard',
        element : <Dashboard/>,
        errorElement : <ErrorPage/>,
        children : [
            // Organizer Paths
            {
                path : 'organizer-profile',
                element : <OrganizerRoute><Profile/></OrganizerRoute>
            },
            {
                path : 'add-camp',
                element : <OrganizerRoute><AddCamp/></OrganizerRoute>
            },
            {
                path : 'manage-camps',
                element : <OrganizerRoute><ManageCamps/></OrganizerRoute>
            },
            {
                path : 'camp/update/:id',
                element : <OrganizerRoute><UpdateCamp/></OrganizerRoute>
            },
            {
                path : 'manage-registered-camps',
                element : <OrganizerRoute><ManageRegisteredCamps/></OrganizerRoute>
            },
            // Participant Paths
            {
                path : 'analytics',
                element : <PrivateRoute><Analytics/></PrivateRoute>
            },
            {
                path : 'participant-profile',
                element : <PrivateRoute><ParticipantProfile/></PrivateRoute>
            },
            {
                path : 'registered-camps',
                element : <PrivateRoute><RegisteredCamps/></PrivateRoute>
            },
            {
                path : 'payment/:fees',
                element : <PrivateRoute><Payment/></PrivateRoute>
            },
            {
                path : 'payment-history',
                element : <PrivateRoute><PaymentHistory/></PrivateRoute>
            },
            {
                path : 'feedback',
                element : <PrivateRoute><Feedback/></PrivateRoute>
            },
        ]
    }

])

export default Routes;