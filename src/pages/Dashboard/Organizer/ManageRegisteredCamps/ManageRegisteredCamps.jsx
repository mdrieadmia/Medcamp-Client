import { Helmet } from "react-helmet-async";
import useAxiosSecure from "../../../../hooks/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";
import Swal from 'sweetalert2';
import { toast } from 'react-hot-toast';
import { ImSpinner9 } from 'react-icons/im';
import ManageRegisteredCampTable from "../../../../components/Dashboard/ManageRegisteredCampTable/ManageRegisteredCampTable";

const ManageRegisteredCamps = () => {
    const axiosSecure = useAxiosSecure()

    const {data: allRegisteredCamps = [], isLoading, refetch} = useQuery({
        queryKey: ['allRegisteredCamps'],
        queryFn : async()=>{
            const {data} = await axiosSecure.get('/registered/camps')
            return data
        }
    })

    console.log(allRegisteredCamps);

    const handleCampDelete = (id) => {
        console.log(id);
        Swal.fire({
            title: "Confirm your deletation",
            text: "You won't be able to revert this!",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Delete"
        }).then(async (result) => {
            if (result.isConfirmed) {
                try {
                    const { data } = await axiosSecure.delete(`/registered/camp/${id}`)
                    if (data.deletedCount > 0) {
                        refetch()
                        toast.success(`Camp Deleted Succefully`)
                    }
                } catch (err) {
                    toast.error('Camp Delete Failed')
                }
            }
        });
    }

    if(isLoading){
        return <div className="flex justify-center items-center mt-10"><ImSpinner9 className="text-3xl animate-spin text-center text-green-500" /></div>
    }

    return (
        <div>
            <Helmet>
                <title>Manage Registered Camps | Dashboard</title>
            </Helmet>
            <h1 className="text-xl font-bold text-green-500 text-center mt-10 mb-5">Manage Registered Camps</h1>
            <div>
                <ManageRegisteredCampTable handleCampDelete={handleCampDelete} allRegisteredCamps={allRegisteredCamps}/>
            </div>
        </div>
    );
};

export default ManageRegisteredCamps;