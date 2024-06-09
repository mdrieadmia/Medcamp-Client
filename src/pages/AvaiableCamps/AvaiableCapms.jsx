import { Helmet } from "react-helmet-async";
import useCamps from "../../hooks/useCamps";
import CampCard from "../../components/CampCard/CampCard";
import { ImSpinner9 } from "react-icons/im";
import { useState } from "react";
import { RiLayout4Fill } from "react-icons/ri";
import { RiLayout2Fill } from "react-icons/ri";
import { Option, Select } from "@material-tailwind/react";

const AvaiableCapms = () => {
    const [camps, isCampsLoading] = useCamps()
    const [layout, setLayout] = useState(true)
    const handleToggleLayout = () => {
        setLayout(!layout)
    }
    return (
        <div>
            <Helmet>
                <title>Avaiable Camps | Medcamp</title>
            </Helmet>
            <div className="pb-10 container mx-auto px-5">
                <div className="h-[200px] w-full bg-[url('https://i.postimg.cc/dtg0b5bL/Medical-Services-Banner.jpg')] bg-cover bg-center bg-no-repeat mb-10 rounded-lg">
                    <div className="h-full w-full bg-green-500 rounded-lg opacity-70">
                        <h1 className="text-2xl font-semibold text-center pt-7 text-white">Avaiable Camps</h1>
                        <div className="flex justify-center items-center mt-7">
                            <form className="flex gap-5">
                                <div className="max-w-[400px] flex items-center gap-3">
                                    <label className="text-nowrap">Sort By </label>
                                    <Select className="bg-white opacity-100">
                                        <Option>Most Registered</Option>
                                        <Option>Camp Fees</Option>
                                        <Option>Camp Name</Option>
                                    </Select>
                                </div>
                                <div>
                                    <label> Search </label>
                                    <input type="text" placeholder="Search Here" className="px-5 py-2 rounded-md" />
                                </div>

                            </form>
                        </div>
                    </div>
                </div>
                {
                    isCampsLoading && <div className="flex justify-center items-center"><ImSpinner9 className="text-3xl animate-spin text-center text-green-500" /></div>
                }
                <div className="flex gap-3 justify-end mb-5">
                    <p>View</p>
                    <button onClick={handleToggleLayout}>{layout ? <RiLayout4Fill className="text-2xl" /> : <RiLayout2Fill className="text-2xl" />} </button>
                </div>
                <div className={`grid grid-cols-1 md:grid-cols-2 gap-7 ${layout && 'lg:grid-cols-3'}`}>
                    {
                        camps.map(camp => <CampCard key={camp._id} camp={camp} />)
                    }
                </div>
            </div>
        </div>
    );
};

export default AvaiableCapms;