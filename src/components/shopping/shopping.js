import React, { useEffect,useContext } from "react";
import {ShoppingDataContext} from '../../contexts/ShoppingContext';
import Brands from "../brands/brands";
import Cart from "../cart/cart";
import Form from "../form/form";
import './shopping.css';

function Shopping() {

    const {shoppingData,updateShoppingData, uniqueBrands,updateUniqueBrands,selectedBrand,updateSelectedBrand,cartList} = useContext(ShoppingDataContext)

    useEffect(() => {
            (async ()=>{
                const response = await fetch("https://gist.githubusercontent.com/sandeepdillerao/edb372a95d6cf1a2a49b79577d023281/raw/75bf5e59e47748fad0d01ca63c81dd3791c2615c/product.json");
                if (!response.ok) {
                    const message = `An error has occured: ${response.status}`;
                    throw new Error(message);
                }
                const result = await response.json(),brandsObj = {};                             
                updateShoppingData(result.map(item=> {
                    item['quantity'] = 0;
                    return item
                }));
                result.forEach(item =>{
                    if(!brandsObj[item['brand']]){
                        brandsObj[item['brand']] = {"count":1,"icon": item['icon'],"brand":item['brand']};
                    }else{
                        brandsObj[item['brand']]['count'] += 1;
                    }
                })
                updateUniqueBrands(Object.values(brandsObj))
            })();
    }, []);

    const updateProductList = (data)=>{
        updateSelectedBrand(data,shoppingData.filter((item)=>item.brand === data))
        
    }
    
    return (
            <div className="main-container">
                <div className="brands-container">
                    <h2 className="heading">Brands</h2>
                    <div>
                        {
                            uniqueBrands.map ((item,index) =>{
                                return(
                                <div key={index} className="brand-div" onClick={()=>{updateProductList(item['brand'])}}>
                                    <div className="brand-display">
                                        <div className="brand-image">
                                            <img className="brand-icon-styling" src={item.icon} alt="brand"/>
                                        </div>
                                        <div className="brand-details">
                                            <div>
                                                <h4>{item.brand}</h4>      
                                            </div>
                                            <div>
                                                <p>ProductCount: {item.count}</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                )
                            }
                        )}
                    </div>
                </div>  
                <div className="product-container">
                        {selectedBrand != "" && <Brands /> }    
                </div>
                { cartList.length > 0 &&
                    <div className="cart-container">
                        <div className="cart-list">
                            <Cart />
                        </div>
                        <div className="form-container">
                            <Form />
                        </div>
                    </div>  
                }
            </div>
    );
}


export default Shopping;