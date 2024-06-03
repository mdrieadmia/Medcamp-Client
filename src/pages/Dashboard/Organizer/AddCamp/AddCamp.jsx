import { Button } from "@material-tailwind/react";
import { useState } from "react";
import { Helmet } from "react-helmet-async";
import { useForm } from "react-hook-form";
import { ImSpinner9 } from "react-icons/im";
import imageUpload from "../../../../utils/utility";
import toast from "react-hot-toast";
import useAxiosSecure from "../../../../hooks/useAxiosSecure";

const AddCamp = () => {
    const axiosSecure = useAxiosSecure()
    const { register, handleSubmit, formState: { errors } } = useForm();
    const [loading, setLoading] = useState(false)
    const handleAddCamp = async(data) => {
        setLoading(true)
        const {campFees, campImage, campName, date, time, description, location, professionalName} = data || {}
        const participantCount = 0;
        const campImageURL = await imageUpload(campImage[0])
        console.log(campImageURL);
        const campData = {
            campName, campFees, campImageURL, participantCount, date, time, location, description, professionalName
        }
        try{
            await axiosSecure.post('/camps', campData)
            toast.success('Camp added successfully')
            setLoading(false)
        }catch(err){
            toast.error('Camp add failed')
        }
    }
    return (
        <div>
            <Helmet>
                <title>Add Camp | Dashboard</title>
            </Helmet>
            <h1 className="text-xl font-bold text-green-500 text-center mt-10 mb-5">Add a Camp</h1>
            <div className="w-full h-full px-10 flex justify-center items-center">
                <form onSubmit={handleSubmit(handleAddCamp)} className="w-[90%] md:w-[80%] mx-auto">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
                        {/* Camp Name */}
                        <div>
                            <label className="block mt-3">Camp Name</label>
                            <input className="block border w-full px-5 py-2 mt-1" type="text" placeholder="Camp Name" name="campName"{...register("campName", { required: true })} />
                            {errors.campName && <span className="text-red-500">This field is required</span>}
                        </div>

                        {/* Camp Fees */}
                        <div>
                            <label className="block mt-3">Camp Fees</label>
                            <input className="block border w-full px-5 py-2 mt-1" type="text" placeholder="Camp Fees" name="campFees"{...register("campFees", { required: true })} />
                            {errors.campFees && <span className="text-red-500">This field is required</span>}
                        </div>

                        {/* Camp Image */}
                        <div className="lg:col-span-2">
                            <label className="block mt-3">Camp Image</label>
                            <input className="block border w-full px-5 py-2 mt-1" type="file" placeholder="Camp Image" name="campImage"{...register("campImage", { required: true })} />
                            {errors.campImage && <span className="text-red-500">This field is required</span>}
                        </div>

                        {/* Date */}
                        <div>
                            <label className="block mt-3">Date</label>
                            <input className="block border w-full px-5 py-2 mt-1" type="date" placeholder="Date" name="date"{...register("date", { required: true })} />
                            {errors.date && <span className="text-red-500">This field is required</span>}
                        </div>

                        {/* Time */}
                        <div>
                            <label className="block mt-3">Time</label>
                            <input className="block border w-full px-5 py-2 mt-1" type="time" placeholder="Time" name="time"{...register("time", { required: true })} />
                            {errors.time && <span className="text-red-500">This field is required</span>}
                        </div>

                        {/* Camp Location */}
                        <div>
                            <label className="block mt-3">Camp Location</label>
                            <input className="block border w-full px-5 py-2 mt-1" type="text" placeholder="Camp Location" name="location"{...register("location", { required: true })} />
                            {errors.location && <span className="text-red-500">This field is required</span>}
                        </div>

                        {/* Professional Name */}
                        <div>
                            <label className="block mt-3">Professional Name</label>
                            <input className="block border w-full px-5 py-2 mt-1" type="text" placeholder="Professional Name" name="professionalName"{...register("professionalName", { required: true })} />
                            {errors.professionalName && <span className="text-red-500">This field is required</span>}
                        </div>

                        {/* Description */}
                        <div className="lg:col-span-2">
                            <label className="block mt-3">Description</label>
                            <textarea className="block border w-full px-5 py-2 mt-1" type="text" placeholder="Description" name="description"{...register("description", { required: true })} />
                            {errors.description && <span className="text-red-500">This field is required</span>}
                        </div>
                    </div>

                    <Button type="submit" disabled={loading} className="bg-green-500 normal-case px-3 py-3 hover:bg-green-700 text-[15px] font-semibold mt-7 mx-auto w-[170px] flex justify-center items-center">
                        {
                            loading ? <ImSpinner9 className="animate-spin" /> : 'Add Camp'
                        }
                    </Button>
                </form>
            </div>
        </div>
    );
};

export default AddCamp;