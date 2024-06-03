import { Helmet } from "react-helmet-async";
import useCamps from "../../hooks/useCamps";
import CampCard from "../../components/CampCard/CampCard";
import { ImSpinner9 } from "react-icons/im";

const AvaiableCapms = () => {
    const [camps, isCampsLoading] = useCamps()

    return (
        <div>
            <Helmet>
                <title>Avaiable Camps | Medcamp</title>
            </Helmet>
            <div className="pb-16 container mx-auto px-5">
                <div className="h-[200px] w-full bg-[url('https://i.postimg.cc/dtg0b5bL/Medical-Services-Banner.jpg')] bg-cover bg-center bg-no-repeat mb-10 rounded-lg">
                    <div className="h-full w-full bg-green-500 rounded-lg opacity-70">
                        <h1 className="text-2xl font-semibold text-center pt-7 text-white">Avaiable Camps</h1>
                    </div>
                </div>
                {
                    isCampsLoading && <div className="flex justify-center items-center"><ImSpinner9 className="text-3xl animate-spin text-center text-green-500" /></div>
                }
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-7">
                    {
                        camps.map(camp => <CampCard key={camp._id} camp={camp} />)
                    }
                </div>
            </div>
        </div>
    );
};

export default AvaiableCapms;