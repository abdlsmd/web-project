import React from "react"

import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import styles from "./singleEvent.module.css"


/**
 *
 */
export default function EventApprovalList(){

    const [events, setEvents] = useState([])

    useEffect(() => {
       axios.get('http://localhost:3001/events')
       .then(result => setEvents(result.data))
       .catch(err => console.log(err))
    }, [])

    const handleDelete = (id) => {
      console.log("Deleting event with ID:" , id)
       axios.delete('http://localhost:3001/deleteEvent/'+id)
       .then(res => {
          console.log(res);
          setEvents(events.filter(event => event._id !== id));
          // window.location.reload();
        })
       .catch(err => console.log(err));
    }


    return (
        <div className={styles.EventdivStyle}>
          <img src="./image/EventBG.png" className={styles.EventimgBox} />
            <div className={styles.EventmainDiv}>
            <h2 className={styles.Eventheading}>Events List</h2>
             {/* <Link to="/createEvent" className= "btn btn-success"> Add </Link> */}
            <table className={styles.EventTable}>
          <thead>
             <tr>
              <th>Event Name</th>
              {/* <th>Description</th> */}
              <th>Organizer</th>
              <th>Date</th>
              <th>End Date</th>
              <th>Time</th>
              <th>Address</th>
              <th>Venue</th>
              <th>Budget</th>
              <th>Status</th>
              {/* <th>Images</th> */}
              <th>ApprovalStatus</th>
              <th>Actions</th>
             
             </tr>
          </thead>
          <tbody>
            {
              events.map((event) => (
                <tr key={event._id}>
                  <td> {event.name} </td>
                  {/* <td> {event.description} </td> */}
                  <td> {event.organizer} </td>
                  <td> {event.date}</td>
                  <td> {event.endDate}</td>
                  <td> {event.time} </td>
                  <td> {event.address}</td>
                  <td> {event.venue} </td>
                  <td> {event.budget}</td>
                  <td> {event.status}</td>
                     
                  {/* <td>
                    {event.image && <img src={`http://localhost:3001/uploads/${event.image}`} alt="Event"/>}
                  </td> */}

                  <td>{event.ApprovalStatus ? 'Approved' : 'Not Approved'}</td>
                  <td>
                    <Link to={`/event/${event._id}`} className='btn btn-primary'> View </Link>
                    <Link to={`/updateEvents/${event._id}`} className='btn btn-success'> Update </Link>
                    {/* <button className="btn btn-danger" onClick={() => handleDelete(event._id)}>delete</button> */}
                   
                  </td>

                </tr>
              ))}

           </tbody>
          </table>
        </div>
      </div>
    )
}
