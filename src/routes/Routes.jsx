import { createBrowserRouter } from "react-router-dom";
import Root from "../layout/Root";
import ErrorPage from "../shared/ErrorPage/ErrorPage";
import Home from './../pages/Home/Home';
import AvaiableCapms from './../pages/AvaiableCamps/AvaiableCapms';
import Signin from "../pages/SignIn/Signin";
import SignUp from "../pages/SignUp/SignUp";
import Dashboard from "../layout/Dashboard";

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
        path:'dashboard',
        element : <Dashboard/>,
        errorElement : <ErrorPage/>,
        children : [
            {
                path : 'profile'
            }
        ]
    }

])

export default Routes;