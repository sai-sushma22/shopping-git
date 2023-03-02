import React, { useEffect,useContext, useState } from "react";
import {ShoppingDataContext} from '../../contexts/ShoppingContext';
import './brands.css'

function Brands() {
  const {selectedBrand,brandList} = useContext(ShoppingDataContext);


  return (
    <div className="brands-container">
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