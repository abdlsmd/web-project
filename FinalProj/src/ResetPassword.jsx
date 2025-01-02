
import React from 'react'
import { useState } from 'react';
import { useNavigate,  useParams } from 'react-router-dom';
import axios from 'axios';
import background from "../public/image/authpage.png";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheckCircle, faExclamationCircle } from '@fortawesome/free-solid-svg-icons';
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';
import 'bootstrap/dist/css/bootstrap.min.css'
import styles from "./reset.module.css"

/**
 *
 */
function ResetPassword(){

   const [password, setPassword] = useState('');
   const [Error, setErrors] = useState({})
   const [passwordVisible, setVisibility] = useState(false);
   const [passwordValid, setPasswordValid] = useState({
       minLength: false,
       uppercase: false,
       lowercase: false,
       number: false,
       specialChar: false
   })

   const {id, token} = useParams()
   const navigate = useNavigate()

   const validatePassword = (password) => {
    const PasswordVal = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
      if (!password){
        return 'password is required.';
      }
      if(!PasswordVal.test(password)){
        return 'atleast 8 character, 1 uppercase,1 lowercase, 1 number, 1 special character';
      }
    return null;
   }

const handleSubmit = (e) => {
    e.preventDefault();
    const Error = {
        password: validatePassword(password)
    };

    setErrors(Error);

    if (!Error.password){
        console.log("password being sent:", password);
        axios.post(`http://localhost:3001/reset-password/${id}/${token}`, {password})
        .then(result => {

            console.log('API response: ', result)
            if (result.data.Status === "Success"){
                console.log(result);
                navigate('/login')
            }else{
                console.log('Unexpected response', result.data)
            }
           })
           .catch(err => console.log('Error', err))
        }
    }

const togglePasswordVisibility = () =>{
    setVisibility(!passwordVisible)
}

const handlePasswordChange = (e) =>{
    const value = e.target.value;
    setPassword(value);
    setPasswordValid({
        minLength: value.length >= 8,
        uppercase: /[A-Z]/.test(value),
        lowercase: /[a-z]/.test(value),
        number: /\d/.test(value),
        specialChar: /[@$!%*?&]/.test(value),

    })
}

  
    return (
    <div className={styles.ResetdivStyle}>
        <img src={background} alt="background" className={styles.ResetimgBox}  />
        <div className={styles.ResetmainDiv}>
        <form onSubmit={handleSubmit}>
        <h2 className={styles.Resetheading}>Reset Password</h2>
         

        <div>
                <label htmlFor="password" className={styles.ResetlabelName}>
                    Password
                </label>
                < br />
                <input type= {passwordVisible ? 'text' : 'password'} 
                       placeholder="Enter Password" 
                       autoComplete="off"
                       name="password"
                       onChange={handlePasswordChange}
                />
                <button className={styles.Reseteyebtn}
                   type = "button"
                  
                   onClick = {togglePasswordVisibility}
                   >
                    <FontAwesomeIcon icon={passwordVisible ? faEyeSlash : faEye} />
                </button>
            </div>
            {Error.password && <p>{Error.password}</p>}
           <br />

           <div className={styles.PassOptions}>
             <ul>
                <li>

                    <FontAwesomeIcon icon={passwordValid.minLength ? faCheckCircle : faExclamationCircle}
                     className={passwordValid.minLength ? 'text-success' : 'text-danger'}
                    />
                     <span>At least 8 character</span>
                </li>
                <li>
                    <FontAwesomeIcon icon={passwordValid.uppercase ? faCheckCircle : faExclamationCircle} 
                    className={passwordValid.uppercase ? 'text-success' : 'text-danger'}
                    />
                     <span>At least 1 Uppercase letter</span>
                </li>
                <li>
                    <FontAwesomeIcon icon={passwordValid.lowercase ? faCheckCircle : faExclamationCircle} 
                    className={passwordValid.lowercase ? 'text-success' : 'text-danger'}
                    />
                     <span>At least 1 Lowercase letter</span>
                </li>
                <li>
                    <FontAwesomeIcon icon={passwordValid.number ? faCheckCircle : faExclamationCircle} 
                    className={passwordValid.number ? 'text-success' : 'text-danger'}
                    />
                     <span>At least 1 number</span>
                </li>
                <li>
                    <FontAwesomeIcon icon={passwordValid.specialChar ? faCheckCircle : faExclamationCircle } 
                    className={passwordValid.specialChar ? 'text-success' : 'text-danger'}
                    />
                     <span>At least 1 special character</span>
                </li>

             </ul>
           </div>

        <br />
        <br />
        <button type="submit" className={styles.ResetBtn}>
                Update
        </button>
        </form>
        
        </div>
    </div>
    )
}


export default ResetPassword;