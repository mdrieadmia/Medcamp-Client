import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css/pagination';
import 'swiper/css';
import { Autoplay, Pagination } from 'swiper/modules';
import { MdFormatQuote } from 'react-icons/md';
import { useQuery } from '@tanstack/react-query';
import useAxiosSecure from '../../hooks/useAxiosSecure';
import { ImSpinner9 } from 'react-icons/im';
import { Rating } from '@material-tailwind/react';


const UsersFeedback = () => {
    const axiosSecure = useAxiosSecure()
    const { data: feedbackData = [], isLoading } = useQuery({
        queryKey: ['feedbackData'],
        queryFn: async () => {
            const { data } = await axiosSecure.get(`/feedback`)
            return data;
        }
    })

    if (isLoading) return <div className="flex justify-center items-center mt-16"><ImSpinner9 className="text-3xl animate-spin text-center text-green-500" /></div>

    return (
        <div className="container mx-auto px-5">
            <div >
                <h1 className="text-2xl font-semibold text-center mb-2">User Reviews</h1>
                <p className="text-center text-sm max-w-[560px] mx-auto text-[#474747]">This could feature quick and actionable tips related to your blog&apos;s niche or topics. Whether it&apos;s productivity hacks or DIY tutorials</p>
            </div>
            <div className="flex flex-col md:flex-row gap-10 items-center justify-center">
                <div>
                    <img className='w-[90%] mx-auto' src="https://i.postimg.cc/MHFZLTK7/Frame-1014.png" alt="Spot Light Image" />
                </div>
                <div className='max-w-[500px] px-5'>
                    <div>
                        <h1 className='ml-2 text-2xl font-bold text-[#474747]'>Showcase Reviews</h1>
                        <h1><MdFormatQuote className='text-5xl text-green-500' /></h1>
                    </div>
                    <div className='ml-2 max-w-[350px]'>
                        <Swiper
                            spaceBetween={30}
                            slidesPerView={1}
                            centeredSlides={true}
                            loop={true}
                            autoplay={{
                                delay: 1000,
                                disableOnInteraction: false,
                            }}
                            pagination={{
                                clickable: true,
                            }}
                            modules={[Autoplay, Pagination]}
                            className="mySwiper"
                        >
                            {
                                feedbackData.map(item => {
                                    return <SwiperSlide key={item._id} className=''>
                                        <div className='mb-7'>
                                            <p className='text-sm mt-3'>{item.feedback}</p>
                                            <h1 className='mt-2 flex items-center'>  </h1>
                                            <Rating value={item.rating} />
                                            <p className='text-lg font-semibold flex items-center gap-2 mt-3'> <img src={item.photo} className='h-7 w-7 rounded-full' /> {item.name}</p>
                                        </div>
                                    </SwiperSlide>
                                })
                            }

                        </Swiper>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default UsersFeedback;