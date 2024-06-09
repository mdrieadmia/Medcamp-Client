import { Helmet } from "react-helmet-async";
import useAuth from "../../../../hooks/useAuth";
import { ImSpinner9 } from "react-icons/im";

const Analytics = () => {

    const { user, isUserLoading } = useAuth();

    if (isUserLoading) {
        return <div className="flex justify-center items-center mt-10"><ImSpinner9 className="text-3xl animate-spin text-center text-green-500" /></div>
    }

    return (
        <div>
            <Helmet>
                <title>Analytics | Dashboard</title>
            </Helmet>
            <div className="container mx-auto px-5 bg-gray-100">
                <h1 className="text-4xl font-bold text-green-500 mt-10 mb-2">Welcome Back ! <span className="text-4xl font-bold text-gray-800 mb-5">{user?.displayName}</span> </h1>
                <div className="pt-10 grid grid-cols-2">
                    <div>
                        <div>
                            
                        </div>
                    </div>
                    <div>
                        section 2
                    </div>
                </div>
                <div className="grid grid-cols-2">
                    <div className="grid grid-cols-2">
                        <div>Section 3</div>
                        <div>Section 4</div>
                        <div>Section 5</div>
                        <div>Section 6</div>
                    </div>
                    <div>
                        <div>section 7</div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Analytics;