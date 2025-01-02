
import React from 'react'
import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import axios from 'axios';
import background from "../public/image/authpage.png";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEye, faEyeSlash , faExclamationCircle , faCheckCircle} from '@fortawesome/free-solid-svg-icons';
import styles from "./login.module.css"
import DialogBox from './DialogBox';
import { useAuth } from './AuthProvider'

/**
 *
 */
function LogIn(){

    const { login } = useAuth();
    
  //for dialogue box visibility
    const [dialog, setDialog] = useState({
       show: false,
        message: ' ',
    })

    const loginwithgoogle = () => {
        window.open("http://localhost:3001/auth/google/callback", "_self")
    }

   const [email, setEmail] = useState('');
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
   const navigate = useNavigate()
   const [isPasswordFocused, setPasswordFocused] = useState(false)
   const [IsGoogleSignIn, setIsGoogleSignIn] = useState(false)

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

   const validatePassword = (password) => {
    const PasswordVal = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
      if (!password){
        return 'password is required.';
      }
      if(!PasswordVal.test(password)){
        return 'password should fullfill the below requirements';
      }
    return null;
   }


   const handleSubmit = (e) => {
       e.preventDefault();

       if(!IsGoogleSignIn){
        const Error = {
            email: validateEmail(email),
            password: validatePassword(password)
        };

       setErrors(Error);

       if (!Error.email && !Error.password){
       axios.post('http://localhost:3001/login', {email, password})
       .then(result => {
            console.log(result)
           if(result.data.message === "success"){

            //extracting role from result
            const userRole = result.data.role;
            login();
            setDialog({
                  show: true,
                  message: 'Login Successfully!!'
                })
               
                //Redirecting
                if (userRole === "New"){
                    navigate('/NewMember')
                }else if (userRole){
                    navigate(`/DashBoard/${userRole}`)
                }else{
                    navigate('/home')
                }
           }else{
            setDialog({
                show: true,
                message: 'Login failed. Please check your credentials'
            })
          }
       })
       .catch(err => 
           {
            console.log(err);
            setDialog({
                show: true,
                message: 'An error occured. Please try again later',
            });
        });
    }else{
        setDialog({
            show: true,
            message: 'Please correct error before submitting'
        })
       }

     } else {
        setDialog({
            show: true,
            message: 'Redirecting to Google Sign-In...'
        })
        setIsGoogleSignIn(false)
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
    <div className={styles.LogindivStyle}>
        <img src={background} alt="background" className={styles.LoginimgBox}  />
        <div className={styles.LoginmainDiv}>
        <form onSubmit={handleSubmit}>
        <h2 className={styles.Loginheading}>LOG IN</h2>
            

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
                     {Error.email && <p className = {styles.LoginerrorText}> {Error.email}</p>}
            </div>
            
           
            {/* <div className="mb-3">
                <label htmlFor="password">
                    <strong>Password</strong>
                </label>
                < br />
                <input type="password" 
                       placeholder="Enter Password" 
                       autoComplete="off"
                       name="name"
                       className="form-controlrounded-0"
                       onChange={(e) => setPassword(e.target.value)}/>
            </div> */}
            <div>
                <label htmlFor="password"  className={styles.LoginlabelName}>
                    Password
                </label>
                < br />
                <input type= {passwordVisible ? 'text' : 'password'} 
                       placeholder="Enter Password" 
                       autoComplete="off"
                       name="password"
                       onChange={handlePasswordChange}
                       onFocus={() => setPasswordFocused(true)}
                       onBlur={() => setPasswordFocused(false)}
                />
                <button  className={styles.Logineyebtn}
                   type = "button"
                  
                   onClick = {togglePasswordVisibility}
                   >
                    <FontAwesomeIcon icon={passwordVisible ? faEyeSlash : faEye} />
                </button>
            </div>
            {Error.password && <p className = {styles.LoginerrorText}>{Error.password}</p>}
            <br />

            {isPasswordFocused && (
            <div className={styles.LoginPassOptions}>
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
   )}
            <button type="submit" className={styles.LoginBtn}>
                Login
            </button>
            
            <Link to="/forget-password" className={styles.forgetFont} >
               Forget Password?
            </Link>

            <br />
            <br />
            <h6>Or Sign Up Using</h6>
            <br />
            
            <button className={styles.GoogleBtn} onClick={loginwithgoogle}>
                <img className={styles.iconimg} src="./image/google.png" />
                Sign In With Google
            </button>
            
            </form>
        
        </div>
        <DialogBox 
              show={dialog.show} 
              message={dialog.message}
              onClose={() =>  setDialog({
                show: false,
                message: ' '
              })} />
    </div>
    )
}


export default LogIn