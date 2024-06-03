import { Button } from '@material-tailwind/react';
import PropTypes from 'prop-types';
import { FaCalendar, FaClock, FaDollarSign, FaLocationArrow, FaUserDoctor } from 'react-icons/fa6';
import { Link } from 'react-router-dom';

const CampCard = ({ camp }) => {
    return (
        <div className='rounded-[9px] shadow-xl flex flex-col border-2 border-transparent hover:border-green-500 duration-200'>
            <div>
                <img className='h-52 w-full object-cover rounded-lg' src={camp.campImageURL} alt="Camp Image" />
            </div>
            <div className='px-7 flex-grow'>
                <h1 className='text-xl font-semibold mt-3'>{camp.campName}</h1>
                <div className='flex gap-5 mt-2'>
                    <div className='flex items-center gap-1 font-semibold'>
                        <FaDollarSign/>
                        <p>{camp.campFees}</p>
                    </div>
                    <div className='flex items-center gap-2 font-semibold'>
                        <FaCalendar/>
                        <p>{camp.date}</p>
                    </div>
                    <div className='flex items-center gap-2 font-semibold'>
                        <FaClock/>
                        <p>{camp.time} AM</p>
                    </div>
                </div>
                <div className='flex items-center gap-2 font-medium my-3'>
                    <FaLocationArrow/>
                    <p>{camp.location}</p>
                </div>
                <div className='flex items-center gap-2 font-medium'>
                    <FaUserDoctor/>
                    <p>{camp.professionalName}</p>
                </div>
                <div>
                    <p className='mt-2 font-medium'>Total Participant - {camp.participantCount}</p>
                </div>
            </div>
            <div className='mt-5 pb-7 px-7'>
                <Link to={`/camp/details/${camp._id}`}><Button className='w-full bg-green-500'>See Details</Button></Link>
            </div>
        </div>
    );
};

CampCard.propTypes = {
    camp: PropTypes.object
};

export default CampCard;