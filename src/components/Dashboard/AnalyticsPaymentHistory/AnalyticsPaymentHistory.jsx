import { useQuery } from "@tanstack/react-query";
import useAuth from "../../../hooks/useAuth";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import { ImSpinner9 } from "react-icons/im";

const AnalyticsPaymentHistory = () => {
    const { user, isUserIsLoading } = useAuth();
    const axiosSecure = useAxiosSecure();
    const { data: paymentCamps = [], isLoading } = useQuery({
        queryKey: ["paymentCamps"],
        enabled: !!user,
        queryFn: async () => {
            const { data } = await axiosSecure.get(`/payment/camp/${user.email}`)
            console.log(data);
            return data;
        }
    })

    if (isUserIsLoading || isLoading) {
        return <div className="flex justify-center items-center mt-10"><ImSpinner9 className="text-3xl animate-spin text-center text-green-500" /></div>
    }
    console.log(paymentCamps);
    return (

        <div className="bg-green-50 rounded-lg h-full">
            <div className="grid grid-cols-3 p-3">
                <h1 className="text-lg font-semibold">Camp Name</h1>
                <p className="text-lg font-semibold">Camp Fees</p>
                <p className="text-lg font-semibold">Transection ID</p>
            </div>
            {
                paymentCamps.map((camp, idx) => {
                    return <div key={camp._id} className={`grid grid-cols-3 rounded-lg font-medium py-3 px-3 ${idx % 2 === 0 ? "bg-green-100" : "bg-transparent"}`}>
                        <h1>{camp.campName}</h1>
                        <p>$ {camp.campFees}</p>
                        <p className="uppercase"> {camp.transectionId}</p>
                    </div>
                })
            }
        </div>
    );
};

export default AnalyticsPaymentHistory;