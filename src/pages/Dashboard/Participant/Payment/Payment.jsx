import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import CheckoutForm from '../../../../components/Dashboard/CheckoutForm/CheckoutForm';
import { useParams } from 'react-router-dom';
import { ImSpinner9 } from 'react-icons/im';
import { useQuery } from '@tanstack/react-query';
import useAxiosSecure from '../../../../hooks/useAxiosSecure';

const stripePromise = loadStripe(import.meta.env.VITE_PAYMENT_GETWAY_PK);
const Payment = () => {
    const {fees}  = useParams();
    const axiosSecure = useAxiosSecure()
    const {data : registeredCamp = {}, isLoading} = useQuery({
        queryKey : ['registeredCamp'],
        queryFn : async()=>{
            const {data} = await axiosSecure(`/registered-camp/${fees}`)
            return data;
        }
    })

    if (isLoading) {
        return <div className="flex justify-center items-center mt-10"><ImSpinner9 className="text-3xl animate-spin text-center text-green-500" /></div>
    }

    return (
        <div>
            <h1 className="text-xl font-bold text-green-500 text-center mt-10 mb-5">Payment</h1>
            <h2 className='font-semibold text-center mt-20'>Please pay your join fees : ${registeredCamp?.campFees}</h2>
            <div className='max-w-[600px] mx-auto px-10 mt-10'>
                <Elements stripe={stripePromise}>
                    <CheckoutForm registeredCamp={registeredCamp} />
                </Elements>
            </div>
        </div>
    );
};

export default Payment;