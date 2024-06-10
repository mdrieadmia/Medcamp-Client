import { Button, Rating } from "@material-tailwind/react";
import { useState } from "react";
import { Helmet } from "react-helmet-async";
import { useForm } from "react-hook-form";
import { ImSpinner9 } from "react-icons/im";
import useAxiosSecure from "../../../../hooks/useAxiosSecure";
import { toast } from 'react-hot-toast';
import useAuth from "../../../../hooks/useAuth";
import { useNavigate } from "react-router-dom";

const Feedback = () => {
    const { register, handleSubmit, formState: { errors } } = useForm();
    const [ratingValue, setRatingValue] = useState(null)
    const [loading, setLoading] = useState(false)
    const { userData } = useAuth();
    const axiosSecure = useAxiosSecure()
    const navigate = useNavigate()

    const handleAddFeedback = async (data) => {
        setLoading(true)
        const { feedback } = data || {};

        const feedbackData = {
            name: userData?.displayName || "Annyonimous",
            photo: userData?.photoURL || "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTtuphMb4mq-EcVWhMVT8FCkv5dqZGgvn_QiA&s",
            rating : ratingValue,
            feedback : feedback
        }

        try {
            const { data } = await axiosSecure.post('/feedback', feedbackData)
            if (data.insertedId) {
                toast.success('Feedback submited successfully')
                setLoading(false)
                navigate('/dashboard/registered-camps')
            }
        } catch (err) {
            toast.error('Feedback submit failed')
        }
    }

    return (
        <div>
            <Helmet>
                <title>Add Camp | Dashboard</title>
            </Helmet>
            <h1 className="text-xl font-bold text-green-500 text-center mt-10 mb-5">Submit your feedback</h1>
            <div>
                <form onSubmit={handleSubmit(handleAddFeedback)} className="w-[90%] md:w-[80%] mx-auto">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
                        {/* Camp Name */}
                        <div className="flex items-center gap-5">
                            <label className=" mt-3 mb-[10px]">Rating : </label>
                            <Rating unratedColor="amber" ratedColor="amber" onChange={(value) => setRatingValue(value)} />
                        </div>

                        {/* Feedback */}
                        <div className="lg:col-span-2">
                            <label className="block mt-3">Feedback</label>
                            <textarea rows={5} className="block border w-full px-5 py-2 mt-1" type="text" placeholder="Feedback" name="feedback"{...register("feedback", { required: true })} />
                            {errors.feedback && <span className="text-red-500">This field is required</span>}
                        </div>
                    </div>

                    <Button type="submit" disabled={loading} className="bg-green-500 normal-case px-3 py-3 hover:bg-green-700 text-[15px] font-semibold mt-7 mx-auto w-[170px] flex justify-center items-center">
                        {
                            loading ? <ImSpinner9 className="animate-spin" /> : 'Submit'
                        }
                    </Button>
                </form>
            </div>
        </div>
    );
};

export default Feedback;