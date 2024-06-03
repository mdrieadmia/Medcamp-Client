import { Button } from "@material-tailwind/react";
import { FaCalendar, FaClock, FaDollarSign, FaLocationArrow, FaUserDoctor } from "react-icons/fa6";
import { ImSpinner9 } from "react-icons/im";
import { useParams } from "react-router-dom";
import useCampDetails from "../../hooks/useCampDetails";

const CampDetails = () => {
    const { id } = useParams()
    const [camp, isLoading] = useCampDetails(id)
    
    return (
        <div>
            {
                isLoading && <div className="flex justify-center items-center mt-10"><ImSpinner9 className="text-3xl animate-spin text-center text-green-500" /></div>
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
                                <Button className='bg-green-500'>Join Now</Button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CampDetails;