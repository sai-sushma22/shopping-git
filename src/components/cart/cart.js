import React, { useContext } from "react";
import './cart.css'
import {ShoppingDataContext} from '../../contexts/ShoppingContext';

function Cart() {
  const {cartList} = useContext(ShoppingDataContext)
  return (
  <div className="cart-container">
        <h2 className="heading">Cart</h2>
    <div className="cart-display">
      {cartList.map((item,index)=>{
        return(
          <div key={index} className="cart-details-alignment">
            <div className="cart-image">
              <img src={item.icon} className="cart-icon-styling" alt="cart-icon"></img>
            </div>
            <div className="cart-details">
              <div className="d-flex">
                <h4>{item.name}</h4>
              </div>
              <div className="cart-total">
                <p>Qty: {item.quantity}</p>
                <p>Total: {item.price}</p>
              </div>
            </div>
          </div>
        )
      })}
    </div>
  </div>  
  )
}

export default Cart;