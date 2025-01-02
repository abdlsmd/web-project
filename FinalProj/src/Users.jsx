import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import styles from "./userButton.module.css"

import React from "react";
import axios from "axios";

/**
 *
 */
function Users () {
    const [user, setUsers] = useState([])


    useEffect(() => {
      axios.get('http://localhost:3001')
      .then(result => setUsers(result.data))
      .catch(err => console.log(err))

    },[]) 

    const handleDelete = (id) =>{
        axios.delete('http://localhost:3001/deleteUser/'+id)
        .then(res => 
        {console.log(res)
         setUsers(users.filter(user => user._id !== id));
        })
        .catch(err => console.log(err))
    }


  return (
    <div>
        <Link to="/create" className={styles.Addbutton}> Add </Link>
         <table>
          <thead>
             <tr>
              <th>Name</th>
              <th>Email</th>
              <th>Status</th>
              <th>Team</th>
              <th>Role</th>
              <th>Hiring Status</th>
             </tr>
          </thead>
          <tbody>
            {
              user.map((user) => (
                <tr key={user._id}>
                  <td> {user.name} </td>
                  <td> {user.email}</td>
                  <td> {user.status}</td>
                  <td> {user.team}</td>
                  <td> {user.role} </td> 
                  <td> {user.hiringStatus}</td>

                  <td>
                  <Link to={`/update/${user._id}`} className='btn btn-success'> Update </Link>
                    <button className="btn btn-danger" onClick={(e) => handleDelete(user._id)}>delete</button>
                  </td>

                </tr>
              ))
            }

          </tbody>
        </table>
     </div>

  )
}

export default Users;