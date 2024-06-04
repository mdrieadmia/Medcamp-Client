import { Helmet } from "react-helmet-async";
import useCamps from "../../../../hooks/useCamps";
import ManageCampTable from "../../../../components/Dashboard/ManageCampTable/ManageCampTable";
import { ImSpinner9 } from "react-icons/im";
import { useState } from "react";
import toast from "react-hot-toast";
import Swal from 'sweetalert2'
import useAxiosSecure from './../../../../hooks/useAxiosSecure';

const ManageCamps = () => {
    const axiosSecure = useAxiosSecure()
    const [camps, isCampsLoading, refetch] = useCamps()
    let [isOpen, setIsOpen] = useState(false)

    function open() {
        setIsOpen(true)
    }

    function close() {
        setIsOpen(false)
    }

    const handleCampDelete = (id) => {
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
                    const { data } = await axiosSecure.delete(`/camp/${id}`)
                    if (data.deletedCount > 0) {
                        refetch()
                        toast.success(`Camp Deleted Succefully`)
                    }
                } catch (err) {
                    console.log(err);
                }
            }
        });
        close()
    }
    return (
        <div>
            <Helmet>
                <title>Manage Camps | Dashboard</title>
            </Helmet>
            <h1 className="text-xl font-bold text-green-500 text-center mt-10 mb-5">Manage Cmaps</h1>
            {
                isCampsLoading && <div className="flex justify-center items-center mt-10"><ImSpinner9 className="text-3xl animate-spin text-center text-green-500" /></div>
            }
            <div className="mx-10 border">
                <ManageCampTable camps={camps} open={open} isOpen={isOpen} handleCampDelete={handleCampDelete} close={close} />
            </div>
        </div>
    );
};

export default ManageCamps;