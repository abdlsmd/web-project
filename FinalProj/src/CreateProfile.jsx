import React from "react"
import axios from "axios"
import { useState } from "react"
import { useNavigate } from "react-router-dom"
import styles from "./eventRegForm.module.css"
import DialogBox from "./DialogBox"

//validation functions
const validateName = (name) => {
    if (!name) return 'Name is required';
    const nameValidation = /^[A-Za-z\s]+$/;
    if (!nameValidation.test(name)) return 'Name should not contain numbers'
    return null;
}

const validateEmail = (email) => {
  if (!email) return 'Email is required';
  const emailValidation = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailValidation.test(email)) return 'Email must be a valid email address'
  return null;
}

const validateProfilePic = (profilePic) => {
  if (!profilePic) return 'Profile picture is required';
  return null;
}

const validatePhoneNum = (phoneNum) => {
  if (!phoneNum) return 'Phone number is required';
  const phoneValidation = /^\d+$/;
  if (!phoneValidation.test(phoneNum)) return 'Phone number should contain only digits'
  return null;
}

const validateAddress = (address) => {
  if (!address) return 'Address is required';
  return null;
}

const validateDOB = (dob) => {
  if (!dob) return 'Date of Birth is required';
  return null;
}

const validateMStatus = (mStatus) => {
  if (!mStatus) return 'Membership status is required';
  return null;
}

const validateRes = (res) => {
  if (!res) return 'Responsibilities should mention';
  return null;
}

const  createProfileHandler = async (formData) =>{
  try{
      const response = await axios.post("http://localhost:3001/Profile", 
      formData,{
        headers: {
            "Content-Type" : "multipart/form-data"
        }
      })
      console.log(response.data);
      return response.data;
  }catch( error ){
      console.error('There was an error',error);
      throw error;
   }
}

/**
 *
 */
export default function CreateProfile(){

    const [Name, setName] = useState("")
    const [ Email, setEmail] = useState("")
    //file uploading
    const [ProfilePic, setProfilePic] = useState("")
    const [Role, setRole] = useState("")
    const [Team, setTeam] = useState("")
    const [phoneNum, setPhoneNum] = useState("")
    const [Address, setAddress] = useState("")
    const [DOB, setDOB] = useState("")
    //MStatus = Membership status
    const [MStatus, setMStatus] = useState("")
    const [Res, setRes] = useState(null)

    const [dialogShow, setDialogShow] = useState(false)
    const [dialogueMessage, setDialogMessage] = useState("")

    const [errors, setErrors] =  useState({
        name: '',
        email: '',
        profilePic: '',
        phoneNum: '',
        address: '',
        dob: '',
        mStatus: '',
        res: '',
    })


    const navigate = useNavigate()


    const Submit = async (e) => {
        e.preventDefault();


        const newErrors = {
           name: validateName(Name),
           email: validateEmail(Email),
           profilePic: validateProfilePic(ProfilePic),
           phoneNum: validatePhoneNum(phoneNum),
           address: validateAddress(Address),
           dob: validateDOB(DOB),
           mStatus: validateMStatus(MStatus),
           res: validateRes(Res),
        }

        setErrors(newErrors)

        if(!Object.values(newErrors).some(error => error)){
          const formData = new FormData()

          formData.append("Name", Name)
          formData.append("Email", Email)
        
          if(ProfilePic) {
                formData.append("ProfilePic", ProfilePic)
          }

          formData.append("Role", Role)
          formData.append("Team", Team)
          formData.append("phoneNum", phoneNum)
          formData.append("Address", Address)
          formData.append("DOB", DOB)
          formData.append("MStatus", MStatus)
          formData.append("Res", Res)

          try{
            const response = await createProfileHandler(formData);
            console.log(response);
            setDialogMessage("Successfully registered!");
            setDialogShow(true);
            navigate(`/Profile/${response.data.profileId}`);

          }catch( error ){
             setDialogMessage("Failed to register. Please try again");
             setDialogShow(true);
          }
        }
    }
       
  
    const handleCloseDialog = () => {
      setDialogShow(false)
    }
    

    return (
        <div className={styles.ERdivStyle}>

                 <img src="/image/EventBG.png" className={styles.ERimgBox} />
          <div className={styles.ERmainDiv}>
           <form onSubmit={Submit}>
            <h2 className={styles.ERheading}> Profile </h2>

            <div className={styles.ERinputGroup}>
                <label htmlFor="" className={styles.ERlabelName}>Name</label>
                <input type="text" 
                       placeholder="Enter Name"
                       className="form-control"
                       onChange={(e) => setName(e.target.value)}/>
                  {errors.name && <p className={styles.errorText}>{errors.name}</p>} 
            </div>
            <div className={styles.ERinputGroup}>
                <label htmlFor="" className={styles.ERlabelName}>Email</label>
                <input type="text" placeholder="Enter email"
                  onChange={(e) => setEmail(e.target.value)}/>
                  {errors.email && <p className={styles.errorText}>{errors.email}</p>} 
            </div>
           
            <div className={styles.ERinputGroup}>
                <label htmlFor="" className={styles.ERlabelName}>Role</label>
                <select
                   
                   value={Role}
                   
                   onChange={(e) => setRole(e.target.value)}>
                   <option value="">Select a Role</option>
                   <option value="President"> President </option>
                   <option value="Mentor"> Mentor</option>
                   <option value="Member"> Member</option>
                   <option value="EC"> EC</option>
               </select>
              
            </div>
            <div className={styles.ERinputGroup}>
                <label htmlFor="" className={styles.ERlabelName}>Team</label>
                <select
                   
                   value={Team}
                   
                   onChange={(e) => setRole(e.target.value)}>
                   <option value="">Select a team</option>
                   <option value="Operations"> Operations </option>
                   <option value="Finance"> Finance</option>
                   <option value="Event Planning"> Event Planning</option>
                   <option value="Content Creation"> Content Creation</option>
                   <option value="Sponsership"> Sponsership</option>
                   <option value="Training"> Training</option>

               </select>
              
            </div>
            <div className={styles.ERinputGroup}>
                <label htmlFor="" className={styles.ERlabelName}>phoneNum</label>
                <input type="text" placeholder="Enter phone num"
                  onChange={(e) => setPhoneNum(e.target.value)}/>
                 {errors.phoneNum && <p className={styles.errorText}>{errors.phoneNum}</p>}  
            </div>
            <div className={styles.ERinputGroup}>
                <label htmlFor="" className={styles.ERlabelName}>Address</label>
                <input type="text" placeholder="Enter Address"
                  onChange={(e) => setAddress(e.target.value)}/>
                 {errors.address && <p className={styles.errorText}>{errors.address}</p>}
            </div>
            <div className={styles.ERinputGroup}>
               {/* choice of team selections */}
                <label htmlFor="" className={styles.ERlabelName}>Date Of Birth</label>
                <input type="date" placeholder="choose a role"
                  onChange={(e) => setDOB(e.target.value)}/> 
                 {errors.dob && <p className={styles.errorText}>{errors.dob}</p>}
            </div>
            <div className={styles.ERinputGroup}>
                <label htmlFor="" className={styles.ERlabelName}>Working status</label>
                <input type="text" placeholder="Enter working status"
                       onChange={(e) => setMStatus(e.target.value)}/>
             {errors.mStatus && <p className={styles.errorText}>{errors.mStatus}</p>}
            </div>
            <div className={styles.ERinputGroup}>   
                <label htmlFor="" className={styles.ERlabelName}>Responsibility </label>
                <input type="text" placeholder="Enter responsibilities"
                       onChange={(e) => setRes(e.target.value)}/>
                 {errors.res && <p className={styles.errorText}>{errors.res}</p>}
            </div>
            <div className={styles.ERinputGroup}>
                <label htmlFor="" className={styles.ERlabelName}> ProfilePic </label>
                <input type="file" 
                   name = "ProfilePic"
                   placeholder="ProfilePic"
                   onChange={e => setProfilePic(e.target.files[0])}/>
                   {errors.profilePic && <p className={styles.errorText}>{errors.profilePic}</p>}
            </div>

            {/* should not show to newMember */}
            {/* <div className={styles.ERinputGroup}>
                <label htmlFor="" className={styles.SSlabelName}>Selection Status </label>
                <div className={`${styles.radioButtonGroup}  ${styles.SSLabel}`}>
                  <label className={styles.radioButtonGroup}>
                    <input type="radio"
                           value={true}
                           checked={SelectionStatus === true}
                           onChange={() => setSelection(true)}/>
                           Yes
                  </label>
                  <label className={styles.radioButtonGroup}>
                    <input type="radio"
                           value={false}
                           checked={SelectionStatus === false}
                           onChange={() => setSelection(false)}/>
                           No
                  </label>
                </div>
          </div> */}
            
            <button type="submit" className={styles.ERBtn}> Submit </button>
        </form>
        </div>

        <DialogBox
            show={dialogShow}
            message={dialogueMessage}
            onClose={handleCloseDialog}
        
        />
    </div>    
    )
}