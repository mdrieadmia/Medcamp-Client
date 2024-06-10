import { FaGithub } from "react-icons/fa6";
import { FcGoogle } from "react-icons/fc";
import useAuth from "../../hooks/useAuth";
import  toast  from 'react-hot-toast';
import { useLocation, useNavigate } from "react-router-dom";


const SocialLogin = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const from = location.state?.from?.pathname || "/";
    const {googleSignIn, githubSignIn} = useAuth();

    const handleGoogleLogin = async() =>{
        try{
            await googleSignIn()
            toast.success('Logged in successfull')
            navigate(from)
        }catch(err){
            toast.error('Login Failed')
        }
    }
    
    const handleGithubLogin = async() =>{
        try{
            await githubSignIn()
            toast.success('Logged in successfull')
            navigate(from)
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
                <button onClick={handleGithubLogin} className=" border-2 p-[5px] rounded-md duration-200 hover:border-gray-900">
                    <FaGithub className="text-lg"/>
                </button>
            </div>
        </div>
    );
};

export default SocialLogin;