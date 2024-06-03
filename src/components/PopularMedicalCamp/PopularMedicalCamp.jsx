import useCamps from "../../hooks/useCamps";
import { ImSpinner9 } from "react-icons/im";
import CampCard from "../CampCard/CampCard";
import { Button } from "@material-tailwind/react";
import { Link } from "react-router-dom";

const PopularMedicalCamp = () => {

    const [camps, isCampsLoading] = useCamps()

    return (
        <div className="py-16 mx-auto px-5">
            <h1 className="text-xl md:text-2xl font-semibold text-center">Popular Medical Camp</h1>
            <p className="max-w-[600px] text-center mx-auto mt-2 mb-10">Our skilled team offers check-ups, treatments, and health education, ensuring everyone has access to quality care</p>
            {
                isCampsLoading && <div className="flex justify-center items-center"><ImSpinner9 className="text-3xl animate-spin text-center text-green-500" /></div>
            }
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-7">
                {
                    camps.slice(0, 6).map(camp => <CampCard key={camp._id} camp={camp} />)
                }
            </div>
            <div>
                <div className='mt-12 pb-7 flex justify-center px-7'>
                   <Link to={'/avaiable-camps'}>
                   <Button className='bg-green-500 hover:bg-green-700'>See All</Button>
                   </Link>
                </div>
            </div>
        </div>
    );
};

export default PopularMedicalCamp;