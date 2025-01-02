import React from "react"
import axios from "axios"
import { useState, useEffect } from "react"
import { useNavigate } from "react-router-dom"
import styles from "./eventRegForm.module.css"
import DialogBox from "./DialogBox"
import { useParams } from "react-router-dom"

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


/**
 *
 */
export default function UpdateProfile(){

   const {id} = useParams()

    const [Name, setName] = useState("")
    const [ Email, setEmail] = useState("")
    //file uploading
    const [ProfilePic, setProfilePic] = useState(null)
    const [Role, setRole] = useState("")
    const [phoneNum, setPhoneNum] = useState("")
    const [Address, setAddress] = useState("")
    const [DOB, setDOB] = useState("")
    //MStatus = Membership status
    const [MStatus, setMStatus] = useState("")
    const [Res, setRes] = useState("")

    const [dialogShow, setDialogShow] = useState(false)
    const [dialogueMessage, setDialogMessage] = useState("")

    const [errors, setErrors] = useState({})
    
    const navigate = useNavigate()

    useEffect(() => {

           axios.get('http://localhost:3001/Profile/'+ id)
          .then(result => {
              console.log(result)
                const {
                  Name, Email, ProfilePic, Role, phoneNum,
                  Address, DOB, MStatus , Res } = result.data

              setName(Name || "")
              setEmail(Email || "")
              setProfilePic(ProfilePic || null)
              setRole(Role || "")
              setPhoneNum(phoneNum || "")
              setAddress(Address || "")
              setDOB(DOB || "")
              setMStatus(MStatus || "")
              setRes(Res || "")
          })

          .catch(err => console.log(err))
    }, [id])

    // const handleDelete = (id) => {
    //   console.log("Deleting event with ID:" , id)
    //    axios.delete('http://localhost:3001/deleteSR/'+id)
    //    .then(res => {
    //       console.log(res);
    //       window.location.reload();
    //     })
    //    .catch(err => console.log(err));
    // }


    const Update = async (e) => {
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

       if (!Object.values(newErrors).some(error => error)) {
        const formData = new FormData()

           formData.append("Name", Name)
           formData.append("Email", Email)
         
           if(ProfilePic) {
                 formData.append("ProfilePic", ProfilePic)
           }

           formData.append("Role", Role)
           formData.append("phoneNum", phoneNum)
           formData.append("Address", Address)
           formData.append("DOB", DOB)
           formData.append("MStatus", MStatus)
           formData.append("Res", Res)

          
        try{
   
        axios.put('http://localhost:3001/updateProfile/'+ id, 
          formData, {
            headers: {
              "Content-Type" : "multipart/form-data"
            }
          })
          setDialogMessage("Successfully updated");
          setDialogShow(true);
          navigate('/Profile');

        } catch (error){

          console.error('Error:',error.response || error.message || error);
          setDialogMessage("failed to update. Please try again");
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
           <form onSubmit={Update}>
            <h2 className={styles.ERheading}> Update Profile </h2>

            <div className={styles.ERinputGroup}>
                <label htmlFor="" className={styles.ERlabelName}>Name</label>
                <input type="text" 
                       placeholder="Enter Name"
                       className="form-control"
                       value = {Name}
                       onChange={(e) => setName(e.target.value)}/>
                {errors.name && <p className={styles.errorText}>{errors.name}</p>}
            </div>
            <div className={styles.ERinputGroup}>
                <label htmlFor="" className={styles.ERlabelName}>Email</label>
                <input type="text" 
                       placeholder="Enter email"
                       value = {Email}
                       onChange={(e) => setEmail(e.target.value)}/>
                 {errors.email && <p className={styles.errorText}>{errors.email}</p>}
            </div>
            <div className={styles.ERinputGroup}>
                <label htmlFor="" className={styles.ERlabelName}>Role</label>
                <select
                   
                   value={Role}
                   
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
                <input type="text" 
                       placeholder="Enter phone num"
                       value = {phoneNum}
                       onChange={(e) => setPhoneNum(e.target.value)}/>
                   {errors.phoneNum && <p className={styles.errorText}>{errors.phoneNum}</p>}
            </div>
            <div className={styles.ERinputGroup}>
                <label htmlFor="" className={styles.ERlabelName}>Address</label>
                <input type="text" 
                       placeholder="Enter Address"
                       value = {Address}
                  onChange={(e) => setAddress(e.target.value)}/>
                   {errors.address && <p className={styles.errorText}>{errors.address}</p>}
            </div>
            <div className={styles.ERinputGroup}>
               {/* choice of team selections */}
                <label htmlFor="" className={styles.ERlabelName}>Date Of Birth</label>
                <input type="date" 
                       placeholder="DOB"
                       value = {DOB}
                  onChange={(e) => setDOB(e.target.value)}/> 
                  {errors.DOB && <p className={styles.errorText}>{errors.DOB}</p>}
            </div>
            <div className={styles.ERinputGroup}>
                <label htmlFor="" className={styles.ERlabelName}>Working status</label>
                <input type="text" 
                       placeholder="Enter working status"
                       value = {MStatus}
                       onChange={(e) => setMStatus(e.target.value)}/>
                 {errors.MStatus && <p className={styles.errorText}>{errors.MStatus}</p>}
            </div>
            <div className={styles.ERinputGroup}>   
                <label htmlFor="" className={styles.ERlabelName}>Responsibility </label>
                <input type="text" 
                       placeholder="Enter responsibilities"
                       value = {Res}
                       onChange={(e) => setRes(e.target.value)}/>
                 {errors.res && <p className={styles.errorText}>{errors.res}</p>}
            </div>
            <div className={styles.ERinputGroup}>
                <label htmlFor="" className={styles.ERlabelName}> ProfilePic </label>
                <input type="file" 
                   name = "ProfileImage"
                   placeholder="ProfileImage"
                   value = ""
                   onChange={e => setProfilePic(e.target.files[0])}/>
               
            </div>

            
            <button  className={styles.ERBtn} type="submit"> Update </button>
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