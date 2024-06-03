import { Helmet } from "react-helmet-async";

const Blogs = () => {
    return (
        <div>
            <Helmet>
                <title>Blogs | Medcamp</title>
            </Helmet>
            <div>
                <h1 className="text-lg text-center pt-20 font-semibold">No Blog Posted Yet</h1>
            </div>
        </div>
    );
};

export default Blogs;