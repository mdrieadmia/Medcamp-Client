import { useForm } from "react-hook-form"
import { Button } from "@material-tailwind/react";
import { ImSpinner9 } from "react-icons/im";
import SocialLogin from "../../components/SocialLogin/SocialLogin";
import { Link } from "react-router-dom";
import { Helmet } from "react-helmet-async";

const Signin = () => {
    const { register, handleSubmit, formState: { errors } } = useForm();

    const handleEmailSignIn = ({ data }) => {
        console.log(data);
    }

    const loading = false
    return (
        <div>
            <Helmet>
                <title>Signin | Medcamp</title>
            </Helmet>
            <div className="container mx-auto px-5 flex justify-center items-center flex-col md:flex-row">
                <div className="w-full">
                    <img className="w-[70%] mx-auto pt-5" src="https://i.ibb.co/2h9zJvd/Corporate.png" alt="Login Image" />
                </div>
                <div className="w-full">
                    <div className="h-full flex flex-col justify-center items-center py-10">
                        <div className="flex justify-center items-center flex-col">
                            <div>
                                <h3 className="text-lg font-semibold ml-5 mb-5">Signin</h3>
                            </div>
                        </div>
                        <form onSubmit={handleSubmit(handleEmailSignIn)} className="block w-[90%] md:w-[80%] lg:w-[70%] mx-auto">
                            {/* Email */}
                            <label className="block mt-5">Email</label>
                            <input className="block border w-full px-5 py-2 mt-1" type="email" placeholder="Email" name="email"{...register("email", { required: true })} />
                            {errors.email && <span className="text-red-500">This field is required</span>}
                            {/* Password */}
                            <label className="mt-3 block">Password</label>
                            <input className="block border w-full px-5 py-2 mt-1" type="password" placeholder="********" name="password"{...register("password", { required: true })} />
                            {errors.password && <span className="text-red-500">This field is required</span>}

                            <Button type="submit" disabled={loading} className="bg-green-500 normal-case px-3 py-3 text-[15px] font-semibold mt-7 mx-auto w-full flex justify-center items-center">
                                {
                                    loading ? <ImSpinner9 className="animate-spin" /> : 'Sign in'
                                }
                            </Button>
                        </form>
                        <div>
                            <h1 className="mt-5 font-medium">Don&apos;t have any account? <Link to={'/signup'} className="font-bold hover:text-green-500 duration-200">Signup</Link> </h1>
                            <SocialLogin />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Signin;