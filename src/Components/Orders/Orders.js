import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

const Orders = () => {
    const [orders, setOrders] = useState([])
    const email = "jamirali720@gmail.com"

    useEffect(()=> {
        const fetchOrders = async() => {
            const {data } = await axios.get(`http://localhost:4000/getAllOrders?email=${email}`)
            setOrders(data.document)
        }
        fetchOrders()
    } , [])
    
  
    return (
        <div>
            <div className="table">
                <table className='table'>
                    <thead>
                        <tr>
                            <th>#</th>
                            <th>Title</th>
                            <th>Category</th>
                            <th>Price</th>                           
                            <th>Quantity</th>                           
                            <th>Payment</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            orders.map((order , index)=> {
                                return (
                                    <tr key={index}>
                                        <td>{index + 1}</td>
                                        <td>{order.title}</td>
                                        <td>{order.category}</td>
                                        <td>{order.price}</td>
                                        <td>{order.quantity}</td>
                                        <td> 
                                            {(order.price && !order.paid) && <Link to={`/payment/${order._id}`}> <button> Pay</button></Link>}
                                            {(order.price && order.paid) && <span className='text-success'> Paid</span>}
                                        </td>
                                    </tr>
                                )
                            })
                        }
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default Orders;