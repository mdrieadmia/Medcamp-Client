import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';

import { Autoplay, Pagination, Navigation } from 'swiper/modules';
import { Button } from '@material-tailwind/react';

const Slider = () => {
    return (
        <div>
            <Swiper
                slidesPerView={1}
                spaceBetween={30}
                loop={true}
                autoplay={{
                    delay: 2500,
                    disableOnInteraction: false,
                }}
                pagination={{
                    clickable: true,
                }}
                navigation={true}
                modules={[Autoplay, Pagination, Navigation]}
                className="mySwiper"
            >
                <SwiperSlide>
                    <div className='flex gap-10 flex-col md:flex-row justify-center items-center'>
                        <div className='w-[90%] md:w-1/2 flex flex-col justify-center'>
                            <h1 className=' text-2xl md:text-3xl lg:text-5xl font-bold text-center md:text-start leading-[60px]'>Bringing <span className='font-extrabofont-extrabold text-green-500'>Healthcare</span> to Your Doorstep</h1>
                            <p className='mt-5 mb-10 font-medium text-center md:text-start'>Join our medical camp to receive free, comprehensive healthcare services. Our dedicated team is here to provide check-ups, treatments, and wellness education, ensuring a healthier community for all.</p>
                            <div className="flex justify-center md:justify-start">
                                <Button className='bg-green-500 hover:bg-green-700 normal-case text-base px-10 py-3 ml-1 rounded-full'>See All</Button>
                            </div>
                        </div>
                        <div className='w-[90%] md:w-1/2'>
                            <img className='w-full' src="https://i.postimg.cc/D0PqsC3y/1.png" alt="" />
                        </div>
                    </div>
                </SwiperSlide>
                <SwiperSlide>
                    <div className='flex gap-10 flex-col md:flex-row justify-center items-center'>
                        <div className='w-[90%] md:w-1/2'>
                            <img className='w-[90%]' src="https://i.postimg.cc/ZRfMdkXj/2.png" alt="" />
                        </div>
                        <div className='w-[90%] md:w-1/2 flex flex-col justify-center'>
                            <h1 className='text-2xl md:text-3xl lg:text-5xl text-center md:text-start font-bold leading-[60px]'>Ensuring <span className='font-extrabofont-extrabold text-green-500'>Clear Vision</span> Eye Care Camp </h1>
                            <p className='mt-5 mb-10 font-medium text-center md:text-start'>Join our eye care camp for free eye exams, treatments, and glasses. Our expert team is dedicated to preserving and improving your vision, ensuring everyone sees a brighter future.</p>
                            <div className="flex justify-center md:justify-start">
                                <Button className='bg-green-500 hover:bg-green-700 normal-case text-base px-10 py-3 ml-1 rounded-full'>See All</Button>
                            </div>
                        </div>
                    </div>
                </SwiperSlide>
                <SwiperSlide>
                    <div className='flex gap-10 flex-col md:flex-row justify-center items-center'>
                        <div className='w-[90%] md:w-1/2 flex flex-col justify-center'>
                            <h1 className='text-2xl md:text-3xl lg:text-5xl font-bold text-center md:text-start leading-[60px]'>Nurturing <span className='font-extrabold text-green-500'>Child Health</span> To Child Care Camp</h1>
                            <p className='mt-5 mb-10 font-medium text-center md:text-start'>Join our child care camp for free health check-ups, treatments, and wellness education. Our dedicated team ensures your childs well-being, fostering a healthier and happier future.</p>
                            <div className="flex justify-center md:justify-start">
                                <Button className='bg-green-500 hover:bg-green-700 normal-case text-base px-10 py-3 ml-1 rounded-full'>See All</Button>
                            </div>
                        </div>
                        <div className='w-[90%] md:w-1/2'>
                            <img className='w-full' src="https://i.postimg.cc/g2k43tqT/3.png" alt="" />
                        </div>
                    </div>
                </SwiperSlide>
            </Swiper>
        </div>
    );
};

export default Slider;