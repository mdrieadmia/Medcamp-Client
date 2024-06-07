import { Helmet } from "react-helmet-async";
import useAuth from './../../../../hooks/useAuth';
import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../../../hooks/useAxiosSecure";
import { ImSpinner9 } from "react-icons/im";
import RegisteredCampTable from "../../../../components/Dashboard/RegisteredCampTable/RegisteredCampTable";

const RegisteredCamps = () => {
    const axiosSecure = useAxiosSecure()
    const { user, isUserIsLoading } = useAuth;

    const { data: registeredCamps = [], isLoading } = useQuery({
        queryKey: ['registered', user],
        queryFn: async () => {
            const { data } = await axiosSecure.get(`/registerd/mdriead.bd@gmail.com`)
            return data;
        }
    })
    if (isUserIsLoading || isLoading )
        { 
            <div className="flex justify-center items-center mt-10"><ImSpinner9 className="text-3xl animate-spin text-center text-green-500" /></div>
        }
    return (
        <div>
            <Helmet>
                <title>Registered Camps | Dashboard</title>
            </Helmet>
            <h1 className="text-xl font-bold text-green-500 text-center mt-10 mb-5">Registered Camps</h1>
            {

            }
            <div className="mx-5 md:mx-10 lg:mx-20 border">
                <RegisteredCampTable registeredCamps={registeredCamps} />
            </div>

        </div>
    );
};

export default RegisteredCamps;