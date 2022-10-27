import './App.css';
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import Home from './Components/Home/Home';
import Payment from './Components/Payment/Payment';
import Navbar from './Components/Navbar/Navbar';
import { createContext, useState } from 'react';
import Cart from './Components/Cart/Cart';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Orders from './Components/Orders/Orders';

export const userContext = createContext();
function App() {
  const [collection, setCollection] = useState({})
  
  return (
    <div className="App">     
     <userContext.Provider value={[collection, setCollection]}>
      <Router>
        <Navbar/>
        <Routes>
            <Route path='/' element={<Home /> }/>
            <Route path='/payment/:id' element={<Payment /> }/>
            <Route path='/cart' element={<Cart /> }/>
            <Route path='/orders' element={<Orders /> }/>
            
           
        </Routes> 
      </Router>
      </userContext.Provider>
      <ToastContainer/>
    </div>
  );
}

export default App;
