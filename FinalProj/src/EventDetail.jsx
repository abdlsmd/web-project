import { useState , useEffect} from "react";
import { useParams } from "react-router-dom";
import Testpage from "./Testpage";
import axios from 'axios';
import styles from './eventdetail.module.css'



/**
 *
 */
export default function EventDetail(){
     const { id } = useParams();
     const [ event, setEvent] = useState(null);
     const [ error, setError] = useState(null);

     useEffect(() => {
        console.log('Fetching event with id:', id)
        const fetchEvent = async () => {
            try {

              const response = await axios.get(`http://localhost:3001/getEvents/${id}`)
              setEvent(response.data)
            }catch(err){
                if (err.response && err.response.status === 404){
                    setError('Event not found')
                } else {
                    setError('An error occured')
                }
            }
        }
            fetchEvent();
        //       .then(result =>setEvent(result.data))
        // .catch(err => console.log(err))
     }, [id]);


     if( error ){
       return <div>{error}</div> 
     }
  
     if(!event) {
         return <div>Loading...</div>
     }

     return (
        <div className= {styles.mainDivBg}>
            <Testpage 
               eventName={event.name} 
               description={event.description} 
               image={`http://localhost:3001/uploads/${event.image}`} 
            />
            <div className={styles.DetailBox}>
    
                <h2 className={styles.eventDetailHeading}>Event Detail</h2>
                <p>
                    <strong>Start date </strong> 
                    {event.date}
                </p>
                <p>
                    <strong>End date </strong> 
                    {event.endDate}
                </p>
                <p>
                    <strong>Time  </strong> 
                    {event.time}
                </p>
                
                <p>
                    <strong>Address </strong> 
                    {event.address}
                </p>
                <p>
                    <strong>Venue </strong> 
                    {event.venue}
                </p>
                <p>
                    <strong>Budget </strong> 
                    {event.budget}
                </p>
                <p>
                    <strong>Status </strong> 
                    {event.status}
                </p>
                
                
            </div>
        </div>
     )

}