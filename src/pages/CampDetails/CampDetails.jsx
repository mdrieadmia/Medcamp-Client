import { Button } from "@material-tailwind/react";
import { FaCalendar, FaClock, FaDollarSign, FaLocationArrow, FaUserDoctor } from "react-icons/fa6";
import { ImSpinner9 } from "react-icons/im";
import { useParams } from "react-router-dom";
import useCampDetails from "../../hooks/useCampDetails";
import useOrganizer from "../../hooks/useOrganizer";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import useAuth from "../../hooks/useAuth";
import { useState } from "react";
import JoinCampModal from "../../components/Dashboard/JoinCampModal/JoinCampModal";
import toast from "react-hot-toast";

const CampDetails = () => {
    const { id } = useParams()
    const axiosSecure = useAxiosSecure()
    const [isOpen, setIsOpen] = useState(false)
    const [camp, isLoading, refetch] = useCampDetails(id)
    const [processing, setProcessing] = useState(false)
    const [isOrganizer, isOrganizerLoading] = useOrganizer()
    const { user, isUserLoading } = useAuth()

    function open() {
        setIsOpen(true)
    }

    function close() {
        setIsOpen(false)
    }

    const handleUpdate = async (data) => {
        setProcessing(true)
        const newRegistered = {
            campId: camp._id,
            campName: camp.campName,
            campFees: camp.campFees,
            campImageURL: camp.campImageURL,
            participantCount: camp.participantCount,
            date: camp.date,
            time: camp.time,
            location: camp.location,
            description: camp.description,
            professionalName: camp.professionalName,
            age: data.age,
            gender: data.gender,
            phone: data.phone,
            emergencyContact: data.emergencyContact,
            participantName: user.displayName,
            participantEmail: user.email,
            paymentStatus : "Unpaid",
            confirmationStatus : "Pending"
        }
        try {
            const { data } = await axiosSecure.post('/registered', newRegistered)
            if (data.insertedId) {
                const updateCamp = {participantCount : camp.participantCount + 1}
                await axiosSecure.patch(`/registered-camp/${id}`, updateCamp)
                close()
                setProcessing(false)
                refetch()
                toast.success("Applied Successfully. Please wait for confirmation.")
            }
        } catch (err) {
            toast.error("Join Failed")
            setProcessing(false)
        }
    }

    return (
        <div>
            {
                isLoading && isOrganizerLoading && <div className="flex justify-center items-center mt-10"><ImSpinner9 className="text-3xl animate-spin text-center text-green-500" /></div>
            }
            <div className="container mx-auto px-5 pb-16">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 pt-10">
                    <div className="h-full">
                        <img className="w-full h-full rounded-lg" src={camp.campImageURL} alt="Camp Image" />
                    </div>
                    <div >
                        <div className=''>
                            <h1 className='text-xl font-semibold'>{camp.campName}</h1>
                            <p className="mt-2 mb-1">{camp.description}</p>
                            <hr className="my-5 border-dashed border-gray-300" />
                            <div className='flex gap-5 mt-2'>
                                <div className='flex items-center gap-1 font-semibold'>
                                    <FaDollarSign />
                                    <p>{camp.campFees}</p>
                                </div>
                                <div className='flex items-center gap-2 font-semibold'>
                                    <FaCalendar />
                                    <p>{camp.date}</p>
                                </div>
                                <div className='flex items-center gap-2 font-semibold'>
                                    <FaClock />
                                    <p>{camp.time} AM</p>
                                </div>
                            </div>
                            <div className='flex items-center gap-2 font-medium my-3'>
                                <FaLocationArrow />
                                <p>{camp.location}</p>
                            </div>
                            <div className='flex items-center gap-2 font-medium'>
                                <FaUserDoctor />
                                <p>{camp.professionalName}</p>
                            </div>
                            <hr className="my-5 border-dashed border-gray-300" />
                            <div>
                                <p className='mt-2 font-medium'>Total Participant - {camp.participantCount}</p>
                            </div>
                            <div className='mt-5'>
                                <Button onClick={open} disabled={isOrganizer} className='bg-green-500'>Join Now</Button>
                            </div>
                            <div>
                                <JoinCampModal isOpen={isOpen} user={user} isUserLoading={isUserLoading} processing={processing} camp={camp} close={close} handleUpdate={handleUpdate} />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CampDetails;