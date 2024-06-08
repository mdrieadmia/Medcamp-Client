import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import CheckoutForm from '../../../../components/Dashboard/CheckoutForm/CheckoutForm';
import { useParams } from 'react-router-dom';

const stripePromise = loadStripe(import.meta.env.VITE_PAYMENT_GETWAY_PK);
const Payment = () => {
    const {fees} = useParams();

    return (
        <div>
            <h1 className="text-xl font-bold text-green-500 text-center mt-10 mb-5">Payment</h1>
            <div className='container mx-auto px-10'>
                <Elements stripe={stripePromise}>
                    <CheckoutForm fees= {fees} />
                </Elements>
            </div>
        </div>
    );
};

export default Payment;