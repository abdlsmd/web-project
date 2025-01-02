
import React from "react"

import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import styles from "./singleEvent.module.css"

/**
 *
 */
export default function SocietyRegRequest(){
    const [society, setSociety] = useState([])

    useEffect(() => {

      const fetchData = async ()=> {
         try{
           const response = await axios.get('http://localhost:3001/getSocieties');
           const disapprovedSocieties = response.data.filter(society => society.SelectionStatus === false);
           setSociety(disapprovedSocieties);

         }catch(error) {
            console.error('Error fetching data', error)
         }
      }
      fetchData();
    }, [])

    const handleApprove = (id) => {
      
       axios.put('http://localhost:3001/updateSR/'+id, { SelectionStatus: true})
       .then(res => {
          console.log('Approved', res.data);
          setSociety(prevSociety => 
            prevSociety.filter(sreg => sreg._id !== id)
            )
    })
       .catch(err => console.log(err));
    }

    const handleDisapprove = (id) => {
        
         axios.put('http://localhost:3001/updateSR/'+id, { SelectionStatus: false})
         .then(res => {
            console.log('Disapproved', res.data);
            setSociety(prevSociety => 
              prevSociety.map(sreg => 
                  sreg._id === id ? { ...sreg, SelectionStatus: false } : sreg
              )
            )
          })
         .catch(err => console.log(err));
      }

    const handleDelete = (id) => {
        console.log("Deleting event with ID:", id);
        axios.delete('http://localhost:3001/deleteSR/' + id)
            .then(res => {
                console.log(res);
                setSociety(society.filter(sreg => sreg._id !== id));
            })
            .catch(err => console.log(err));
    }


    return (
        <div className={styles.EventdivStyle}>
          <img src="./image/EventBG.png" className={styles.EventimgBox} />
            <div className={styles.EventmainDiv}>
            <h2 className={styles.Eventheading}>Society Members List</h2>
            
             {society.length === 0 ? (
               <p>No society Registration Request found</p>
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
                  <td>
                  {/* <Link to={`/updateSR/${sreg._id}`} className='btn btn-success'> Update </Link> */}
              
                  {/* <td>
                  <Link to={`/event/${sreg._id}`} className='btn btn-primary'> View </Link>
                  </td>
                   */}
                    <button className="btn btn-success" 
                    onClick={(e) => handleApprove(sreg._id)}
                    // disabled={sreg.SelectionStatus === true}
                    >
                        Approve
                    </button>
                    <button className="btn btn-danger" 
                    onClick={(e) => handleDisapprove(sreg._id)}
                    // disabled={sreg.SelectionStatus === false}
                    >
                        Disapprove
                    </button>
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
