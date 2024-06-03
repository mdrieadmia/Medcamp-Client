import { Helmet } from 'react-helmet-async';
import Slider from '../../components/Slider/Slider';
import PopularMedicalCamp from '../../components/PopularMedicalCamp/PopularMedicalCamp';


const Home = () => {
    return (
        <div>
        <Helmet>
            <title>Home | Medcamp</title>
        </Helmet>
            <div>
                <div className='container px-5 mx-auto'>
                    <Slider/>
                    <PopularMedicalCamp/>
                </div>
            </div>
        </div>
    );
};

export default Home;