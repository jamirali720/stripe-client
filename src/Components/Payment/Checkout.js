import React, { useEffect, useState } from 'react';
import {CardElement, useStripe, useElements  } from '@stripe/react-stripe-js';

const Checkout = ({order, orderId}) => {
    const [success, setSuccess] = useState('');
    const [processing, setProcessing] = useState(false);
    const [transactionId, setTransactionId] = useState('');
    const [cardError, setCardError] = useState(null);
    const [clientSecret, setClientSecret] = useState('');
    const {price, email, quantity} = order;
    const amount = parseFloat(price * quantity);

    const stripe = useStripe();
    const elements = useElements()
  
    useEffect(()=> {
        fetch('http://localhost:4000/create-payment-intent', {
            method:"POST", 
            headers: {"Content-Type" : "application/json"}, 
            body: JSON.stringify({ amount: amount  })
        })
        .then(res => res.json())
        .then(data => {
            if (data?.clientSecret) {
                setClientSecret(data.clientSecret)
            }
          
        })
    } , [amount])

    
    const handleSubmit = async (e) => {
        e.preventDefault();
        
        if (!elements || !stripe) {
            return ;
        }

        const card = elements.getElement(CardElement);

        if (card === null) {
            return;
        }
        const {error, paymentMethod} = await stripe.createPaymentMethod({
            type: 'card', 
            card
        })

        // setCardError(error?.message || null)
        
        if (error) {
            console.log(error);
            setCardError(error.message)
            setSuccess('')
        }else {
            setCardError(null)
            console.log('Success , payment Successful => ', paymentMethod)
            
        }
        setProcessing(true)
        // confirm card payment 
        const {paymentIntent, error:intentError} = await stripe.confirmCardPayment(
            clientSecret,
            {
              payment_method: {
                card: card,
                billing_details: {
                  email:email
                },
              },
            },
          );

          if (intentError) {
            setCardError(intentError?.message)
            setProcessing(false)
          }else{
            setCardError(null);
            
            setTransactionId(paymentIntent.id)
            setSuccess('Congrats !  You have successfully completed payment')

            const payment = {
                paymentId :  orderId, 
                transactionId: paymentIntent.id
            }


            fetch(`http://localhost:4000/order/${orderId}`, {
                method: "PATCH", 
                headers: {"Content-Type": "application/json"}, 
                body: JSON.stringify(payment)

            }).then(res => res.json()).then(data => {
                console.log(data)
                setProcessing(false)
            })
            
          }
    }
    
    return (
        <div>
            <div>
                {cardError &&  <span className='text-danger'> {cardError}</span>}
                {success &&  <div >
                    <p className='text-success'>  {success}</p>    
                    <p> your payment id : <span className='text-info'> {transactionId}</span> </p>    
                </div>}
            </div>
            <form onSubmit={handleSubmit}>
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
            <button className='btn btn-success my-4' type="submit" disabled={!stripe || !elements || !clientSecret || success }>               
                {processing ?  <span> Processing....</span> : 'Pay'}
            </button>
            </form>
        </div>
    );
};

export default Checkout;