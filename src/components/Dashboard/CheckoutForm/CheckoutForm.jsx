import { Button } from '@material-tailwind/react';
import {CardElement, useElements, useStripe} from '@stripe/react-stripe-js';
import { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import useAxiosSecure from './../../../hooks/useAxiosSecure';
import useAuth from '../../../hooks/useAuth';


const CheckoutForm = ({fees}) => {

    const stripe = useStripe()
    const {user} = useAuth()
    const elements = useElements()
    const axiosSecure = useAxiosSecure()
    const [error, setError] = useState('')
    const [clientSecret, setClientSecret] = useState('')
    const [transectionId, setTransectionId] = useState('')


    useEffect(()=>{
        axiosSecure.post('/payment-intent', {fees})
        .then(res => {
            setClientSecret(res.data.clientSecret);
        })
    }, [axiosSecure, fees])

    const handlePaymentSubmit = async (e) => {
        e.preventDefault()

        if(!stripe || !elements){
            return
        }
        
        const card = elements.getElement(CardElement);

        if(card === null){
            return
        }

        const {error, paymentMethod} = await stripe.createPaymentMethod({
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
            <Button className='bg-green-500 px-5 py-2 block mx-auto mt-10' type="submit" disabled={!stripe || !clientSecret}>
                Pay
            </Button>
            <div>
                <p className='text-red-500 font-semibold'> {error}</p>
                {
                    transectionId && <p className='text-green-500 font-semibold'>Transection ID : {transectionId}</p>
                }
            </div>
        </form>
    );
};

CheckoutForm.propTypes = {
    fees: PropTypes.string,
};

export default CheckoutForm;