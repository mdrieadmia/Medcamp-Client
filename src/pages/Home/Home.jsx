import { Helmet } from 'react-helmet-async';


const Home = () => {
    return (
        <div>
        <Helmet>
            <title>Home | Medcamp</title>
        </Helmet>
            <h1 className="text-2xl font-bold text-center mt-5 text-green-800"> Home </h1>
            
        </div>
    );
};

export default Home;