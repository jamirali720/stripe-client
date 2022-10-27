import React, { useContext, useEffect, useState } from 'react';
import { userContext } from '../../App';

const ProductsDisplay = () => {
    const [cartItems, setCartItems] = useState([])
    const [products, setProducts] = useState([])
    const [collection, setCollection] = useContext(userContext)

    useEffect (()=> {
        fetch('https://fakestoreapi.com/products')
        .then(res=>res.json())
        .then(json=>setProducts(json))

    } ,[])

    useEffect(()=> {
        setCollection({cart: cartItems})
    }, [cartItems, setCollection])
    const handleAddToCart = product => {
        const existProduct = cartItems.find(pd => pd.id === product.id)
        if(existProduct) {
            setCartItems(cartItems.map(item => item.id === product.id ? {...existProduct, quantity: existProduct.quantity + 1}: item))
        }else {
            setCartItems([...cartItems, {...product, quantity: 1}])
        }
        
        
    }
    console.log(collection)
    
    const renderPd = products.map((product , index)=> {
        return (
            <div key={index}>
               <div className="card m-2" style={{width: '18rem', height: 430}}>
                <img src={product.image} className="card-img-top mx-auto pt-2" alt="..." style={{width: 230,  height: 160}}/>
                <div className="card-body">
                    <h5 className="card-title"> {product.title}</h5>
                    <h5 className="card-title"> {product.category}</h5>                  
                    <p className="card-text">Price: {product.price}</p>
                    <button className='btn btn-primary' onClick={()=> handleAddToCart(product)}> Add To Cart</button>

                </div>
                </div>
            </div>
        )
    })

    const styles = {
        display: 'flex', 
        justifyContent: 'center',
        alignItems: 'center', 
        flexWrap : 'wrap'

    }
    return (
        <div  style={styles}>
            {renderPd}
            
        </div>
    );
};

export default ProductsDisplay;