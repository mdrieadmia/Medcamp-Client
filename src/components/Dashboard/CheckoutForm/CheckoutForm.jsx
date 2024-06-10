import { Button } from '@material-tailwind/react';
import {CardElement, useElements, useStripe} from '@stripe/react-stripe-js';
import { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import useAxiosSecure from './../../../hooks/useAxiosSecure';
import useAuth from '../../../hooks/useAuth';
import { ImSpinner9 } from 'react-icons/im';
import toast from 'react-hot-toast';


const CheckoutForm = ({registeredCamp, refetch}) => {

    const stripe = useStripe()
    const {user} = useAuth()
    const elements = useElements()
    const axiosSecure = useAxiosSecure()
    const [error, setError] = useState('')
    const [loading, setLoading] = useState(false)
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
        setLoading(true)

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
            setLoading(false)
        }else{
            setError('')
            setLoading(false)
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
            toast.error(confimationError)
        }else{
            if(paymentIntent?.status === 'succeeded'){
                setTransectionId(paymentIntent.id)
                const updateCamp = {paymentStatus : 'Paid', confirmationStatus: 'Confirmed'}
                try{
                    const {data} =  await axiosSecure.patch(`/registered-camp/payment/${registeredCamp._id}`, updateCamp)
                    console.log(data);
                    refetch()
                    const paymentCamp = {
                        campId : registeredCamp.campId,
                        campName : registeredCamp.campName,
                        campFees : registeredCamp.campFees,
                        participantEmail : registeredCamp.participantEmail,
                        paymentStatus : "Paid",
                        confirmationStatus : "Confirmed",
                        transectionId : paymentIntent.id
                    }
                    axiosSecure.post('/payment/camp', paymentCamp)
                    setLoading(false)
                }catch(err){
                    setLoading(false)
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
                {
                    loading ? <span> <ImSpinner9 className='animate-spin'/> </span>
                    : 
                    <span>Pay</span>
                }
            </Button>
        </form>
    );
};

CheckoutForm.propTypes = {
    registeredCamp: PropTypes.object,
    refetch: PropTypes.func,
};

export default CheckoutForm;