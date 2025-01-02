
import React from "react"
import { useState, useEffect } from "react";
import axios from "axios";
import styles from "./singleEvent.module.css"



/**
 *
 */
export default function PresidentApproval(){
  const [events, setEvents] = useState([]);

  useEffect(() => {
     axios.get('http://localhost:3001/pendingEvents')
     .then(result => setEvents(result.data))
     .catch(err => console.log("getting error",err))
  }, [])


  const handleApproval = (id, approvalStatus) => {
    axios.patch(`http://localhost:3001/approveEvents/${id}`, {approvalStatus})
  .then(res => {
       console.log(res.data);
       setEvents(events.filter(event => event._id !== id));
  })
  .catch(err => console.log(err));
 }


        return (
            <div className={styles.EventdivStyle}>
              <img src="./image/EventBG.png" className={styles.EventimgBox} />
                <div className={styles.EventmainDiv}>
                <h2 className={styles.Eventheading}>Pending Events</h2>
                 {/* <Link to="/createEvent" className= "btn btn-success"> Add </Link> */}
                <table className={styles.EventTable}>
              <thead>
                 <tr>
                  <th>Event Name</th>
                  <th>Organizer</th>
                  <th>Date</th>
                  <th>End Date</th>
                  <th>Time</th>
                  <th>Venue</th>
                  <th>Budget</th>
                  <th>Address</th>
                  <th>Actions</th>
                 </tr>
              </thead>
              <tbody>
                {
                  events.map((event) => (
                    <tr key={event._id}>
                      <td> {event.name} </td>
                      <td> {event.organizer} </td>
                      <td> {event.date}</td>
                      <td> {event.endDate}</td>
                      <td> {event.time}</td>
                      <td> {event.venue}</td>
                      <td> {event.budget}</td>
                      <td> {event.address}</td>
                     
                      
                      <td>
                      {/* have to design button */}
                        <button
                            onClick={() => handleApproval(event._id, true)}
                            className="btn btn-success">
                            Approve
                        </button>
                        <button
                            onClick={() => handleApproval(event._id, false)}
                            className="btn btn-danger">
                            DisApprove
                        </button>
                      </td>
    
                    </tr>
                  ))}
    
               </tbody>
              </table>
            </div>
          </div>
        )
    }
