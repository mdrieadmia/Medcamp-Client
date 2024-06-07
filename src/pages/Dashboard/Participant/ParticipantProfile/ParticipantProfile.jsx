/* eslint-disable no-unused-vars */
import { Helmet } from "react-helmet-async";
import { useState } from "react";
import toast from "react-hot-toast";
import { Button } from "@material-tailwind/react";
import { FaEnvelope, FaPhone } from "react-icons/fa6";
import useAuth from "../../../../hooks/useAuth";
import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../../../hooks/useAxiosSecure";
import { ImSpinner9 } from "react-icons/im";
import UpdateOrganizerModal from "../../../../components/Dashboard/UpdateOrganizerModal/UpdateOrganizerModal";
import imageUpload from "../../../../utils/utility";

const ParticipantProfile = () => {
    const axiosSecure = useAxiosSecure()
    const [processing, setProcessing] = useState(false)
    const {user, isUserLoading, updateUserProfile} = useAuth()
    let [isOpen, setIsOpen] = useState(false)
     
    const { data: participantInfo = {}, isLoading: isParticipantDataLoading, refetch } = useQuery({
        queryKey: ['participant'],
        enabled: (!isUserLoading),
        queryFn: async () => {
            const { data } = await axiosSecure.get(`/user-participant/${user?.email}`)
            return data;
        }
    })
    const { displayName, photoURL, contact, email : mainEmail } = participantInfo || {};
    const { phone, email } = contact ||{}
    function open() {
        setIsOpen(true)
    }

    function close() {
        setIsOpen(false)
    }

    const handleUpdate = async(data) => {
        setProcessing(true)
        const {email, name, phone, photo,  } = data || {}
        let userPhotoURL = photoURL;
        const existImage = !!data.photo[0];
        if(existImage){
            const newURL = await imageUpload(photo[0])
            userPhotoURL = newURL;
        }

        const updateUser = {
            displayName : name,
            email : mainEmail,
            photoURL : userPhotoURL,
            contact : {
                phone : phone,
                email : email,
            }
        }

        try{
            await updateUserProfile(name, userPhotoURL)
            await axiosSecure.patch(`/user/${mainEmail}`, updateUser)
            close()
            refetch()
            toast.success("Data updated successfully")
            setProcessing(false)
        }catch(err){
            toast.error("Data update failed")
            setProcessing(false)
        }
    }

    if (isUserLoading || isParticipantDataLoading) return <div className="flex justify-center items-center mt-16"><ImSpinner9 className="text-3xl animate-spin text-center text-green-500" /></div>

    return (
        <div>
            <Helmet>
                <title>Profile | Dashboard</title>
            </Helmet>
            <div>

            </div>
            <h1 className="text-xl font-bold text-green-500 text-center mt-10 mb-5">Participant Profile</h1>

            <div>
                <div className="max-w-[900px] mx-auto">
                    <div className="flex mt-10 flex-col">
                        <div className="h-[130px] rounded-md w-full bg-[url('https://i.postimg.cc/28Vrn4wZ/background.jpg')] bg-center bg-cover bg-no-repeat"></div>
                        <img className="w-32 h-32 rounded-full border-4 border-green-500 p-1 -mt-[70px] ml-5 bg-white" src={photoURL} alt="User" />
                    </div>
                    <div className="ml-7">
                        <h1 className="text-2xl font-semibold mt-2">{displayName}</h1>
                        <p>Participant, MEDCAMP</p>
                        <p className="font-semibold mt-3 flex gap-2 items-center"><FaEnvelope /> {email}</p>
                        <p className="font-semibold flex mt-1 gap-2 items-center"> <FaPhone /> {phone === null ? "Not Given" : phone}</p>
                        <div className="flex justify-end">
                            <Button onClick={open} className='bg-green-500'>Update Profile</Button>
                            <UpdateOrganizerModal userInfo={participantInfo} isOpen={isOpen} handleUpdate={handleUpdate} close={close} processing={processing} />
                        </div>
                    </div>
                </div>
            </div>

        </div>
    );
};

export default ParticipantProfile;