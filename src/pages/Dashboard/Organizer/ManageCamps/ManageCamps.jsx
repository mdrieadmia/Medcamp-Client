import { Helmet } from "react-helmet-async";
import useCamps from "../../../../hooks/useCamps";
import ManageCampTable from "../../../../components/Dashboard/ManageCampTable/ManageCampTable";
import { ImSpinner9 } from "react-icons/im";

const ManageCamps = () => {
    const [camps, isCampsLoading] = useCamps()
    return (
        <div>
            <Helmet>
                <title>Manage Camps | Dashboard</title>
            </Helmet>
            <h1 className="text-xl font-bold text-green-500 text-center mt-10 mb-5">Manage Cmaps</h1>
            {
                isCampsLoading && <div className="flex justify-center items-center mt-10"><ImSpinner9 className="text-3xl animate-spin text-center text-green-500" /></div>
            }
            <div className="mx-10 border">
                <ManageCampTable camps={camps} />
            </div>
        </div>
    );
};

export default ManageCamps;