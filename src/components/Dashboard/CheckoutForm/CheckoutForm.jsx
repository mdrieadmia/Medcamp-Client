import { Button } from '@material-tailwind/react';
import {CardElement, useElements, useStripe} from '@stripe/react-stripe-js';
import { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import useAxiosSecure from './../../../hooks/useAxiosSecure';
import useAuth from '../../../hooks/useAuth';


const CheckoutForm = ({registeredCamp}) => {

    const stripe = useStripe()
    const {user} = useAuth()
    const elements = useElements()
    const axiosSecure = useAxiosSecure()
    const [error, setError] = useState('')
    const [clientSecret, setClientSecret] = useState('')
    const [transectionId, setTransectionId] = useState('')

    useEffect(()=>{
        axiosSecure.post('/payment-intent', {fees : registeredCamp.campFees})
        .then(res => {
            setClientSecret(res.data.clientSecret);
        })
    }, [axiosSecure, registeredCamp])

    const handlePaymentSubmit = async (e) => {
        e.preventDefault()

        if(!stripe || !elements){
            return
        }
        
        const card = elements.getElement(CardElement);

        if(card === null){
            return
        }

        const {error} = await stripe.createPaymentMethod({
            type : 'card',
            card
        })

        if(error){
            setError(error?.message)
        }else{
            setError('')
        }

        const {paymentIntent, error : confimationError} = await stripe.confirmCardPayment(clientSecret, {
            payment_method : {
                card : card,
                billing_details : {
                    email : user?.email || "Unknown",
                    name : user?.displayName || "Unknown"
                }
            }
        })

        if(confimationError){
            console.log(confimationError);
        }else{
            console.log(paymentIntent);
            if(paymentIntent?.status === 'succeeded'){
                console.log("Transection ID : ", paymentIntent.id);
                setTransectionId(paymentIntent.id)
                const updateCamp = {paymentStatus : 'Paid', participantCount : registeredCamp.participantCount+1}
                const paymentCamp = {...registeredCamp, transectionId : transectionId}
                try{
                    axiosSecure.patch(`/registered-camp/${registeredCamp._id}`, updateCamp)
                    axiosSecure.post('/payment/camp', paymentCamp)
                }catch(err){
                    console.log(err);
                }
            }
        }

    }
    return (
        <form onSubmit={handlePaymentSubmit}>
            <CardElement
                options={{
                    style: {
                        base: {
                            fontSize: '16px',
                            color: '#424770',
                            '::placeholder': {
                                color: '#aab7c4',
                            },
                        },
                        invalid: {
                            color: '#9e2146',
                        },
                    },
                }}
            />
            <div className='mt-10'>
                <p className='text-red-500 font-semibold text-center'> {error}</p>
                {
                    transectionId && 
                    <div>
                        <h1 className='text-2xl font-semibold text-center text-green-500'> Payment Success </h1>
                        <p className='text-green-500 font-semibold text-center mt-2 uppercase'>Transection ID : {transectionId}</p>
                    </div>
                }
            </div>
            <Button className='bg-green-500 px-10 py-3 block mx-auto mt-5' type="submit" disabled={!stripe || !clientSecret || transectionId}>
                Pay
            </Button>
        </form>
    );
};

CheckoutForm.propTypes = {
    registeredCamp: PropTypes.object,
};

export default CheckoutForm;