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
                path : 'profile',
                element : <Profile/>
            },
            {
                path : 'add-camp',
                element : <AddCamp/>
            },
            {
                path : 'manage-camps',
                element : <ManageCamps/>
            },
            {
                path : 'manage-registered-camps',
                element : <ManageRegisteredCamps/>
            },
            // Participant Paths
            {
                path : 'analytics',
                element : <Analytics/>
            },
            {
                path : 'participant-profile',
                element : <ParticipantProfile/>
            },
            {
                path : 'registered-camps',
                element : <RegisteredCamps/>
            },
            {
                path : 'payment-history',
                element : <PaymentHistory/>
            },
        ]
    }

])

export default Routes;