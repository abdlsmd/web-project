        
import React from "react"

import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import styles from "./singleEvent.module.css"


/**
 *
 */
export default function Profile(){
    //name
    //Email
    //Profile Picture
    //Role
    //phone number
    //Address
    //DOB
    //Bio
    //membership status
    //Role/responsibiities

    
    const [profile, setProfile] = useState([])

    useEffect(() => {
      const fetchProfile = async () => {
        try {
          const response = await axios.get("http://localhost:3001/Profile");
          console.log(response.data);
          setProfile(response.data);
        } catch (error) {
          console.error('Error fetching profile:', error.response ? error.response.data : error.message);
        }
      };
      fetchProfile();
    }, []);
    

   const handleDelete = (id) => {
     console.log("Deleting profile with ID:" , id)
      axios.delete('http://localhost:3001/deleteProfile/'+id)
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
            <h2 className={styles.Eventheading}>Profile List</h2>
             <Link to="/createProfile" className= "btn btn-primary"> Add </Link>
             {profile.length === 0 ? (
               <p>No Profiles found</p>
             ):(
            <table className={styles.EventTable}>
          <thead>
             <tr>
              <th>Name</th>
              <th>Email</th>
              <th>Profile Pic</th>
              <th>Role</th>
              <th>phone number</th>
              <th>Address</th>
              <th>Date Of Birth</th>
              <th>Membership status</th>
              <th>Responsibilities</th>
              <th>Actions</th>
             </tr>
          </thead>
          <tbody>
            { 
              profile.map((pro) => (
                <tr key={pro._id}>
                 
                  <td>{pro.Name}</td>
                  <td>{pro.Email}</td>
                  <td>{pro.ProfilePic}</td>
                  <td>{pro.Role}</td>
                  <td>{pro.phoneNum}</td>
                  <td>{pro.Address}</td>
                  <td>{pro.DOB}</td>
                  <td>{pro.MStatus}</td>
                  <td>{pro.Res}</td>
                 
                 
                  <td>
                  <Link to={`/updateProfile/${pro._id}`} className='btn btn-success'> Update </Link>
              
                    <button className="btn btn-danger" 
                    onClick={(e) => handleDelete(pro._id)}>Delete</button>
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
