import React, { useContext, useState } from 'react';
import { userContext } from '../../App';
import axios from 'axios'
import {  toast } from 'react-toastify';
import { Link } from 'react-router-dom';


const Cart = () => {
    const [collection, setCollection] = useContext(userContext)
    const cartItems = collection?.cart;
    const [success, setSuccess] = useState(false)
    
   

    const handleSaveToDB = async (product) => {       
        const {data} = await axios.post('http://localhost:4000/order', {
            product: product, 
            email: 'jamirali720@gmail.com'
        }) 
        if (data.document.acknowledged === true    ) {
            toast.success(data.message ,{position:toast.POSITION.TOP_CENTER})
            setSuccess(true)
        }
        console.log(data)
        
    }

    const handleIncrement = (id) => {
        const existProduct = collection?.cart.find(item => item.id === id);       
       
        const pd =  collection?.cart?.map(item => {
            return  item.id === id ? {...item, quantity : existProduct.quantity + 1}: item
         })

         setCollection({cart: pd})
            

    }
    const handleDecrement = (id) => {
        const existProduct = collection?.cart.find(item => item.id === id);
       
       if (existProduct.quantity > 1) {
        const pd =  collection?.cart?.map(item => {
            return  item.id === id ? {...item, quantity : existProduct.quantity - 1}: item
         })

         setCollection({cart: pd})
       }else {
            const pd =  collection?.cart?.filter(item =>   item.id !== id)
            setCollection({cart: pd})
       }


    }
    
    
    return (
        <div>
            <table className='table'>
                <thead>
                    <tr>
                        <th>Title</th>
                        <th>Category</th>
                        <th>Price</th>
                        <th>Quantity</th>
                        <th>Action</th>
                        
                    </tr>
                </thead>
                <tbody>
                    {
                        cartItems?.map((item, index) => {
                            return (
                                <tr key={index}>
                                    <td>{item.title} </td>
                                    <td>{item.category} </td>
                                    <td>{item.price} </td>
                                    <td><button onClick={()=> handleIncrement(item.id)} className='btn btn-info me-2 '>+ </button>{item.quantity}<button onClick={()=> handleDecrement(item.id)} className='btn btn-info ms-2'>- </button> </td>
                                    <td> 
                                    <button onClick={()=> handleSaveToDB(item)} className='btn btn-primary'>      Order Place 
                                    </button>                             
                                    </td>
                                </tr>
                            )
                        })
                    }
                </tbody>
            </table>
            <div className='m-auto'>
                    <Link to={success ? "/orders" : null}> <button className='btn btn-primary' disabled={!success}> Payment process</button></Link>
            </div>
            
        </div>
    );
};

export default Cart;