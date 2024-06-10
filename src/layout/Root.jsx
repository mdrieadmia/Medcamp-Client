import { Outlet } from "react-router-dom";
import Menubar from "../shared/Menubar/Menubar";
import Footer from "../shared/Footer/Footer";

const Root = () => {
    return (
        <div>
            <Menubar/>
            <div className="min-h-[calc(100vh-440px)]">
                <Outlet/>
            </div>
            <Footer/>
        </div>
    );
};

export default Root;