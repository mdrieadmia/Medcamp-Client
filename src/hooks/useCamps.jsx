import { useQuery } from "@tanstack/react-query";
import axios from "axios";

const useCamps = () => {
    const {data : camps = [], isLoading : isCampsLoading } = useQuery({
        queryKey: ['camps'],
        queryFn : async()=>{
            const {data} = await axios.get('http://localhost:5000/camps')
            return data;
        }
    })
    return [camps, isCampsLoading]
};

export default useCamps;