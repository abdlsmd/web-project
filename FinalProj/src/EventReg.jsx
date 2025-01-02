
import React from "react"

import { useState, useEffect } from "react";
import { Link, Navigate } from "react-router-dom";
import axios from "axios";
import styles from "./singleEvent.module.css"

/**
 *
 */
export default function EventReg(){


    const [events, setEvents] = useState([])

    useEffect(() => {
       axios.get('http://localhost:3001/events')
       .then(result => setEvents(result.data))
       .catch(err => console.log(err))
    }, [])


    //if approval status is true then display
    return (
        <div className={styles.EventdivStyle}>
          <img src="./image/EventBG.png" className={styles.EventimgBox} />
            <div className={styles.EventmainDiv}>
            <h2 className={styles.Eventheading}>Events List</h2>
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
              <th>Approval
                <br/> Status
              </th>
              <th>Images</th>
              <th>Actions</th>

             </tr>
          </thead>
          <tbody>
            {
              events.filter((event) =>  event.ApprovalStatus).map((event) =>(
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

                  {/* If status is approved then show the evnt on this page else dont show it */} 
                  <td>{event.ApprovalStatus ? 'Approved' : 'Not Approved'}</td>

                  <td>
                    {event.image && <img src={`http://localhost:3001/uploads/${event.image}`} alt="Event"/>}
                  </td>
                  <td>
                       <Link to={`/event/${event._id}`} className='btn btn-primary'> View </Link>
                       <Link to={`/EventRegForm/${event._id}`} className='btn btn-success'> Register </Link>
                    {/* <button className="btn btn-danger" onClick={() => handleRegistration(event._id)}>Register</button> */}
                  </td>

                </tr>
              ))}

           </tbody>
          </table>
        </div>
      </div>
    )
}
