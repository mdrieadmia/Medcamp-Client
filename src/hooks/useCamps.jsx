import { useQuery } from "@tanstack/react-query";
import axios from "axios";

const useCamps = () => {
    const {data : camps = [], isLoading : isCampsLoading, refetch } = useQuery({
        queryKey: ['camps'],
        queryFn : async()=>{
            const {data} = await axios.get('https://medcamp-server.vercel.app/camps')
            return data;
        }
    })
    return [camps, isCampsLoading, refetch]
};

export default useCamps;