import { useForm } from "react-hook-form"
import { Button } from "@material-tailwind/react";
import { ImSpinner9 } from "react-icons/im";
import SocialLogin from "../../components/SocialLogin/SocialLogin";
import { Link } from "react-router-dom";
import useAuth from "../../hooks/useAuth";
import imageUpload from "../../utils/utility";
import toast from "react-hot-toast";

const SignUp = () => {
    const {createUser, updateUserProfile, isUserLoading, setIsUserLoading} = useAuth()
    const { register, handleSubmit, formState: { errors } } = useForm();

    const handleEmailSignIn = async(data) => {
        setIsUserLoading(true)
        const {email, name, password, photo} = data || {}
        try{
            const photo_url = await imageUpload(photo[0])
            await createUser(email, password)
            await updateUserProfile(name, photo_url)
            toast.success("Signup Successfull")
            setIsUserLoading(false)
        }catch(err){
            toast.error("Signup Failed")
            setIsUserLoading(false)
        }
    }


    return (
        <div>
            <div>
            <div className="container mx-auto px-5 flex justify-center items-center flex-col md:flex-row">     
                <div className="w-full">
                    <div className="h-full flex flex-col justify-center items-center py-10">
                        <div className="flex justify-center items-center flex-col">
                            <div>
                                <h3 className="text-lg font-semibold ml-5 mb-5">Signup</h3>
                            </div>
                        </div>
                        <form onSubmit={handleSubmit(handleEmailSignIn)} className="block w-[90%] md:w-[80%] lg:w-[70%] mx-auto">
                            {/* Full Name */}
                            <label className="block mt-3">Name</label>
                            <input className="block border w-full px-5 py-2 mt-1" type="text" placeholder="Full Name" name="name"{...register("name", { required: true })} />
                            {errors.name && <span className="text-red-500">This field is required</span>}

                            {/* Photo */}
                            <label className="block mt-3">Photo</label>
                            <input className="block border w-full px-5 py-2 mt-1" type="file" placeholder="Photo" name="photo"{...register("photo", { required: true })} />
                            {errors.photo && <span className="text-red-500">This field is required</span>}

                            {/* Email */}
                            <label className="block mt-3">Email</label>
                            <input className="block border w-full px-5 py-2 mt-1" type="email" placeholder="Email" name="email"{...register("email", { required: true })} />
                            {errors.email && <span className="text-red-500">This field is required</span>}
                            
                            {/* Password */}
                            <label className="mt-3 block">Password</label>
                            <input className="block border w-full px-5 py-2 mt-1" type="password" placeholder="********" name="password"{...register("password", { required: true })} />
                            {errors.password && <span className="text-red-500">This field is required</span>}

                            <Button type="submit" disabled={isUserLoading} className="bg-green-500 normal-case px-3 py-3 text-[15px] font-semibold mt-7 mx-auto w-full flex justify-center items-center">
                            {
                               isUserLoading  ? <ImSpinner9 className="animate-spin"/> : 'Signup'
                            }    
                            </Button>
                        </form>
                        <div>
                            <h1 className="mt-5 font-medium">Already have an account? <Link to={'/signin'} className="font-bold hover:text-green-500 duration-200">Signin</Link> </h1>
                            <SocialLogin/>
                        </div>
                    </div>
                </div>

                <div className="w-full">
                    <img className="w-[70%] mx-auto pt-5" src="https://i.ibb.co/2h9zJvd/Corporate.png" alt="Login Image" />
                </div>
            </div>
        </div>
        </div>
    );
};

export default SignUp;