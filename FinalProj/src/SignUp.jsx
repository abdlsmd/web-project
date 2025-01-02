
import { useState } from "react";
import styles from "./signup.module.css"
import 'bootstrap/dist/css/bootstrap.min.css'
import axios from 'axios'
import { Link, useNavigate } from "react-router-dom";
import background from "../public/image/authpage.png";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEye, faEyeSlash , faCheckCircle , faExclamationCircle} from '@fortawesome/free-solid-svg-icons';
import DialogBox from "./DialogBox";
import { useAuth } from "./AuthProvider";

/**
 *
 */
function SignUp(){
  const { login } = useAuth();

  //for dialogue box visibility
  const [dialog, setDialog] = useState({
      show: false,
      message: ' ',
  })

    const [selectedOption, setSelectedOption] = useState('');

    
   const [name, setName] = useState('');
   const [email, setEmail] = useState('');
   const [role, setRole] = useState('');
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
   
   const [isPasswordFocused, setPasswordFocused] = useState(false)
   const [IsGoogleSignIn, setIsGoogleSignIn] = useState(false);
   const navigate = useNavigate()


   const handleChange = (event) => {
      setSelectedOption(event.target.value);
  };

   const validateName = (name) => {
    const nameValidation = /^[A-Za-z]{1,20}$/;
      if (!name){
        return 'Name is required.';
      }
      if(!nameValidation.test(name)){
        return 'Name must be only alphabets';
      }
    return null;
   }

   const validateEmail = (email) => {
    const emailValidation = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!email){
        return 'Email is required.';
      }
      if(!emailValidation.test(email)){
        return 'Email is invalid';
      }
    return null;
   }

   const validatePassword = (password) => {
    const PasswordVal = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
      if (!password){
        return 'password is required.';
      }
      if(!PasswordVal.test(password)){
        return 'password should fullfill the below requirements ';
      }
    return null;
   }

   
   const handleSubmit = (e) => {
      e.preventDefault();
      
        const Error = {
           name: validateName(name),
           email: validateEmail(email),
           password: validatePassword(password)
          };

        setErrors(Error);

        if (!Error.name && !Error.email && !Error.password){
            axios.post('http://localhost:3001/register', {name, email, role, password})
              .then(result => {
                
                console.log(result);
                login();

                //users
                localStorage.setItem('userType', role);

                setDialog({
                   show: true,
                   message: 'You have successfully signed up !!'
                })
              setTimeout(() => {
                
                if (role === "New"){
                  navigate('/NewMember')
                }else {
                  navigate(`/DashBoard/${role}`)
                }
                // if (role === "New"){
                //   navigate('/NewMember')
                // }
                // else if (role === "President"){
                //    navigate('/PresidentDB')
                // }else if ( role === "Mentor")
                //   navigate('/MentorDB')
                
                // else{
                //    navigate('/login')
                // }

              }, 2000)

            })
          .catch(err => 
              console.log(err));
              setDialog({
                show: true,
                message: 'Failed to sign up. Please try again'
              })
        }
    };

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
    <div className={styles.divStyle} >
    {/* // className="d-flex justify-content-center align-items-center  vh-100" style={{ backgroundColor: '#c2257b' }} */}
    <img src={background} alt="background" className={styles.imgBox}  />
        
        <div className={styles.mainDiv}>
        
        <form onSubmit={handleSubmit}>
        <h2 className={styles.signupheading}>SIGN UP</h2>
            <div>
                <label htmlFor="name" className={styles.labelName}>
                    Name
                </label>
                < br/>
                <input type="text" 
                      
                       placeholder="Enter Name"
                       autoComplete="off"
                       name="name"
                   
                    onChange={(e) => setName(e.target.value)}
                    />
                  {Error.name && <p className = {styles.errorText}> {Error.name}</p>  }
               
            </div>
            <div>
                <label htmlFor="email" className={styles.labelName}>
                   Email
                </label>
                < br />
                <input type="text" 
                       placeholder="Enter Email"
                       autoComplete="off"
                       name="email"
                     
                    onChange={(e) => setEmail(e.target.value)}
                    />
                     {Error.email &&  <p className = {styles.errorText}> {Error.email}</p>}
            </div>
            <div>
                <label htmlFor="role" className={styles.labelName}>
                    Role
                </label>
                < br />
                <select 
                      id="dropdown" 
                      value={selectedOption} 
                      onChange={(e) => {
                      handleChange(e);
                      setRole(e.target.value)
                   }}
                   >
            <option value="">Select an option</option>
            <option value="Mentor">Mentor</option>
            <option value="President">President</option>
            <option value="Member">Member</option>
            <option value="Manager">Manager</option>
            <option value="New">New</option>
      </select>
      {/* {!selectedOption && 
          <p className = {styles.errorText} You must select a option> </p>} */}
      </div>
            <div>
                <label htmlFor="password" className={styles.labelName}>
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
                <button className={styles.eyebtn}
                   type = "button"
                  
                   onClick = {togglePasswordVisibility}
                   >
                    <FontAwesomeIcon icon={passwordVisible ? faEyeSlash : faEye} />
                </button>
            </div>
            {Error.password && <p className = {styles.errorText}>{Error.password}</p>}
            <br/>
             
             {isPasswordFocused && (
            <div className={styles.SignUpPassOptions}>
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
            
            <button type="submit" className={styles.RegBtn}>
                Register
            </button>
            </form>
            <br/>
            {/* <Link to="forget-password">
               Forget Password
            </Link> */}
            <h6 >Already have an account</h6>
            <Link to="/login">
              <button className={styles.RegBtn}>Login</button>  
            </Link>

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

export default SignUp;