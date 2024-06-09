import { Helmet } from "react-helmet-async";
import useAuth from './../../../../hooks/useAuth';
import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../../../hooks/useAxiosSecure";
import { ImSpinner9 } from "react-icons/im";
import RegisteredCampTable from "../../../../components/Dashboard/RegisteredCampTable/RegisteredCampTable";
import Swal from "sweetalert2";

const RegisteredCamps = () => {
    const axiosSecure = useAxiosSecure()
    const { user, isUserLoading } = useAuth();

    const { data: registeredCamps = [], isLoading, refetch } = useQuery({
        queryKey: ['registered', user],
        enabled: !!user,
        queryFn: async () => {
            const { data } = await axiosSecure.get(`/registerd/${user?.email}`)
            console.log(data);
            return data;
        }
    })

    console.log(registeredCamps);

    const handleDelete = (id) => {
        try {
            Swal.fire({
                title: "Are you sure?",
                text: "You won't be able to revert this!",
                icon: "warning",
                showCancelButton: true,
                confirmButtonColor: "#3085d6",
                cancelButtonColor: "#d33",
                confirmButtonText: "Yes, delete it!"
            }).then(async(result) => {
                if (result.isConfirmed) {
                    const data = await axiosSecure.delete(`/registered/camp/${id}`)
                    console.log(data);
                    refetch()
                    Swal.fire({
                        title: "Deleted!",
                        text: "Your file has been deleted.",
                        icon: "success"
                    });
                }
            });


        } catch (err) {
            console.log(err);
        }
    }

    if (isUserLoading || isLoading) {
        <div className="flex justify-center items-center mt-10"><ImSpinner9 className="text-3xl animate-spin text-center text-green-500" /></div>
    }
    return (
        <div>
            <Helmet>
                <title>Registered Camps | Dashboard</title>
            </Helmet>
            <h1 className="text-xl font-bold text-green-500 text-center mt-10 mb-5">Registered Camps</h1>
            {

            }
            <div className="mx-5 md:mx-10 lg:mx-20 border">
                <RegisteredCampTable registeredCamps={registeredCamps} handleDelete={handleDelete} />
            </div>

        </div>
    );
};

export default RegisteredCamps;