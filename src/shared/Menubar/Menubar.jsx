import {
    Navbar,
    Collapse,
    Typography,
    IconButton,
    Button,
    Menu,
    MenuHandler,
    MenuList,
    MenuItem,
    Avatar,
} from "@material-tailwind/react";
import { useEffect, useState } from "react";
import { FaBars, FaUser, FaXmark } from "react-icons/fa6";
import { Link, NavLink } from "react-router-dom";
import { MdSpaceDashboard } from "react-icons/md";
import TopBar from "../../components/TopBar/TopBar";
import useAuth from "../../hooks/useAuth";
import { ImSpinner9 } from "react-icons/im";

const Menubar = () => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [isSecondMenuOpen, setIsSecondMenuOpen] = useState(false);
    const closeMenu = () => setIsMenuOpen(false);
    const closeSecondMenu = () => setIsSecondMenuOpen(false);
    const [openNav, setOpenNav] = useState(false);
    const { user, isUserLoading, signOutUser } = useAuth();

    const handleWindowResize = () =>
        window.innerWidth >= 960 && setOpenNav(false);

    useEffect(() => {
        window.addEventListener("resize", handleWindowResize);

        return () => {
            window.removeEventListener("resize", handleWindowResize);
        };
    }, []);

    const handleSignOutUser = () => {
        signOutUser()
    }

    return (
        <>
            <div>
                <TopBar />
            </div>
            <Navbar className="mx-auto container px-5 py-3 rounded-none shadow-sm border-b border-b-green-50">
                <div className="flex items-center justify-between text-blue-gray-900">
                    <Typography
                        as="a"
                        href="#"
                        variant="h6"
                        className="mr-4 cursor-pointer py-1.5"
                    >
                        <img className="w-32" src="https://i.ibb.co/k0QtjdT/logo.png" alt="Logo" />
                    </Typography>
                    <div className="hidden lg:flex gap-5">
                        <ul className="my-2 flex flex-col gap-2 lg:mb-0 lg:mt-0 lg:flex-row lg:items-center lg:gap-6">
                            <Typography
                                as="li"
                                variant="small"
                                color="blue-gray"
                                className="p-1 font-medium"
                            >
                                <NavLink to={'/'} className="flex items-center hover:text-green-500 border-b-2 border-transparent font-semibold transition-colors">
                                    Home
                                </NavLink>
                            </Typography>
                            <Typography
                                as="li"
                                variant="small"
                                color="blue-gray"
                                className="p-1 font-medium"
                            >
                                <NavLink to={'/avaiable-camps'} className="flex items-center hover:text-green-500 border-b-2 border-transparent font-semibold transition-colors">
                                    Avaiable Camps
                                </NavLink>
                            </Typography>
                            <Typography
                                as="li"
                                variant="small"
                                color="blue-gray"
                                className="p-1 font-medium"
                            >
                                <NavLink to={'/blogs'} className="flex items-center hover:text-green-500 border-b-2 border-transparent font-semibold transition-colors">
                                    Blogs
                                </NavLink>
                            </Typography>

                        </ul>
                        <div>
                            {
                                !isUserLoading && user ?
                                    <div>
                                        <Menu open={isMenuOpen} handler={setIsMenuOpen} placement="bottom-end">
                                            <MenuHandler>
                                                <div
                                                    color="white"
                                                    className="flex items-center rounded-full mx-auto cursor-pointer"
                                                >
                                                    <Button className="p-0 bg-transparent rounded-full">
                                                        <Avatar
                                                            variant="circular"
                                                            size="sm"
                                                            alt="tania andrew"
                                                            className="border border-gray-900 p-0.5"
                                                            src={user?.photoURL}
                                                        />
                                                    </Button>
                                                </div>
                                            </MenuHandler>
                                            <MenuList className="p-1">
                                                return (
                                                <MenuItem
                                                    onClick={closeMenu}
                                                    className={`flex items-start flex-col gap-2 rounded hover:bg-white focus:bg-white`}
                                                >
                                                    <Typography
                                                        as="li"
                                                        variant="small"
                                                        color="blue-gray"
                                                        className="p-1 font-medium"
                                                    >
                                                        <Link to={'/profile'} className="flex gap-2 items-center hover:text-green-500 border-b-2 border-transparent font-semibold transition-colors">
                                                            <FaUser className="mb-1" />
                                                            My Profile
                                                        </Link>
                                                    </Typography>
                                                    <Typography
                                                        as="li"
                                                        variant="small"
                                                        color="blue-gray"
                                                        className="p-1 font-medium"
                                                    >
                                                        <Link to={'/dashboard'} className="flex gap-2 items-center hover:text-green-500 border-b-2 border-transparent font-semibold transition-colors">
                                                            <MdSpaceDashboard className="text-lg -ml-[2px]" />
                                                            Dashboard
                                                        </Link>
                                                    </Typography>
                                                    <Typography
                                                        as="li"
                                                        variant="small"
                                                        color="blue-gray"
                                                        className="p-1 font-medium w-full"
                                                    >
                                                        <Button onClick={handleSignOutUser} className="bg-green-500 w-full px-5 py-2 normal-case tracking-wide">
                                                            Sign Out
                                                        </Button>
                                                    </Typography>
                                                </MenuItem>
                                                );

                                            </MenuList>
                                        </Menu>
                                    </div>
                                    :
                                    isUserLoading && !user ? <div className="h-full flex justify-center items-center text-green-500 pl-[10px] pr-[10px]"><ImSpinner9 className="animate-spin" /></div> :
                                        <Button className="btn bg-green-500 py-2 px-4 rounded-full normal-case"> <Link to={'/signin'} >Join Us</Link> </Button>
                            }
                        </div>
                    </div>
                    <IconButton
                        variant="text"
                        className="ml-auto h-6 w-6 text-inherit hover:bg-transparent focus:bg-transparent active:bg-transparent lg:hidden"
                        ripple={false}
                        onClick={() => setOpenNav(!openNav)}
                    >
                        {openNav ? (
                            <FaXmark className="h-6 w-6" strokeWidth={2} />
                        ) : (
                            <FaBars className="h-6 w-6" strokeWidth={2} />
                        )}
                    </IconButton>
                </div>
                <Collapse open={openNav}>
                    <div className="block lg:hidden">
                        <ul className="my-2 flex flex-col text-center gap-2 lg:mb-0 lg:mt-0 lg:flex-row lg:items-center lg:gap-6">
                            <Typography
                                as="li"
                                variant="small"
                                color="blue-gray"
                                className="p-1 font-medium mx-auto inline-block"
                            >
                                <NavLink to={'/'} className="flex items-center hover:text-green-500 border-b-2 border-transparent font-semibold transition-colors">
                                    Home
                                </NavLink>
                            </Typography>
                            <Typography
                                as="li"
                                variant="small"
                                color="blue-gray"
                                className="p-1 font-medium mx-auto inline-block"
                            >
                                <NavLink to={'/avaiable-camps'} className="flex items-center hover:text-green-500 border-b-2 border-transparent font-semibold transition-colors">
                                    Avaiable Camps
                                </NavLink>
                            </Typography>
                            <Typography
                                as="li"
                                variant="small"
                                color="blue-gray"
                                className="p-1 font-medium mx-auto inline-block"
                            >
                                <NavLink to={'/blogs'} className="flex items-center hover:text-green-500 border-b-2 border-transparent font-semibold transition-colors">
                                    Blogs
                                </NavLink>
                            </Typography>

                        </ul>
                        <div>
                            <Menu open={isSecondMenuOpen} handler={setIsSecondMenuOpen} placement="top-center">
                                <MenuHandler>
                                    <div
                                        color="white"
                                        className="flex items-center rounded-full mx-auto cursor-pointer"
                                    >
                                        <Button className="p-0 bg-transparent rounded-full mx-auto">
                                            <Avatar
                                                variant="circular"
                                                size="sm"
                                                alt="tania andrew"
                                                className="border border-gray-900 p-0.5"
                                                src={user?.photoURL}
                                            />
                                        </Button>
                                    </div>
                                </MenuHandler>
                                <MenuList className="p-1">
                                    return (
                                    <MenuItem
                                        onClick={closeSecondMenu}
                                        className={`flex items-start flex-col gap-2 rounded hover:bg-white focus:bg-white`}
                                    >
                                        <Typography
                                            as="li"
                                            variant="small"
                                            color="blue-gray"
                                            className="p-1 font-medium"
                                        >
                                            <Link to={'/profile'} className="flex gap-2 items-center hover:text-green-500 border-b-2 border-transparent font-semibold transition-colors">
                                                <FaUser className="mb-1" />
                                                My Profile
                                            </Link>
                                        </Typography>
                                        <Typography
                                            as="li"
                                            variant="small"
                                            color="blue-gray"
                                            className="p-1 font-medium"
                                        >
                                            <Link to={'/dashboard'} className="flex gap-2 items-center hover:text-green-500 border-b-2 border-transparent font-semibold transition-colors">
                                                <MdSpaceDashboard className="text-lg -ml-[2px]" />
                                                Dashboard
                                            </Link>
                                        </Typography>
                                        <Typography
                                            as="li"
                                            variant="small"
                                            color="blue-gray"
                                            className="p-1 font-medium w-full"
                                        >
                                            <Button onClick={handleSignOutUser} className="bg-green-500 w-full px-5 py-2 normal-case tracking-wide">
                                                Sign Out
                                            </Button>
                                        </Typography>
                                    </MenuItem>
                                    );

                                </MenuList>
                            </Menu>
                        </div>
                    </div>
                </Collapse>
            </Navbar>
        </>
    );
};

export default Menubar;