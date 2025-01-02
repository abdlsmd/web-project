
import React from "react"

import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import styles from "./singleEvent.module.css"

/**
 *
 */
export default function SocietyReg(){
    const [society, setSociety] = useState([])

    useEffect(() => {

      const fetchData = async ()=> {
         try{
           const response = await axios.get('http://localhost:3001/getSocieties');
           setSociety(response.data);

         }catch(error) {
            console.error('Error fetching data', error)
         }
      }
      fetchData();
    }, [])

    const handleDelete = (id) => {
      console.log("Deleting event with ID:" , id)
       axios.delete('http://localhost:3001/deleteSR/'+id)
       .then(res => {
          console.log(res);
          window.location.reload();
        })
       .catch(err => console.log(err));
    }


    return (
        <div className={styles.EventdivStyle}>
          <img src="./image/EventBG.png" className={styles.EventimgBox} />
            <div className={styles.EventmainDiv}>
            <h2 className={styles.Eventheading}>Society Members List</h2>
             <Link to="/createSR" className= "btn btn-success"> Add </Link>
             {society.length === 0 ? (
               <p>No society members found</p>
             ):(
            <table className={styles.EventTable}>
          <thead>
          <tr>
              <th>First Name</th>
              <th>Last Name</th>
              <th>Batch</th>
              <th>Degree</th>
              <th>Rollnum</th>
              <th>Contact</th>
              <th>Team</th>
              <th>PastExp</th>
              <th>SelectionStatus</th>
              {/* <th>CVimage</th> */}
              {/* <th>CVimage</th>
              <th>SelectionStatus</th> */}
              <th>Actions</th>
             </tr>
          </thead>
          <tbody>
            { 
              society.map((sreg) => (
                <tr key={sreg._id}>
                  <td> {sreg.fname} </td>
                  <td> {sreg.lname} </td>
                  <td> {sreg.batch} </td>
                  <td> {sreg.degree} </td>
                  <td> {sreg.Rollnum} </td>
                  <td> {sreg.Contact} </td>
                  <td> {sreg.Team} </td>
                  <td> {sreg.PastExp} </td>
                  <td> {sreg.SelectionStatus ? 'Selected' : 'Not Selected'}</td> 
                  {/* <td> {sreg.CVimage} </td>*/}
                  {/* <td>
                    {sreg.image && <img src={`http://localhost:3001/uploads/${sreg.image}`} alt="Society"/>}
                  </td> */}
                  <td>
                  <Link to={`/updateSR/${sreg._id}`} className='btn btn-success'> Update </Link>
              
                  {/* <td>
                  <Link to={`/event/${sreg._id}`} className='btn btn-primary'> View </Link>
                  </td>
                   */}
                    <button className="btn btn-danger" 
                    onClick={(e) => handleDelete(sreg._id)}>Delete</button>
                  </td>

                </tr>
              ))
            }

           </tbody>
          </table>
             )}
        </div>
      </div>
    )
}
