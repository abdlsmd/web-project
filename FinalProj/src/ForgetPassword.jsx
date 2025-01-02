
import React from 'react'
import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import axios from 'axios';
import background from "../public/image/authpage.png";
import styles from "./login.module.css"

/**
 *
 */
function ForgetPassword(){

   const [email, setEmail] = useState('');
   const [Error, setErrors] = useState({})
   const navigate = useNavigate()


   const validateEmail = (email) => {
    const emailValidation = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!email){
        return 'Email is required.';
      }
      if(!emailValidation.test(email)){
        return 'email is invalid';
      }
    return null;
   }


   const handleSubmit = (e) => {
    e.preventDefault();

        const Error = {
           email: validateEmail(email),   
        };

        setErrors(Error);

    if (!Error.email){
    axios.post('http://localhost:3001/forget-password', {email})
    .then(result => 
        {console.log(result)
        if(result.data === "Success"){
            navigate('/login')
        }
    })
    .catch(err => console.log(err))
  }
}

  
    return (
    <div className={styles.LogindivStyle}>
        <img src={background} alt="background" className={styles.LoginimgBox}  />
        <div className={styles.LoginmainDiv}>
        <form onSubmit={handleSubmit}>
        <h2 className={styles.Loginheading}>Forget Password</h2>
         

            <div>
                <label htmlFor="email" className={styles.LoginlabelName}>
                    Email
                </label>
                < br />
                <input type="text" 
                       placeholder="Enter Email"
                       autoComplete="off"
                       name="email"
                     
                    onChange={(e) => setEmail(e.target.value)}
                    />
                     {Error.email && <p> {Error.email}</p>}
            </div>
         
            < br />
            <button type="submit" className={styles.LoginBtn}>
                Send
            </button>
           
            </form>
        
        </div>
    </div>
    )
}


export default ForgetPassword;