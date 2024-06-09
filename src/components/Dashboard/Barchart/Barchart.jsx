import { useQuery } from "@tanstack/react-query";
import useAuth from "../../../hooks/useAuth";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import { BarChart, Bar, XAxis, YAxis, Tooltip, CartesianGrid } from 'recharts';
const Barchart = () => {
    const { user } = useAuth();
    const axiosSecure = useAxiosSecure()
    const { data: registeredCamps = []} = useQuery({
        queryKey: ['registered', user],
        enabled: !!user,
        queryFn: async () => {
            const { data } = await axiosSecure.get(`/registerd/${user?.email}`)
            console.log(data);
            return data;
        }
    })

    return (
        <div>
            <h1 className="text-2xl font-semibold text-green-500 mb-5">Joined Camps</h1>
            <BarChart width={600} height={300} data={registeredCamps}>
                <XAxis dataKey="campName" stroke="#22c55e" />
                <YAxis />
                <Tooltip />
                <CartesianGrid stroke="#ccc" strokeDasharray="5 5" />
                <Bar dataKey="campFees" fill="#22c55e" barSize={30} />
            </BarChart>
        </div>
    );
};

export default Barchart;