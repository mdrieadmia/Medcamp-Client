import { FaFacebookF } from "react-icons/fa6";
import { FcGoogle } from "react-icons/fc";
import useAuth from "../../hooks/useAuth";
import  toast  from 'react-hot-toast';


const SocialLogin = () => {

    const {googleSignIn} = useAuth();

    const handleGoogleLogin = async() =>{
        try{
            await googleSignIn()
            toast.success('Logged in successfull')
        }catch(err){
            toast.error('Login Failed')
        }
    }
    return (
        <div className="text-center mt-2">
            <h3 className="font-semibold">OR</h3>
            <h3 className="font-semibold">Continue With</h3>
            <div className="flex justify-center gap-2 mt-2">
                <button onClick={handleGoogleLogin} className=" border-2 p-[5px] rounded-md duration-200 hover:border-gray-900">
                    <FcGoogle className="text-lg"/>
                </button>
                <button className=" border-2 p-[5px] rounded-md duration-200 hover:border-gray-900">
                    <FaFacebookF className="text-lg text-blue-500"/>
                </button>
            </div>
        </div>
    );
};

export default SocialLogin;