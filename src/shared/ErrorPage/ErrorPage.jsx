import { Link } from "react-router-dom";
import Footer from "../Footer/Footer";
import Menubar from "../Menubar/Menubar";
import { Button } from "@material-tailwind/react";

const ErrorPage = () => {
    return (
        <div>
            <Menubar/>
            <div className="min-h-[calc(100vh-355px)] flex justify-center items-center flex-col">
                <h1 className="text-7xl font-semibold text-red-500">404</h1>
                <h1>Something went wrong.</h1>
                <p>Please go back to homepage</p>
                <Link to={'/'}> <Button className="bg-green-500 mt-5"> Home </Button> </Link>
            </div>
            <Footer/>
        </div>
    );
};

export default ErrorPage;