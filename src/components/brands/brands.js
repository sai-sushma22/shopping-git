import React, { useEffect,useContext, useState } from "react";
import {ShoppingDataContext} from '../../contexts/ShoppingContext';
import './brands.css'

function Brands() {
  const {cartList,selectedBrand,updateCart,brandList,shoppingData,updateShoppingData} = useContext(ShoppingDataContext)

  const updateCartList = (data,operation) =>{
    let result = cartList,cartData =shoppingData,  i = result.findIndex(item=>item.name == data.name),j = cartData.findIndex(item=>item.name == data.name)
    if(operation === 'add'){
      if(i > -1){
        result[i].quantity += 1 
        result[i].price += data.price   
      }else{
        let product = {
          'name' : data.name,
          'quantity' : 1 ,
          'price' : data.price,
          'icon':data.icon
        }
        result.push(product)
      }
      cartData[j].quantity += 1;
    }else{
      if(i > -1 && result[i].quantity > 1){
        result[i].quantity -= 1 
        result[i].price -= data.price   
      }else if(i > -1){
        result.splice(i,1)
      }
      if(cartData[j].quantity > 0){
        cartData[j].quantity -= 1;
      }
    }
    updateCart(result)
    updateShoppingData(cartData)
  }

  return (
    <div className="brand-container">
        <h2 className="heading">Products of {selectedBrand}</h2>
        <div>
            {
                brandList.map ((item,index) =>{
                    return(
                    <div key={index} className="brand-div">
                        <div className="brand-display">
                            <div className="brand-image">
                                <img className="brand-icon-styling" src={item.icon} alt="brand"/>
                            </div>
                            <div className="brand-details">
                                <div className="d-flex">
                                    <h4>{item.name}</h4>      
                                </div>
                                <div className="price">
                                    <p>Price: {item.price}</p>
                                    <div className="d-flex">
                                      <button onClick={()=>updateCartList(item,'delete')}>-</button>
                                      <p>{item.quantity}</p>
                                      <button onClick={()=>updateCartList(item,'add')}>+</button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    )
                }
            )}
        </div>
      </div>  
  )
}

export default Brands;