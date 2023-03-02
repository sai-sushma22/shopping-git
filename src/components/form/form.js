import React, { useContext, useEffect,useState } from "react";
import { useForm } from "react-hook-form";
import './form.css'
import {ShoppingDataContext} from '../../contexts/ShoppingContext';

function Form() {
  let [totalList,setTotalList] = useState({})
  const { register, handleSubmit, formState: { errors } } = useForm();
  const onSubmit = data => {
    console.log({
      'cartList':cartList,
      'details':data
    })
  };
  const {cartList} = useContext(ShoppingDataContext)

  useEffect(()=>{
    let total= 0,totalPrice = 0;
    cartList.forEach(item=>{
        total += item.quantity
        totalPrice += item.price 
    })
    setTotalList({'total':total,"totalPrice":totalPrice})
  },[cartList])

  return (
    <div>
      <h3>Total No.of items :{totalList.total} </h3>
      <h3>Total Price :{totalList.totalPrice} </h3>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="form-control">
          <input {...register("name", { 
            required: 'Name is required', 
            pattern:{
              value : /^[a-zA-Z ]*$/,
              message: 'Only Alphabets are allowed',
            } })} placeholder="Name" />
            {errors.name && errors.name?.message && (
                <p className="errorMsg">{errors.name?.message}.</p>
            )}
        </div>
        <div className="form-control">
            <input {...register("email",
            {
              required: 'Email is required',
              pattern: {
                  value: /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
                  message: 'Please enter a valid email',
              },
            })} placeholder="Email" />
            {errors.email && errors.email?.message && (
                <p className="errorMsg">{errors.email?.message}</p>
            )}
        </div>
        <div className="form-control">
            <input {...register("mobile", 
            { required: "Mobile is required",
            minLength:{ value: "10",message:'Min length is 10' },
            maxLength:{ value: "10",message:'Max length is 10' },
            pattern:{
              value: /[6-9]{1}[0-9]{9}/,
              message:'Please enter a valid Mobile Number' 
            }})} placeholder="Mobile" />
            {errors.mobile && errors.mobile?.message && (
                <p className="errorMsg">{errors.mobile?.message}</p>
            )}
        </div>
        
        <input type="submit" value="checkout" className="submit-button" />
      </form>
    </div>
  )
}

export default Form;