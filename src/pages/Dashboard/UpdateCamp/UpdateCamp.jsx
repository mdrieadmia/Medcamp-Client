import { Button } from "@material-tailwind/react";
import { useState } from "react";
import { Helmet } from "react-helmet-async";
import { useForm } from "react-hook-form";
import { useNavigate, useParams } from "react-router-dom";
import useCampDetails from "../../../hooks/useCampDetails";
import { ImSpinner9 } from "react-icons/im";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import imageUpload from "../../../utils/utility";
import toast from "react-hot-toast";

const UpdateCamp = () => {
    const { id } = useParams()
    const navigate = useNavigate()
    const axiosSecure = useAxiosSecure()
    const [loading, setLoading] = useState(false)
    const [camp, isLoading] = useCampDetails(id)
    const { register, handleSubmit, formState: { errors } } = useForm();
    const { campName, campPhotoURL, campFees, date, time, location, description, professionalName } = camp || {};
    const handleUpdateCamp = async(data) => {
        const {campName, campImage, campFees, date, time, location, description, professionalName} = data;
        let campPhoto = campPhotoURL;
        const existImage = !!data.campImage[0];
        if(existImage){
            const newURL = await imageUpload(campImage[0])
            campPhoto = newURL;
        }
        const updateCampData = { campName, campFees, campImageURL : campPhoto,  date, time, location, description, professionalName}
        try{
            setLoading(true)
            await axiosSecure.patch(`/camp/${id}`, updateCampData)
            toast.success('Camp Updated Successfully')
            setLoading(false)
            navigate('/dashboard/manage-camps')
        }catch(err){
            toast.error("Update Failed")
            setLoading(false)
        }
    }
    return (
        <div>
            <Helmet>
                <title>Update Camp | Dashboard</title>
            </Helmet>
            <h1 className="text-xl font-bold text-green-500 text-center mt-10 mb-5">Update Camp</h1>
            {
                isLoading ? 
                    <div className="flex justify-center items-center mt-10"><ImSpinner9 className="text-3xl animate-spin text-center text-green-500" /></div>
                    :
                    <div className="w-full h-full px-10 flex justify-center items-center">
                        <form onSubmit={handleSubmit(handleUpdateCamp)} className="w-[90%] md:w-[80%] mx-auto">
                            <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
                                {/* Camp Name */}
                                <div>
                                    <label className="block mt-3">Camp Name</label>
                                    <input defaultValue={campName} className="block border w-full px-5 py-2 mt-1" type="text" placeholder="Camp Name" name="campName"{...register("campName", { required: true })} />
                                    {errors.campName && <span className="text-red-500">This field is required</span>}
                                </div>

                                {/* Camp Fees */}
                                <div>
                                    <label className="block mt-3">Camp Fees</label>
                                    <input defaultValue={campFees} className="block border w-full px-5 py-2 mt-1" type="text" placeholder="Camp Fees" name="campFees"{...register("campFees", { required: true })} />
                                    {errors.campFees && <span className="text-red-500">This field is required</span>}
                                </div>

                                {/* Camp Image */}
                                <div className="lg:col-span-2">
                                    <label className="block mt-3">Camp Image</label>
                                    <input className="block border w-full px-5 py-2 mt-1" type="file" placeholder="Camp Image" name="campImage"{...register("campImage")} />
                                    {errors.campImage && <span className="text-red-500">This field is required</span>}
                                </div>

                                {/* Date */}
                                <div>
                                    <label className="block mt-3">Date</label>
                                    <input defaultValue={date} className="block border w-full px-5 py-2 mt-1" type="date" placeholder="Date" name="date"{...register("date", { required: true })} />
                                    {errors.date && <span className="text-red-500">This field is required</span>}
                                </div>

                                {/* Time */}
                                <div>
                                    <label className="block mt-3">Time</label>
                                    <input defaultValue={time} className="block border w-full px-5 py-2 mt-1" type="time" placeholder="Time" name="time"{...register("time", { required: true })} />
                                    {errors.time && <span className="text-red-500">This field is required</span>}
                                </div>

                                {/* Camp Location */}
                                <div>
                                    <label className="block mt-3">Camp Location</label>
                                    <input defaultValue={location} className="block border w-full px-5 py-2 mt-1" type="text" placeholder="Camp Location" name="location"{...register("location", { required: true })} />
                                    {errors.location && <span className="text-red-500">This field is required</span>}
                                </div>

                                {/* Professional Name */}
                                <div>
                                    <label className="block mt-3">Professional Name</label>
                                    <input defaultValue={professionalName} className="block border w-full px-5 py-2 mt-1" type="text" placeholder="Professional Name" name="professionalName"{...register("professionalName", { required: true })} />
                                    {errors.professionalName && <span className="text-red-500">This field is required</span>}
                                </div>

                                {/* Description */}
                                <div className="lg:col-span-2">
                                    <label className="block mt-3">Description</label>
                                    <textarea defaultValue={description} className="block border w-full px-5 py-2 mt-1" type="text" placeholder="Description" name="description"{...register("description", { required: true })} />
                                    {errors.description && <span className="text-red-500">This field is required</span>}
                                </div>
                            </div>

                            <Button type="submit" disabled={loading} className="bg-green-500 normal-case hover:bg-green-700 px-3 py-3 text-[15px] font-semibold mt-7 mx-auto w-[170px] flex justify-center items-center">
                                {
                                    loading ? <ImSpinner9 className="animate-spin" /> : 'Update Camp'
                                }
                            </Button>
                        </form>
                    </div>
            }
        </div>
    );
};

export default UpdateCamp;