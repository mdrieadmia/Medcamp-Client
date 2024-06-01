import { FaFacebookF, FaInstagram, FaLinkedinIn, FaTwitter, FaWhatsapp } from "react-icons/fa6";
import { Link } from "react-router-dom";

const Footer = () => {
    return (
        <div className="w-full bg-green-500 py-12">
            <div className="container mx-auto px-5">
                <div className="grid grid-cols-5">
                    <div className="col-span-2">
                        <div>
                            <img className="w-40" src="https://i.ibb.co/k0QtjdT/logo.png" alt="logo"/>
                        </div>
                        <div>
                            <p className="text-sm max-w-[450px] text-white mt-4"> MEDCAMP is a temporary setup offering free health services, including treatments, and education communities.</p>
                        </div>
                        <div className="flex gap-5 mt-10 text-white">
                            <div>
                                <FaFacebookF/>
                            </div>
                            <div>
                                <FaInstagram/>
                            </div>
                            <div>
                                <FaTwitter/>
                            </div>
                            <div>
                                <FaLinkedinIn/>
                            </div>
                            <div>
                                <FaWhatsapp/>
                            </div>
                        </div>
                    </div>
                    <div>
                        <h3 className="text-xl font-semibold text-white inline-block">Services</h3>
                        <ul className="mt-5">
                            <li className="text-sm font-medium mt-2 text-white hover:text-green-900 duration-200 cursor-pointer">
                                <Link to={'/'}>Medical Camp</Link>
                            </li>
                            <li className="text-sm font-medium mt-2 text-white hover:text-green-900 duration-200 cursor-pointer">
                                <Link to={'/'}>Helth Care</Link>
                            </li>
                            <li className="text-sm font-medium mt-2 text-white hover:text-green-900 duration-200 cursor-pointer">
                                <Link to={'/'}>Hospitals</Link>
                            </li>
                            <li className="text-sm font-medium mt-2 text-white hover:text-green-900 duration-200 cursor-pointer">
                                <Link to={'/'}>Ambulance</Link>
                            </li>
                        </ul>
                    </div>
                    <div>
                        <h3 className="text-xl font-semibold text-white inline-block">Services</h3>
                        <ul className="mt-5">
                            <li className="text-sm font-medium mt-2 text-white hover:text-green-900 duration-200 cursor-pointer">
                                <Link to={'/'}>Medical Camp</Link>
                            </li>
                            <li className="text-sm font-medium mt-2 text-white hover:text-green-900 duration-200 cursor-pointer">
                                <Link to={'/'}>Helth Care</Link>
                            </li>
                            <li className="text-sm font-medium mt-2 text-white hover:text-green-900 duration-200 cursor-pointer">
                                <Link to={'/'}>Hospitals</Link>
                            </li>
                            <li className="text-sm font-medium mt-2 text-white hover:text-green-900 duration-200 cursor-pointer">
                                <Link to={'/'}>Ambulance</Link>
                            </li>
                        </ul>
                    </div>
                    <div>
                        <h3 className="text-xl font-semibold text-white inline-block">Services</h3>
                        <ul className="mt-5">
                            <li className="text-sm font-medium mt-2 text-white hover:text-green-900 duration-200 cursor-pointer">
                                <Link to={'/'}>Medical Camp</Link>
                            </li>
                            <li className="text-sm font-medium mt-2 text-white hover:text-green-900 duration-200 cursor-pointer">
                                <Link to={'/'}>Helth Care</Link>
                            </li>
                            <li className="text-sm font-medium mt-2 text-white hover:text-green-900 duration-200 cursor-pointer">
                                <Link to={'/'}>Hospitals</Link>
                            </li>
                            <li className="text-sm font-medium mt-2 text-white hover:text-green-900 duration-200 cursor-pointer">
                                <Link to={'/'}>Ambulance</Link>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Footer;