import { useQuery } from "@tanstack/react-query";
import useAuth from "./useAuth";
import useAxiosSecure from "./useAxiosSecure";


const useOrganizer = () => {
    const { user, isUserLoading } = useAuth();
    const axiosSecure = useAxiosSecure();

    const { data: isOrganizer, isPending: isOrganizerLoading } = useQuery({
        queryKey: [user?.email, 'isOrganizer'],
        enabled: !isUserLoading,
        queryFn: async () => {
            const res = await axiosSecure.get(`/organizer/${user.email}`);
            return res.data.organizer;
        }
    })
    return [isOrganizer, isOrganizerLoading]
};

export default useOrganizer;