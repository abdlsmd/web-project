
import React from "react"
import axios from "axios"
import { useState } from "react"
import { useNavigate } from "react-router-dom"
import styles from "./createEvent.module.css"
import DialogBox from "./DialogBox"


const  createEvent = async(eventData, setDialogMessage, setShowDialog)=>{
    try{
      const response = await axios.post("http://localhost:3001/createEvent", 
        eventData,{
          headers: {
              "Content-Type" : "multipart/form-data"
          }
        })
        setDialogMessage("Event created successfully!");
        setShowDialog(true);
        console.log(response.data);

     }catch( error ){
        setDialogMessage("There was an error creating the event");
        setShowDialog(true);
        console.error('There was an error',error);
     }
}


/**
 *
 */
function CreateEvents(){
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
    const [ApprovalStatus, setApprovalStatus] = useState(true)

    //Dialogue box
    const [showDialog, setShowDialog] = useState(false);
    const [dialogueMessage, setDialogMessage] = useState("");

    const [errors, setErrors] = useState({
        name: '',
        description: '',
        organizer: '',
        date: '',
        endDate: '',
        time: '',
        address: '',
        venue: '',
        budget: '',
        status: '',
        image: '',

    })

    const navigate = useNavigate()

    const validateForm = () => {

        const newErrors = {
            name: '',
            description: '',
            organizer: '',
            date: '',
            endDate: '',
            time: '',
            address: '',
            venue: '',
            budget: '',
            status: '',
            image: ''
        };

        // if (!name, !description , !organizer, !date,
        //     !endDate , !time, !address, !venue , !budget ,
        //     !status
        // ) {
        //     setDialogMessage("All fields are required")
        //     setShowDialog(true);
        //     return false;
        // }

        const namePattern = /^[A-Za-z\s]+$/;
        const numericPattern = /^\d+$/;
        
        const timePattern = /^\d{2}:\d{2}$/;

        if (!name) newErrors.name = "Event Name is required!";
       
        if(!description) newErrors.description = "Eventdescription is required";

        if(!organizer) newErrors.organizer = "Organizer is required!";
        else if (!namePattern.test(organizer)) newErrors.organizer = "Organizer Name should only contain alphabets";

        if(!date) newErrors.date = "Event date is required!";
        

        if(!endDate) newErrors.endDate = "End date is required!";
        

        if(!time) newErrors.time = "time is required!";
        else if (!timePattern.test(time)) newErrors.time = "Time must be in HH:MM";

        if(!address) newErrors.address = "Address is required!";

        if(!venue) newErrors.venue = "venue is required!";
       
        if(!budget) newErrors.budget = "Budget is required!";
        else if (!numericPattern.test(budget)) newErrors.budget = "Budget should only contain numeric values!";

        if(!date) newErrors.status = "Status is required!";
        
        setErrors(newErrors);

        if(Object.values(newErrors).some(error => error !== '')){
            setDialogMessage("Please correct the errors before submitting");
            setShowDialog(true);
            return false;
        }
        
        return true;

    }

    const Submit = (e) => {
        e.preventDefault();

        if (!validateForm()) {
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

        createEvent(formData, setDialogMessage, setShowDialog)
          .then(() => {
              navigate('/events')
          })
          .catch(err => console.log(err))
       
    }

    

    return (
        <div className={styles.CEdivStyle}>
               <img src="./image/EventBG.png" className={styles.CEimgBox} />
          <div className={styles.CEmainDiv}>
           <form onSubmit={Submit}>
            <h2 className={styles.CEheading}> Add Events </h2>

            <div className={styles.CEinputGroup}>
                <label htmlFor="" className={styles.CElabelName}>Name</label>
                <input type="text" 
                       placeholder="Enter Name"
                       className={`form-control ${errors.name  &&  styles.errorInput}`}
                       onChange={(e) => setName(e.target.value)}/>
                    {errors.name && <div className={styles.errorText}>{errors.name}</div>}
            </div>
            <div className={styles.CEinputGroup}>
                <label htmlFor="" className={styles.CElabelName}>Description</label>
                <input type="text" 
                       placeholder="description..."
                       className={`form-control ${errors.description  &&  styles.errorInput}`}
                  onChange={(e) => setDesc(e.target.value)}/>
                  {errors.description && <div className={styles.errorText}>{errors.description}</div>}
            </div>
            <div className={styles.CEinputGroup}>
                <label htmlFor="" className={styles.CElabelName}>Organizer</label>
                <input type="text" 
                       placeholder="Enter organizer name"
                       className={`form-control ${errors.organizer  &&  styles.errorInput}`}
                       onChange={(e) => setOrganizer(e.target.value)}/>
                    {errors.organizer && <div className={styles.errorText}>{errors.organizer}</div>}
            </div>
            <div className={styles.CEinputGroup}>
                <label htmlFor="" className={styles.CElabelName}>Date</label>
                <input type="date" 
                       placeholder="Enter date"
                       className={`form-control ${errors.date  &&  styles.errorInput}`}
                       onChange={(e) => setDate(e.target.value)}/>
                    {errors.date && <div className={styles.errorText}>{errors.date}</div>}
            </div>
            <div className={styles.CEinputGroup}>
                <label htmlFor="" className={styles.CElabelName}>End Date</label>
                <input type="date" 
                       placeholder="Enter date"
                       className={`form-control ${errors.endDate  &&  styles.errorInput}`}
                       onChange={(e) => setEndDate(e.target.value)}/>
                    {errors.endDate && <div className={styles.errorText}>{errors.endDate}</div>}
            </div>
            <div className={styles.CEinputGroup}>
                <label htmlFor="" className={styles.CElabelName}>Time</label>
                <input type="time" 
                       placeholder="Enter time"
                       className={`form-control ${errors.time  &&  styles.errorInput}`}
                       onChange={(e) => setTime(e.target.value)}/>
                    {errors.time && <div className={styles.errorText}>{errors.time}</div>}
            </div>
            <div className={styles.CEinputGroup}>
                <label htmlFor="" className={styles.CElabelName}> Address </label>
                <input type="text" 
                       placeholder="Enter Address"
                       className={`form-control ${errors.address  &&  styles.errorInput}`}
                       onChange={(e) => setAddress(e.target.value)}/>
                    {errors.address && <div className={styles.errorText}>{errors.address}</div>}
            </div>
            <div className={styles.CEinputGroup}>
                <label htmlFor="" className={styles.CElabelName}>Venue</label>
                <input type="text" 
                       placeholder="Enter Venue"
                       className={`form-control ${errors.venue &&  styles.errorInput}`}
                       onChange={(e) => setVenue(e.target.value)}/>
                    {errors.venue && <div className={styles.errorText}>{errors.venue}</div>}
            </div>
            <div className={styles.CEinputGroup}>
                <label htmlFor="" className={styles.CElabelName}>Budget</label>
                <input type="text" 
                       placeholder="Enter budget"
                       className={`form-control ${errors.budget  &&  styles.errorInput}`}
                       onChange={(e) => setBudget(e.target.value)}/>
                    {errors.budget && <div className={styles.errorText}>{errors.budget}</div>}
            </div>
            <div className={styles.CEinputGroup}>
                <label htmlFor="" className={styles.CElabelName}>Status</label>
                <input type="text" 
                       placeholder="Enter Status"
                       className={`form-control ${errors.status  &&  styles.errorInput}`}
                       onChange={(e) => setStatus(e.target.value)}/>
                    {errors.status && <div className={styles.errorText}>{errors.status}</div>}
            </div>
            <div className={styles.CEinputGroup}>
                <label htmlFor="" className={styles.CElabelName}> Image </label>
                <input type="file" 
                    //    placeholder="choose image"
                    //    className={`form-control ${errors.image  &&  styles.errorInput}`}
                       onChange={(e) => setImage(e.target.files[0])}/>
                    {errors.image && <div className={styles.errorText}>{errors.image}</div>}
            </div>
            {/* <div className={styles.CEinputGroup}>
                <label htmlFor="" className={styles.CElabelName}>ApprovalStatus</label>
                <input type="text" 
                       placeholder="Enter Status"
                       className={styles.placeholderS}
                       onChange={(e) => setApprovalStatus(e.target.value)}/>
            </div> */}

            <button type="submit" className={styles.CEBtn}> Submit </button>
        </form>
        </div>

           <DialogBox 
             show={showDialog}
             message={dialogueMessage}
             onClose={() => setShowDialog(false)}
        
           />
        </div>
    )
}

export default CreateEvents;