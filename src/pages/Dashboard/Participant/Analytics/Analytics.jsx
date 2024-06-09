import { Helmet } from "react-helmet-async";
import useAuth from "../../../../hooks/useAuth";
import { ImSpinner9 } from "react-icons/im";
import Barchart from "../../../../components/Dashboard/Barchart/Barchart";
import AnalyticsPaymentHistory from "../../../../components/Dashboard/AnalyticsPaymentHistory/AnalyticsPaymentHistory";
import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../../../hooks/useAxiosSecure";


const Analytics = () => {
    const { user, isUserLoading } = useAuth()
    const axiosSecure = useAxiosSecure();
    const { data: totalCamp = [] } = useQuery({
        queryKey: ['totalCamp'],
        enabled: !!user,
        queryFn: async () => {
            const { data } = await axiosSecure.get(`/registerd/${user.email}`)
            return data;
        }
    })
    let totalCost = 0;
    let totalPendingJoin = 0;
    let totalJoinedCamp = 0;
    for(const camp of totalCamp){
        const amount = parseInt(camp.campFees)
        totalCost = totalCost + amount;
        if(camp.confirmationStatus === 'Pending'){
            totalPendingJoin++
        }
        if(camp.confirmationStatus === 'Confirmed'){
            totalJoinedCamp++
        }
    }

    if (isUserLoading) {
        return <div className="flex justify-center items-center mt-10"><ImSpinner9 className="text-3xl animate-spin text-center text-green-500" /></div>
    }
    console.log(totalCost);
    return (
        <div>
            <Helmet>
                <title>Analytics | Dashboard</title>
            </Helmet>
            <div className="container mx-auto px-5 ">
                <h1 className="text-4xl font-bold text-green-500 mt-10 mb-2">Welcome Back ! <span className="text-4xl font-bold text-gray-800 mb-5">{user?.displayName}</span> </h1>
                <div className="pt-10 grid grid-cols-1 lg:grid-cols-2 gap-10">
                    <div>
                        <Barchart />
                    </div>
                    <div className="w-full">
                        <h1 className="text-2xl font-semibold text-green-500 mb-5">Camp Summary</h1>
                        <div className="grid grid-cols-2 gap-5">
                            <div className="bg-green-50 w-full rounded-lg p-5">
                                <div>
                                    <h1 className="text-xl text-center mt-2 font-semibold text-green-700 ">Applied Camp</h1>
                                    <h1 className="text-3xl mt-3 font-semibold text-green-700 text-center">{totalCamp.length}</h1>
                                </div>
                            </div>
                            <div className="bg-green-50 w-full rounded-lg p-5">
                                <div>
                                    <h1 className="text-xl text-center mt-2 font-semibold text-green-700 ">Pending Join</h1>
                                    <h1 className="text-3xl mt-3 font-semibold text-green-700 text-center">{totalPendingJoin}</h1>
                                </div>
                            </div>
                            <div className="bg-green-50 w-full rounded-lg p-5">
                                <div>
                                    <h1 className="text-xl text-center mt-2 font-semibold text-green-700 ">Joined Camp</h1>
                                    <h1 className="text-3xl mt-3 font-semibold text-green-700 text-center">{totalJoinedCamp}</h1>
                                </div>
                            </div>
                            <div className="bg-green-50 w-full rounded-lg p-5">
                                <div>
                                    <h1 className="text-xl text-center mt-2 font-semibold text-green-700 ">Total Cost</h1>
                                    <h1 className="text-3xl mt-3 font-semibold text-green-700 text-center">$ {totalCost}</h1>
                                </div>
                            </div>

                        </div>
                    </div>
                </div>
                <div className="mt-10 gap-10">
                    <div className="h-full">
                        <h1 className="text-2xl font-semibold text-green-500 mb-5">Recent Transections</h1>
                        <div className="h-full bg-green-50 rounded-lg px-5 pb-5">
                            <AnalyticsPaymentHistory />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Analytics;