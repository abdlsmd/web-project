import React from "react"
import axios from "axios"
import { useState } from "react"
import { useNavigate } from "react-router-dom"
import styles from "./eventRegForm.module.css"
import DialogBox from "./DialogBox"


/**
 *
 */
export default function CreateSocietyReg(){

    const [fname, setFName] = useState("")
    const [ lname, setLName] = useState("")
    const [batch, setBatch] = useState("")
    const [degree, setDegree] = useState("")
    const [Rollnum, setRollnum] = useState("")
    const [Contact, setcontact] = useState("")
    const [Team, setTeam] = useState("")
    const [Role, setRole] = useState("")
    const [PastExp, setExperience] = useState("")
    //file uploading
    const [CVimage, setCV] = useState(null)
    //selection status = boolean
    const [SelectionStatus, setSelection] = useState(false)
    
    const [errors, setErrors] = useState({
      fname: '',
      lname: '',
      batch: '',
      degree: '',
      Rollnum: '',
      contact: '',
      team: '',
      Role: '',
      experience: '',
      CV: ''
    })

    const [dialogShow, setDialogShow] = useState(false)
    const [dialogueMessage, setDialogMessage] = useState("")

    const validateInputs = () => {

      const namePattern = /^[A-Za-z]+$/;
      const batchPattern = /^\d+$/;
      const rollnumPattern = /^i\d{2}\d{4}$/;
      const contactPattern = /^\d{11}$/;
  
      const newErrors = {
        fname: '',
        lname: '',
        batch: '',
        degree: '',
        Rollnum: '',
        Contact: '',
        team: '',
        Role: '',
        experience: '',
        CV: ''
      }
  
    let isValid = true;
  
    if (!fname || !lname || !batch || !degree || !Rollnum ||!Contact ){
       newErrors.general = "All fields are required!";  
       isValid = false;
    }
     
     if (!fname) newErrors.fname = "First Name is required!";
     else if (!namePattern.test(fname)) newErrors.fname = "First Name should only contain alphabetic characters!";
     
     if (!lname) newErrors.lname = "Last Name is required!";
     else if (!namePattern.test(lname)) newErrors.lname = "Last Name should only contain alphabetic characters!";
     
     if (!batch) newErrors.batch = "Batch is required!";
     else if (!batchPattern.test(batch)) newErrors.batch = "Batch should only contain numeric value!";
   
     if (!Rollnum) newErrors.Rollnum = "Roll Number is required!";
     else if (!rollnumPattern.test(Rollnum)) newErrors.Rollnum = "RollNumber must follow the format  ixxxxxx!";
     
     if (!Contact) newErrors.Contact = "Contact Number is required!";
     else if (!contactPattern.test(Contact)) newErrors.Contact = "Contact must consist of 11 numeric digits!";
     
     if (!CVimage) newErrors.CV = "CV file is required!";
     
  
     setErrors(newErrors);
  
      return !isValid;
    }

    const navigate = useNavigate()


    const Submit = async (e) => {
        e.preventDefault();

        if (validateInputs()){
          return;
        }

        const formData = new FormData()

           formData.append("fname", fname)
           formData.append("lname", lname)
           formData.append("batch", batch)
           formData.append("degree", degree)
           formData.append("Rollnum", Rollnum)
           formData.append("Contact", Contact)
           formData.append("Team", Team)
           formData.append("Role", Role)
           formData.append("PastExp", PastExp)
          
     
           if(CVimage) {
                 formData.append("CVimage", CVimage)
           }

           formData.append("SelectionStatus", SelectionStatus);
        
           for (const [key, value] of formData.entries()){
            console.log(`${key}:`, value);
          }
   

        try{
         const res = axios.post('http://localhost:3001/createSR', formData)
        
              console.log('Response' , res.data)
              setDialogMessage('You have successfully registered!');
              setDialogShow(true);


              setTimeout(() => {
                navigate('/NewMember')
              }, 10000)
             

        } catch (err){
     
             console.log('Error', err)
             setDialogMessage("failed to register. Please try again.")
             setDialogShow(true)
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
            <h2 className={styles.ERheading}> Register in Society </h2>

            {dialogShow && <div className={styles.dialog}>{dialogueMessage}</div>}
            <div className={styles.ERinputGroup}>
                  <label htmlFor="" className={styles.ERlabelName}>First Name</label>
                  <input type="text" 
                         placeholder="Enter Name"
                         className={`form-control ${errors.fname ? styles.errorInput: ''}`}
                         onChange={(e) => setFName(e.target.value)}/>
                         {errors.fname && <div className={styles.errorText}>{errors.fname}</div>}
            </div>
            <div className={styles.ERinputGroup}>
                  <label htmlFor="" className={styles.ERlabelName}>Last Name</label>
                  <input type="text" 
                         placeholder="Enter Last Name"
                         className={`form-control ${errors.lname  ?  styles.errorInput : ''}`}
                         onChange={(e) => setLName(e.target.value)}/>
                        {errors.lname && <div className={styles.errorText}>{errors.lname}</div>}
            </div>
            <div className={styles.ERinputGroup}>
                  <label htmlFor="" className={styles.ERlabelName}> Batch </label>
                  <input type="text" 
                         placeholder="Enter batch"
                         className={`form-control ${errors.batch ? styles.errorInput : ''}`}
                         onChange={(e) => setBatch(e.target.value)}/>
                        {errors.batch && <div className={styles.errorText}>{errors.batch}</div>}
            </div>
            <div className={styles.ERinputGroup}>
                  <label htmlFor="" className={styles.ERlabelName}>Degree</label>
                  <input type="text" 
                         placeholder="Enter Degree"
                         className={`form-control ${errors.degree  ?  styles.errorInput : ''}`}
                         onChange={(e) => setDegree(e.target.value)}/>
                         {errors.degree && <div className={styles.errorText}>{errors.degree}</div>}
            </div>
            <div className={styles.ERinputGroup}>
                  <label htmlFor="" className={styles.ERlabelName}>Rollnum</label>
                  <input type="text" 
                         placeholder="Enter Rollnum"
                         className={`form-control ${errors.Rollnum ?  styles.errorInput : ''}`}
                         onChange={(e) => setRollnum(e.target.value)}/>
                        {errors.Rollnum && <div className={styles.errorText}>{errors.Rollnum}</div>}
            </div>
            <div className={styles.ERinputGroup}>
                  <label htmlFor="" className={styles.ERlabelName}>Contact</label>
                  <input type="text" 
                         placeholder="Enter contact number"
                         className={`form-control ${errors.contact ? styles.errorInput : ''}`}
                         onChange={(e) => setcontact(e.target.value)}/>
                         {errors.Contact && <div className={styles.errorText}>{errors.Contact}</div>}
            </div>
            <div className={styles.ERinputGroup}>
               {/* choice of team selections */}
                <label htmlFor="" className={styles.ERlabelName}>Select team</label>
                <select
                   
                    value={Team}
                    
                    onChange={(e) => setTeam(e.target.value)}>
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
               {/* choice of team selections */}
                <label htmlFor="" className={styles.ERlabelName}>Select Role</label>
                <select
                   
                    value={Role}
                    
                    onChange={(e) => setRole(e.target.value)}>
                    <option value="">Select designation applying for</option>
                    <option value="Manager"> Exective Body </option>
                    <option value="Mentor"> Mentor</option>
                    <option value="President"> President</option>
                    <option value="Member"> Member</option>
                </select>
                
            </div>
            <div className={styles.ERinputGroup}>
                  <label htmlFor="" className={styles.ERlabelName}>Past Experience (if any) </label>
                  <input type="text" 
                         placeholder="Share your past experience"
                         className={`form-control ${errors.experience  &&  styles.errorInput}`}
                         onChange={(e) => setExperience(e.target.value)}/>
                        {errors.experience && <div className={styles.errorText}>{errors.experience}</div>}
            </div>
            <div className={styles.ERinputGroup}>
                <label htmlFor="" className={styles.SSlabelName}>Upload CV </label>
                <input type="file" 
                   name = "CVimage"
                   placeholder="CV"
                  //  className={`form-control ${errors.CV  &&  styles.errorInput}`}
                   onChange={e => setCV(e.target.files[0])}/>
                   {errors.CV && <div className={styles.errorText}>{errors.CV}</div>}
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