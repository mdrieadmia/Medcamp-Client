import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "./useAxiosSecure";

const useCampDetails = (id) => {
    const axiosSecure = useAxiosSecure()
    const { data: camp = {}, isLoading } = useQuery({
        queryKey: ['camp', id],
        queryFn: async () => {
            const { data } = await axiosSecure.get(`/camp/details/${id}`)
            return data;
        }
    })
    return [camp, isLoading]
};

export default useCampDetails;