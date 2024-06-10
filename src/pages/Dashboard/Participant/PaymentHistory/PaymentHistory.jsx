import { Helmet } from "react-helmet-async";
import useAuth from "../../../../hooks/useAuth";
import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../../../hooks/useAxiosSecure";
import { ImSpinner9 } from 'react-icons/im';
import PaymentHistoryTable from "../../../../components/Dashboard/PaymentHistoryTable/PaymentHistoryTable";

const PaymentHistory = () => {
    const {user, isUserIsLoading} = useAuth();
    const axiosSecure = useAxiosSecure();
    const {data : paymentCamps = [], isLoading} = useQuery({
        queryKey : ["paymentCamps"],
        enabled : !!user,
        queryFn : async()=>{
            const {data} = await axiosSecure.get(`/payment/camp/${user?.email}`)
            return data;
        }
    })
    if(isUserIsLoading || isLoading){
        return <div className="flex justify-center items-center mt-10"><ImSpinner9 className="text-3xl animate-spin text-center text-green-500" /></div>
    }
    return (
        <div>
            <Helmet>
                <title>Payment History | Dashboard</title>
            </Helmet>
            <h1 className="text-xl font-bold text-green-500 text-center mt-10 mb-5">Payment History</h1>
            <div className="container mx-auto border">
                <PaymentHistoryTable paymentCamps={paymentCamps}/>
            </div>
        </div>
    );
};

export default PaymentHistory;