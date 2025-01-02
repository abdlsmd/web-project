      
  import React from "react"
  import axios from "axios"
  import { useState } from "react"
  import { useNavigate } from "react-router-dom"
  import styles from "./eventRegForm.module.css"
  import DialogBox from "./DialogBox"
  

/**
 *
 */
export default function SocietyRegForm(){
 
      const [fname, setFName] = useState("")
      const [ lname, setLName] = useState("")
      const [batch, setBatch] = useState("")
      const [degree, setDegree] = useState("")
      const [Rollnum, setRollnum] = useState("")
      const [contact, setcontact] = useState("")
      const [team, setTeam] = useState("")
      const [experience, setExperience] = useState("")
      //file uploading
      const [CV, setCV] = useState(null)
      //selection status = boolean
      const [Selection, setSStatus] = useState("")

      const [errors, setErrors] = useState({
        fname: '',
        lname: '',
        batch: '',
        degree: '',
        Rollnum: '',
        contact: '',
        team: '',
        experience: '',
        CV: ''
   })

   const [dialog, setDialog] = useState({
       show: false,
       message: ''
   })

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
      contact: '',
      team: '',
      experience: '',
      CV: ''
    }

  let isValid = true;

  if (!fname || !lname || !batch || !degree || !Rollnum ||!contact ||!team ||!CV){
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
   
   if (!contact) newErrors.contact = "Contact Number is required!";
   else if (!contactPattern.test(contact)) newErrors.contact = "Contact must consist of 11 numeric digits!";
   
   if (!CV) newErrors.CV = "CV file is required!";
   

   setErrors(newErrors);

    return !isValid;
  }
      
      const navigate = useNavigate()
  
      const Submit = (e) => {
          e.preventDefault();

          if (validateInputs()){
            return;
          }

          const formData = new FormData();
          formData.append('fname', fname);
          formData.append('lname', lname);
          formData.append('batch', batch);
          formData.append('degree', degree);
          formData.append('Rollnum', Rollnum);
          formData.append('contact', contact);
          formData.append('team', team);
          formData.append('experience', experience);
          formData.append('CV', CV);
          formData.append('Selection', Selection);

          axios.post("http://localhost:3001/createSR", formData, {
            headers: {
                'Content-Type': 'multipart/form-data'
                 }
          })
              
              .then((result) => {
                 console.log(result)

                 setDialog({
                    show: true,
                    message: 'You have successfully registered!'
                 })
                 navigate('/createSR')
              })
          .catch((err) => {
            console.log(err)

            setDialog({
              show: true,
              message: 'Failed to register. Please try again'
            })
         })
      }
  
      
  
      return (
          <div className={styles.ERdivStyle}>
  
                   <img src="/image/EventBG.png" className={styles.ERimgBox} />
            <div className={styles.ERmainDiv}>
             <form onSubmit={Submit}>
              <h2 className={styles.ERheading}> Register in Society </h2>
  
              {dialog.show && <div className={styles.dialog}>{dialog.message}</div>}
              <div className={styles.ERinputGroup}>
                  <label htmlFor="" className={styles.ERlabelName}>First Name</label>
                  <input type="text" 
                         placeholder="Enter Name"
                         className={`form-control ${errors.fname  &&  styles.errorInput}`}
                         onChange={(e) => setFName(e.target.value)}/>
                         {errors.fname && <div className={styles.errorText}>{errors.fname}</div>}
              </div>
              <div className={styles.ERinputGroup}>
                  <label htmlFor="" className={styles.ERlabelName}>Last Name</label>
                  <input type="text" 
                         placeholder="Enter Last Name"
                         className={`form-control ${errors.lname  &&  styles.errorInput}`}
                         onChange={(e) => setLName(e.target.value)}/>
                        {errors.lname && <div className={styles.errorText}>{errors.lname}</div>}
              </div>
              <div className={styles.ERinputGroup}>
                  <label htmlFor="" className={styles.ERlabelName}> Batch </label>
                  <input type="text" 
                         placeholder="Enter batch"
                         className={`form-control ${errors.batch  &&  styles.errorInput}`}
                         onChange={(e) => setBatch(e.target.value)}/>
                        {errors.batch && <div className={styles.errorText}>{errors.batch}</div>}
              </div>
              <div className={styles.ERinputGroup}>
                  <label htmlFor="" className={styles.ERlabelName}>Degree</label>
                  <input type="text" 
                         placeholder="Enter Degree"
                         className={`form-control ${errors.degree  &&  styles.errorInput}`}
                         onChange={(e) => setDegree(e.target.value)}/>
                         {errors.degree && <div className={styles.errorText}>{errors.degree}</div>}
              </div>
              <div className={styles.ERinputGroup}>
                  <label htmlFor="" className={styles.ERlabelName}>Rollnum</label>
                  <input type="text" 
                         placeholder="Enter Rollnum"
                         className={`form-control ${errors.Rollnum  &&  styles.errorInput}`}
                         onChange={(e) => setRollnum(e.target.value)}/>
                        {errors.Rollnum && <div className={styles.errorText}>{errors.Rollnum}</div>}
              </div>
              <div className={styles.ERinputGroup}>
                  <label htmlFor="" className={styles.ERlabelName}>Contact</label>
                  <input type="text" 
                         placeholder="Enter contact number"
                         className={`form-control ${errors.contact  &&  styles.errorInput}`}
                         onChange={(e) => setcontact(e.target.value)}/>
                         {errors.contact && <div className={styles.errorText}>{errors.contact}</div>}
              </div>
              <div className={styles.ERinputGroup}>
                 {/* choice of team selections */}
                  <label htmlFor="" className={styles.ERlabelName}>Select team</label>
                  <input type="text" 
                         placeholder="Select teams"
                         className={`form-control ${errors.team  &&  styles.errorInput}`}
                         onChange={(e) => setTeam(e.target.value)}/>
                         {errors.team && <div className={styles.errorText}>{errors.team}</div>}
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
                  <label htmlFor="" className={styles.ERlabelName}>CV </label>
                  <input type="file" 
                         placeholder="CV"
                         className={`form-control ${errors.CV  &&  styles.errorInput}`}
                         onChange={(e) => setCV(e.target.files[0])}/>
                         {errors.CV && <div className={styles.errorText}>{errors.CV}</div>}
              </div>
              {/* <div className={styles.ERinputGroup}>
                  <label htmlFor="" className={styles.ERlabelName}>Past Experience (if any) </label>
                  <input type="text" placeholder="Selection"
                    onChange={(e) => setSStatus(e.target.value)}/>
              </div> */}
              
              <button className={styles.ERBtn}> Submit </button>
          </form>
          </div>
      </div>    
      )
  }

