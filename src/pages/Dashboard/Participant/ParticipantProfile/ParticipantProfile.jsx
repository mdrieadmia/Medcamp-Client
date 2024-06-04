/* eslint-disable no-unused-vars */
import { Helmet } from "react-helmet-async";
import { useState } from "react";
import toast from "react-hot-toast";
import { Button } from "@material-tailwind/react";
import { FaEnvelope, FaPhone } from "react-icons/fa6";

const ParticipantProfile = () => {
    let [isOpen, setIsOpen] = useState(false)



    function open() {
        setIsOpen(true)
    }

    function close() {
        setIsOpen(false)
    }

    const handleOrganizerUpdate = () => {
        toast.success("Profile Updated")
        close()
    }
    return (
        <div>
            <Helmet>
                <title>Profile | Dashboard</title>
            </Helmet>
            <div>

            </div>
            <h1 className="text-xl font-bold text-green-500 text-center mt-10 mb-5">Organizer Profile</h1>

            <div>
                <div className="max-w-[900px] mx-auto">
                    <div className="flex mt-10 flex-col">
                        <div className="h-[130px] rounded-md w-full bg-[url('https://i.postimg.cc/28Vrn4wZ/background.jpg')] bg-center bg-cover bg-no-repeat"></div>
                        <img className="w-32 h-32 rounded-full border-4 border-green-500 p-1 -mt-[70px] ml-5 bg-white" src="" alt="User" />
                    </div>
                    <div className="ml-7">
                        <h1 className="text-2xl font-semibold mt-2">{}</h1>
                        <p>Organizer, MEDCAMP</p>
                        <p className="font-semibold mt-3 flex gap-2 items-center"><FaEnvelope /> {}</p>
                        <p className="font-semibold flex mt-1 gap-2 items-center"> <FaPhone /> {}</p>
                        <div className="flex justify-end">
                            <Button onClick={open} className='bg-green-500'>Update Profile</Button>
                            {/* <UpdateOrganizerModal organizerInfo={organizerInfo} isOpen={isOpen} handleOrganizerUpdate={handleOrganizerUpdate} close={close} /> */}
                        </div>
                    </div>
                </div>
            </div>

        </div>
    );
};

export default ParticipantProfile;