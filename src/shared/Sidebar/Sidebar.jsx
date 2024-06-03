import {
    Card,
    IconButton,
    List,
    ListItem,
    ListItemPrefix,
} from "@material-tailwind/react";
import {
    UserCircleIcon,
    PowerIcon,
} from "@heroicons/react/24/solid";
import { FaBars, FaPlus, FaXmark } from "react-icons/fa6";
import { RiListSettingsLine } from "react-icons/ri";
import { MdOutlineAppRegistration } from "react-icons/md";
import { IoMdHome } from "react-icons/io";
import { MdOutlineFactCheck } from "react-icons/md";
import { Link, NavLink } from "react-router-dom";
import { useState } from "react";
import { TbDeviceAnalytics } from "react-icons/tb";
import { MdHistory } from "react-icons/md";
import useOrganizer from "../../hooks/useOrganizer";
import { ImSpinner9 } from "react-icons/im";
import useAuth from "../../hooks/useAuth";




const Sidebar = () => {
    const [isOrganizer, isOrganizerLoading] = useOrganizer()
    const { signOutUser } = useAuth()
    const [isActive, setActive] = useState(false)
    const [openNav, setOpenNav] = useState(false);

    const handleToggle = () => {
        setActive(!isActive)
    }

    return (
        <div>
            {/* Small Screen Navbar */}
            <div className=' text-gray-800 flex justify-between md:hidden'>
                <div>
                    <div className='block cursor-pointer p-4 font-bold'>
                        <Link to='/'>
                            <img
                                // className='hidden md:block'
                                src='https://i.ibb.co/k0QtjdT/logo.png'
                                alt='logo'
                                width='100'
                                height='100'
                            />
                        </Link>
                    </div>
                </div>
                <div>
                    {
                        isOrganizerLoading && <div className="flex"><ImSpinner9 className="text-3xl animate-spin text-center text-green-500" /></div>
                    }
                </div>
                <button
                    onClick={handleToggle}
                    className='mobile-menu-button p-4'
                >
                    <IconButton
                        variant="text"
                        className="ml-auto h-6 w-6 text-inherit hover:bg-transparent focus:bg-transparent active:bg-transparent lg:hidden"
                        ripple={false}
                        onClick={() => setOpenNav(!openNav)}
                    >
                        {openNav ? (
                            <FaBars className="h-6 w-6" strokeWidth={2} />
                        ) : (
                            <FaXmark className="h-6 w-6" strokeWidth={2} />
                        )}
                    </IconButton>
                </button>
            </div>
            <div
                className={`z-10 md:fixed flex flex-col border-r-2 bg-white justify-between overflow-x-hidden w-64 space-y-6 px-2 absolute inset-y-0 left-0 transform ${isActive && '-translate-x-full'
                    }  md:translate-x-0  transition duration-200 ease-in-out`}
            >

                <Card className="h-full w-[90%] p-4 shadow-none rounded-none">
                    <div className="mb-2 flex items-center gap-4 p-4">
                        <NavLink to={'/'}><img src="https://i.ibb.co/k0QtjdT/logo.png" alt="brand" className="w-32" /></NavLink>
                    </div>
                    <List>
                        {
                            !isOrganizerLoading && isOrganizer && <>
                                <NavLink to={'/dashboard/organizer-profile'}>
                                    <ListItem className="hover:text-green-700 focus:text-green-700 active:text-green-700 hover:bg-green-100 active:bg-green-100 focus:bg-green-100 focus-visible:bg-green-100 font-semibold  ">
                                        <ListItemPrefix>
                                            <UserCircleIcon className="h-5 w-5 border-none activeIcon" />
                                        </ListItemPrefix>
                                        Profile
                                    </ListItem>
                                </NavLink>
                                <NavLink to={'/dashboard/add-camp'}>
                                    <ListItem className="hover:text-green-700 focus:text-green-700 active:text-green-700 hover:bg-green-100 active:bg-green-100 focus:bg-green-100 focus-visible:bg-green-100 font-semibold  ">
                                        <ListItemPrefix>
                                            <FaPlus className="h-5 w-5" />
                                        </ListItemPrefix>
                                        Add A Camp
                                    </ListItem>
                                </NavLink>
                                <NavLink to={'/dashboard/manage-camps'}>
                                    <ListItem className="hover:text-green-700 focus:text-green-700 active:text-green-700 hover:bg-green-100 active:bg-green-100 focus:bg-green-100 focus-visible:bg-green-100 font-semibold  ">
                                        <ListItemPrefix>
                                            <RiListSettingsLine className="h-5 w-5" />
                                        </ListItemPrefix>
                                        Manage Camps
                                    </ListItem>
                                </NavLink>
                                <NavLink to={'/dashboard/manage-registered-camps'}>
                                    <ListItem className="hover:text-green-700 focus:text-green-700 active:text-green-700 hover:bg-green-100 active:bg-green-100 focus:bg-green-100 focus-visible:bg-green-100 font-semibold  ">
                                        <ListItemPrefix>
                                            <MdOutlineAppRegistration className="h-5 w-5" />
                                        </ListItemPrefix>
                                        Registered Camps
                                    </ListItem>
                                </NavLink>
                            </>
                        }
                        {
                            !isOrganizerLoading && !isOrganizer &&
                            <>
                                <NavLink to={'/dashboard/analytics'}>
                                    <ListItem className="hover:text-green-700 focus:text-green-700 active:text-green-700 hover:bg-green-100 active:bg-green-100 focus:bg-green-100 focus-visible:bg-green-100 font-semibold  ">
                                        <ListItemPrefix>
                                            <TbDeviceAnalytics className="h-5 w-5 border-none activeIcon" />
                                        </ListItemPrefix>
                                        Analytics
                                    </ListItem>
                                </NavLink>
                                <NavLink to={'/dashboard/participant-profile'}>
                                    <ListItem className="hover:text-green-700 focus:text-green-700 active:text-green-700 hover:bg-green-100 active:bg-green-100 focus:bg-green-100 focus-visible:bg-green-100 font-semibold  ">
                                        <ListItemPrefix>
                                            <UserCircleIcon className="h-5 w-5 border-none activeIcon" />
                                        </ListItemPrefix>
                                        Profile
                                    </ListItem>
                                </NavLink>
                                <NavLink to={'/dashboard/registered-camps'}>
                                    <ListItem className="hover:text-green-700 focus:text-green-700 active:text-green-700 hover:bg-green-100 active:bg-green-100 focus:bg-green-100 focus-visible:bg-green-100 font-semibold  ">
                                        <ListItemPrefix>
                                            <MdOutlineAppRegistration className="h-5 w-5" />
                                        </ListItemPrefix>
                                        Registered Camps
                                    </ListItem>
                                </NavLink>
                                <NavLink to={'/dashboard/payment-history'}>
                                    <ListItem className="hover:text-green-700 focus:text-green-700 active:text-green-700 hover:bg-green-100 active:bg-green-100 focus:bg-green-100 focus-visible:bg-green-100 font-semibold  ">
                                        <ListItemPrefix>
                                            <MdHistory className="h-5 w-5" />
                                        </ListItemPrefix>
                                        Payment History
                                    </ListItem>
                                </NavLink>
                            </>

                        }

                        <hr className="my-2 border-blue-gray-50" />

                        <NavLink to={'/'}>
                            <ListItem className="hover:text-green-700 focus:text-green-700 active:text-green-700 hover:bg-green-100 active:bg-green-100 focus:bg-green-100 focus-visible:bg-green-100 font-semibold  ">
                                <ListItemPrefix>
                                    <IoMdHome className="h-5 w-5" />
                                </ListItemPrefix>
                                Home
                            </ListItem>
                        </NavLink>
                        <NavLink to={'/avaiable-camps'}>
                            <ListItem className="hover:text-green-700 focus:text-green-700 active:text-green-700 hover:bg-green-100 active:bg-green-100 focus:bg-green-100 focus-visible:bg-green-100 font-semibold  ">
                                <ListItemPrefix>
                                    <MdOutlineFactCheck className="h-5 w-5" />
                                </ListItemPrefix>
                                Avaiable Camps
                            </ListItem>
                        </NavLink>
                        <div onClick={signOutUser}>
                            <ListItem className="hover:text-green-700 focus:text-green-700 active:text-green-700 hover:bg-green-100 active:bg-green-100 focus:bg-green-100 focus-visible:bg-green-100 font-semibold  ">
                                <ListItemPrefix>
                                    <PowerIcon className="h-5 w-5" />
                                </ListItemPrefix>
                                Sign Out
                            </ListItem>
                        </div>
                    </List>
                </Card>
            </div>
        </div>
    );
};

export default Sidebar;