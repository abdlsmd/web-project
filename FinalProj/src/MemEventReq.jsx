            
import React from "react"
import axios from "axios"
import { useState } from "react"
import { useNavigate } from "react-router-dom"
import styles from "./createEvent.module.css"
import DialogBox from './DialogBox'

//Validations
const  validateName = (name) => {
    const nameValidation = /^[A-Za-z0-9\s]+$/;
    if(!name){
        return 'Name is required';
    }
    if(!nameValidation.test(name)) {
        return 'Name should not contain numbers or special characters'
    }
    return null;
}

const validateOrganizer = (organizer) => {
    return validateName(organizer)
}

const validateDate = (date) => {
    if (!date) {
        return 'Date is required'
    }
    return null;
}

const validateBudget = (budget) => {
    if (!budget){
        return 'Budget is required'
    }
    if(isNaN(budget)){
        return 'Budget must be a number'
    }
    return null;
}



const  createEvent = async(eventData)=>{
    try{
      const response = await axios.post("http://localhost:3001/createEvent", 
        eventData,{
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
export default function MembereventHome(){

    const [name, setName] = useState("")
    const [description, setDesc] = useState("")
    const [organizer, setOrganizer] = useState("")
    const [date, setDate] = useState("")
    const [endDate,setEndDate] = useState("")
    const [time, setTime] = useState("")
    const [address, setAddress] = useState("")
    const [venue, setVenue] = useState("")
    const [budget, setBudget] = useState("")
    const [status, setStatus] = useState("")
    const [image, setImage] = useState(null)
    const [ApprovalStatus, setApprovalStatus] = useState(false)
    const [errors, setErrors] = useState({})
    const [dialog, setDialog] = useState({
        show: false,
        message: '',
        isSuccess: true
    })

    const navigate = useNavigate()

    const validateForm = () => {
        const errors = {
            name: validateName(name),
            organizer: validateOrganizer(organizer),
            date: validateDate(date),
            budget: validateBudget(budget)
        }

        setErrors(errors);

        return !Object.values(errors).some(error => error);
    }

    const Submit = async (e) => {
        e.preventDefault();

        if (!validateForm()){
            return;
        }

        const formData = new FormData();
        formData.append("name", name);
        formData.append("description", description);
        formData.append("organizer", organizer);
        formData.append("date", date);
        formData.append("endDate", endDate);
        formData.append("time", time);
        formData.append("address", address);
        formData.append("venue", venue);
        formData.append("budget", budget);
        formData.append("status", status);
        formData.append("ApprovalStatus", ApprovalStatus);

        if(image) {
            formData.append("image", image)
        }
        console.log("Submitting form data: ", Object.fromEntries(formData.entries()));

        try {
            await createEvent(formData);
            setDialog({
                show: true,
                message: 'Event requested successfully!',
                isSuccess: true
            });
            setTimeout(() => {
                navigate('/Dashboard/Member');
          }, 2000);

        } catch(error) {
            setDialog({
                show: true,
                message: 'Failed to create event. Please try again later!',
                isSuccess: false
            });
        }
    }

    

    return (
        <div className={styles.CEdivStyle}>
               <img src="./image/EventBG.png" className={styles.CEimgBox} />
          <div className={styles.CEmainDiv}>
           <form onSubmit={Submit}>
            <h2 className={styles.CEheading}> Request  Event </h2>

            <div className={styles.CEinputGroup}>
                <label htmlFor="" className={styles.CElabelName}>Name</label>
                 
                <input type="text" 
                       placeholder="Enter Name"
                       className={styles.placeholderS}
                       onChange={(e) => setName(e.target.value)}
                       />
                    {errors.name && <p className={styles.errorText}>{errors.name}</p>}
            </div>
            <div className={styles.CEinputGroup}>
                <label htmlFor="" className={styles.CElabelName}>Description</label>
                <input type="text" 
                       placeholder="description..."
                       className={styles.placeholderS}
                  onChange={(e) => setDesc(e.target.value)}/>
            </div>
            <div className={styles.CEinputGroup}>
                <label htmlFor="" className={styles.CElabelName}>Organizer</label>
                <input type="text" 
                       placeholder="Enter organizer name"
                       className={styles.placeholderS}
                       onChange={(e) => setOrganizer(e.target.value)}
                />
                {errors.organizer && <p className={styles.errorText}>{errors.organizer}</p>}
            </div>
            <div className={styles.CEinputGroup}>
                <label htmlFor="" className={styles.CElabelName}>Date</label>
                <input type="date" 
                       placeholder="Enter date"
                       className={styles.placeholderS}
                       onChange={(e) => setDate(e.target.value)}
                />
                {errors.date && <p className={styles.errorText}>{errors.date}</p>}
            </div>
            <div className={styles.CEinputGroup}>
                <label htmlFor="" className={styles.CElabelName}>End Date</label>
                <input type="date" 
                       placeholder="Enter date"
                       className={styles.placeholderS}
                       onChange={(e) => setEndDate(e.target.value)}
                    />
                    {errors.date && <p className={styles.errorText}>{errors.date}</p>}
            </div>
            <div className={styles.CEinputGroup}>
                <label htmlFor="" className={styles.CElabelName}>Time</label>
                <input type="time" 
                       placeholder="Enter time"
                       className={styles.placeholderS}
                       onChange={(e) => setTime(e.target.value)}
                />
                
            </div>
            <div className={styles.CEinputGroup}>
                <label htmlFor="" className={styles.CElabelName}> Address </label>
                <input type="text" 
                       placeholder="Enter Address"
                       className={styles.placeholderS}
                       onChange={(e) => setAddress(e.target.value)}/>
            </div>
            <div className={styles.CEinputGroup}>
                <label htmlFor="" className={styles.CElabelName}>Venue</label>
                <input type="text" 
                       placeholder="Enter Venue"
                       className={styles.placeholderS}
                       onChange={(e) => setVenue(e.target.value)}/>
            </div>
            <div className={styles.CEinputGroup}>
                <label htmlFor="" className={styles.CElabelName}>Budget</label>
                <input type="text" 
                       placeholder="Enter budget"
                       className={styles.placeholderS}
                       onChange={(e) => setBudget(e.target.value)}
                    />
                {errors.budget && <p className={styles.errorText}>{errors.budget}</p>}
            </div>
            <div className={styles.CEinputGroup}>
                <label htmlFor="" className={styles.CElabelName}>Status</label>
                <input type="text" 
                       placeholder="Enter Status"
                       className={styles.placeholderS}
                       onChange={(e) => setStatus(e.target.value)}/>
            </div>
            <div className={styles.CEinputGroup}>
                <label htmlFor="" className={styles.CElabelName}> Image </label>
                <input type="file" 
                       placeholder="choose image"
                       className={styles.placeholderS}
                       onChange={(e) => setImage(e.target.files[0])}/>
            </div>


            <button type="submit" className={styles.CEBtn}> Submit </button>
        </form>
        </div>
           <DialogBox
             show={dialog.show}
             message={dialog.message}
             isSuccess={dialog.isSuccess}
             onClose={() => setDialog({ 
                    show: false,
                    message: '',
                    isSuccess: true})}
            />
        </div>
    )
}
