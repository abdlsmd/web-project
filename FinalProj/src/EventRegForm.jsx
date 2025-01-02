       
import React from "react"
import axios from "axios"
import { useState } from "react"
import { useNavigate } from "react-router-dom"
import styles from "./eventRegForm.module.css"
import DialogBox from './DialogBox'


/**
 *
 */
export default function EventRegForm(){


    const [fname, setFName] = useState("")
    const [ lname, setLName] = useState("")
    const [batch, setBatch] = useState("")
    const [degree, setDegree] = useState("")
    const [Rollnum, setRollnum] = useState("")

    const [errors, setErrors] = useState({
         fname: '',
         lname: '',
         batch: '',
         Rollnum: ''
    })

    const [dialog, setDialog] = useState({
        show: false,
        message: ''
    })
    
    const navigate = useNavigate()

    const validateInputs = () => {

        const namePattern = /^[A-Za-z]+$/;
        const batchPattern = /^\d+$/;
        const rollnumPattern = /^i\d{2}\d{4}$/;

        const newErrors = {
           fname: '',
           lname: '',
           batch: '',
           Rollnum: ''
        }

        if (!fname || !lname || !batch || !degree || !Rollnum){
           return "All fields are required!";
        }
        
        if (!fname) newErrors.fname = "First Name is required!";
        else if (!namePattern.test(fname)) newErrors.fname = "First Name should only contain alphabetic characters!";
        
        if (!lname) newErrors.lname = "LAst Name is required!";
        else if (!namePattern.test(lname)) newErrors.lname = "Last Name should only contain alphabetic characters!";
        
        if (!batch) newErrors.batch = "Batch is required!";
        else if (!batchPattern.test(batch)) newErrors.batch = "Batch should only contain numeric value!";
      
        if (!Rollnum) newErrors.Rollnum = "Roll Number is required!";
        else if (!rollnumPattern.test(Rollnum)) newErrors.Rollnum = "RollNumber must follow the format  ixxxxxx!";
        
        setErrors(newErrors);

        return Object.values(newErrors).some(error => error !== "");
    }

    const Submit = (e) => {
        e.preventDefault();

        if (validateInputs()){
           return;
        }


        axios.post("http://localhost:3001/EventRegForm",
             {fname, lname , batch, degree, Rollnum})
            .then((result) => {
               console.log(result)

               setDialog({
                 show: true,
                 message: 'You have successfully registered!'
               })

               setTimeout(() => {
                 navigate('/EventReg')
               }, 10000)
            })
        .catch((err) => {
            console.log(err)

            setDialog({
                show: true,
                message: 'Failed to register. Please try again.'
            })
        })
    }

    

    return (
        <div className={styles.ERdivStyle}>

                 <img src="/image/EventBG.png" className={styles.ERimgBox} />
          <div className={styles.ERmainDiv}>
           <form onSubmit={Submit}>
            <h2 className={styles.ERheading}> Register in Events </h2>

            <div className={styles.ERinputGroup}>
                <label htmlFor="" className={styles.ERlabelName}>First Name</label>
                <input type="text" 
                       placeholder="Enter First Name"
                       
                       className={`form-control ${errors.fname  &&  styles.errorInput}`}
                       onChange={(e) => setFName(e.target.value)}
                    />
                    {errors.fname && <div className={styles.errorText}>{errors.fname}</div>}
            </div>
            <div className={styles.ERinputGroup}>
                <label htmlFor="" className={styles.ERlabelName}>Last Name</label>
                <input type="text" 
                       placeholder="Enter last name..."
                       className={`form-control ${errors.lname  &&  styles.errorInput}`}
                       onChange={(e) => setLName(e.target.value)}
                    />
                    {errors.lname && <div className={styles.errorText}>{errors.lname}</div>}
            </div>
            <div className={styles.ERinputGroup}>
                <label htmlFor="" className={styles.ERlabelName}> Batch </label>
                <input type="text" 
                       placeholder="Enter Batch "
                       className={`form-control ${errors.batch  &&  styles.errorInput}`}
                       onChange={(e) => setBatch(e.target.value)}
                    />
                    {errors.batch && <div className={styles.errorText}>{errors.batch}</div>}
            </div>
            <div className={styles.ERinputGroup}>
                <label htmlFor="" className={styles.ERlabelName}>Degree</label>
                <input type="text" 
                       placeholder="Enter degree"
                       className={`form-control ${errors.degree  &&  styles.errorInput}`}
                       onChange={(e) => setDegree(e.target.value)}
                    />
                    {errors.degree && <div className={styles.errorText}>{errors.degree}</div>}
            </div>
            <div className={styles.ERinputGroup}>
                <label htmlFor="" className={styles.ERlabelName}>Rollnum</label>
                <input type="text" 
                       placeholder="Rollnum in format ixxxxxx"
                       className={`form-control ${errors.Rollnum  &&  styles.errorInput}`}
                       onChange={(e) => setRollnum(e.target.value)}
                    />
                    {errors.Rollnum && <div className={styles.errorText}>{errors.Rollnum}</div>}
            </div>
            
            <button className={styles.ERBtn}> Submit </button>
        </form>
        </div>

        <DialogBox
           show={dialog.show}
           message={dialog.message}
           onClose={() => setDialog({
               show: false,
               message: ''
           })}
        
        
        />
    </div>    
    )
}
