import { Helmet } from 'react-helmet-async';
import Slider from '../../components/Slider/Slider';
import PopularMedicalCamp from '../../components/PopularMedicalCamp/PopularMedicalCamp';
import UsersFeedback from '../../components/UsersFeedback/UsersFeedback';
import HappyUsers from '../../components/HappyUsers/HappyUsers';


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
                    <HappyUsers/>
                    <UsersFeedback/>
                </div>
            </div>
        </div>
    );
};

export default Home;