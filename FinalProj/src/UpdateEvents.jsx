
import React , {useState, useEffect} from "react"
import { useParams , useNavigate} from "react-router-dom"
import axios from "axios";
import styles from "./createEvent.module.css"
import DialogBox from "./DialogBox";



/**
 *
 */
function UpdateEvents(){

    const {id} = useParams()
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

    const [showDialog, setShowDialog] = useState(false);
    const [dialogueMessage, setDialogMessage] = useState("");

    const navigate = useNavigate()

     
    useEffect(() => {
        axios.get('http://localhost:3001/getEvents/'+ id)
        .then(result => {

            console.log("Event data fetched ", result)

            const data = result.data;
            setName(data.name || "")
            setDesc(data.description || "")
            setOrganizer(data.organizer || "")
            setDate(data.date || "")
            setEndDate(data.endDate || "")
            setTime(data.time || "")
            setAddress(data.address || "")
            setVenue(data.venue || "")
            setBudget(data.budget || "")
            setStatus(data.status || "")
            // for image
            setImage(data.image || null)
            setApprovalStatus(data.ApprovalStatus || true)
            
        })
        .catch(err => console.log(err))
  
      },[id]) 

      const updateEvents = (e) => {
        e.preventDefault();


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

        axios.put("http://localhost:3001/updateEvents/"+id,
           formData, {
            headers: {
                "Content-Type": "multipart/form-data"
            }
         })
        .then(result => {
            console.log("Event updated" ,result)
            setDialogMessage("Event updated successfully!")
            setShowDialog(true);

            // navigate('/EventApprovalList')
        })
        .catch(err => 
            {
                console.log("Error updating event:",err);
                setDialogMessage("Failed to update event")
                setShowDialog(true);
            })
       }

    const closeDialog = () => {
        setShowDialog(false);
        navigate('/EventApprovalList');
        
    }

    return (
        <div className={styles.CEdivStyle}>
            <img src="/image/EventBG.png" className={styles.CEimgBox} />
         <div className={styles.CEmainDiv}>
                <form onSubmit={updateEvents}>
                  <h2 className={styles.CEheading}> Update Events </h2>

                <div className={styles.CEinputGroup}>
                 <label htmlFor="" className={styles.CElabelName}>Name</label>
                <input type="text" 
                       placeholder="Enter Name"
                       className="form-control"
                       value = {name}
                       onChange={(e) => setName(e.target.value)}/>
                </div>
                <div className={styles.CEinputGroup}>
                  <label htmlFor="" className={styles.CElabelName}>Description</label>
                  <input type="text" 
                         placeholder="description..."
                         value = {description}
                         onChange={(e) => setDesc(e.target.value)}/>
                </div>
                <div className={styles.CEinputGroup}>
                    <label htmlFor="" className={styles.CElabelName}>Organizer</label>
                    <input type="text" 
                           placeholder="Enter organizer name"
                           value = {organizer}
                           onChange={(e) => setOrganizer(e.target.value)}/>
                </div>
                <div className={styles.CEinputGroup}>
                   <label htmlFor="" className={styles.CElabelName}>Date</label>
                   <input type="date" 
                          placeholder="Enter date"
                          value = {date}
                          onChange={(e) => setDate(e.target.value)}/>
                </div>
                <div className={styles.CEinputGroup}>
                   <label htmlFor="" className={styles.CElabelName}>End Date</label>
                   <input type="date" 
                          placeholder="Enter date"
                          value = {endDate}
                           onChange={(e) => setEndDate(e.target.value)}/>
                </div>
                 <div className={styles.CEinputGroup}>
                     <label htmlFor="" className={styles.CElabelName}>Time</label>
                     <input type="time" 
                            placeholder="Enter time"
                            value = {time}
                            onChange={(e) => setTime(e.target.value)}/>
                 </div>
                 <div className={styles.CEinputGroup}>
                    <label htmlFor="" className={styles.CElabelName}> Address </label>
                    <input type="text" 
                           placeholder="Enter Address"
                           value = {address}
                           onChange={(e) => setAddress(e.target.value)}/>
                 </div>
                <div className={styles.CEinputGroup}>
                    <label htmlFor="" className={styles.CElabelName}>Venue</label>
                    <input type="text" 
                           placeholder="Enter Venue"
                           value = {venue}
                           onChange={(e) => setVenue(e.target.value)}/>
                </div>
                 <div className={styles.CEinputGroup}>
                    <label htmlFor="" className={styles.CElabelName}>Budget</label>
                    <input type="text" 
                           placeholder="Enter budget"
                           value = {budget}
                           onChange={(e) => setBudget(e.target.value)}/>
                 </div>
                <div className={styles.CEinputGroup}>
                     <label htmlFor="" className={styles.CElabelName}>Status</label>
                     <input type="text" 
                            placeholder="Enter Status"
                            value = {status}
                            onChange={(e) => setStatus(e.target.value)}/>
                </div>
                <div className={styles.CEinputGroup}>
                      <label htmlFor="" className={styles.CElabelName}> Image </label>
                      <input type="file" 
                             placeholder="Upload image"
                             onChange={(e) => setImage(e.target.files[0])}/>
                 </div>
                 <div className={styles.CEinputGroup}>
                     <label htmlFor="" className={styles.CElabelName}>
                        Approval 
                        <br/> Status</label>
                     <input type="text" 
                            placeholder="Enter Status"
                            value = {ApprovalStatus}
                            onChange={(e) => setApprovalStatus(e.target.value)}/>
                </div> 
    
            <button className="btn btn-success" type="submit"> Update </button>
        </form>
        </div>

        <DialogBox 
            show={showDialog}
            message={dialogueMessage}
            onClose={closeDialog} 
         />  
    </div>
    )
}

export default UpdateEvents;