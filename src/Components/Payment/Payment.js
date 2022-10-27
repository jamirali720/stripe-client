import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import {Elements} from '@stripe/react-stripe-js';
import {loadStripe} from '@stripe/stripe-js';
import Checkout from './Checkout';
const PUBLISHABLE_KEY = 'pk_test_51IgjDBKERk0OkRSOjX9m2uZxWztyl3LyRoEZKThphzPEVaizUvi2nm5ahJlMCa3npQbY1uyqumiDnb0HncjLI7Lt00wt7gX6Ux'
// const SECRET_KEY ='sk_test_51IgjDBKERk0OkRSO66nDaw6g4g1TqoACilp5dVQqh2zlIUDGnvt9BSfqfxitomxwiB9loW2lQ3Lpnxxpt0Jz0fVc00RJURiRwS'
const stripePromise = loadStripe(PUBLISHABLE_KEY)
const Payment = () => {
    const [loading, setLoading] = useState(false);
    
    const {id} = useParams();
    const [order, setOrder] = useState({});   

    useEffect(() => {

        const url = `http://localhost:4000/order/${id}`
        const fetchOrderById = async() => { 
            setLoading(true)
            const {data } = await axios.get(url);       
            setOrder(data?.document)
            setLoading(false)
        }
        fetchOrderById()
    } , [id])

   
    const {title, price, category, _id, quantity, email} = order
    return (
        <>
           {!loading ? <div className="card w-75 m-auto">
            <div className="row p-1 px-3">
            <div className='col-md-6 col-sm-12 bg-info'>
            <div className="card-body">
                <h5 className="card-title"> Title: {title}</h5>
                <p className="card-text"> Category:  {category}</p>
                <p className="card-text">Price:  {price}</p>
                <p className="card-text">Total Price :  {price * quantity}</p>
                <p className="card-text"> Email:  {email}</p>
                <p className="card-text"> Quantity :{ quantity}</p>
                <p className="card-text"> Product Id : { _id}</p>                
            </div>           
            </div>
            <div className='col-md-6 col-sm-12'>
                <Elements stripe={stripePromise}>
                    <Checkout order={order} orderId={id}/>
                </Elements>
            </div>
            </div>
           
            </div> : <h2> Loading...</h2>}
        </>
    );
};

export default Payment;