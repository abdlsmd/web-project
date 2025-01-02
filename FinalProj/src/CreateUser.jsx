

import React from "react";
import axios from 'axios';
import { useState } from "react";
import { useNavigate } from "react-router-dom";

/**
 *
 */
function CreateUsers () {
    const [name, setName] = useState()
    const [email, setEmail] = useState()
    const [status, setStatus] = useState()
    const [team, setTeam] = useState()
    const [role, setRole] = useState()
    const [hiringStatus, setHS] = useState()
    const navigate = useNavigate()
 
    const Submit = (e) => {
        e.preventDefault();
        axios.post("http://localhost:3001/createUser",{name, email, status, team , role, hiringStatus})
        .then(result => 
            console.log(result))
            navigate('/')
        .catch(err => console.log(err))
    }

  return (
    <div>
        <form onSubmit={Submit}>
            <h2> Add Users </h2>
            <div className="mb-2">
                <label htmlFor="">Name</label>
                <input type="text" 
                       placeholder="Enter Name"
                    onChange={(e) => setName(e.target.value)}/>
            </div>
            <div className="mb-2">
                <label htmlFor="">Email</label>
                <input type="email" placeholder="email"
                  onChange={(e) => setEmail(e.target.value)}/>
            </div>
            <div className="mb-2">
                <label htmlFor="">Status</label>
                <input type="text" placeholder="Enter Status"
                  onChange={(e) => setStatus(e.target.value)}/>
            </div>
            <div className="mb-2">
                <label htmlFor="">Team</label>
                <input type="text" placeholder="Enter Team"
                  onChange={(e) => setTeam(e.target.value)}/>
            </div>
            <div className="mb-2">
                <label htmlFor="">Role</label>
                <input type="text" placeholder="Enter Role"
                  onChange={(e) => setRole(e.target.value)}/>
            </div>
            <div className="mb-2">
                <label htmlFor="">HiringStatus</label>
                <input type="text" placeholder="Enter Status"
                  onChange={(e) => setHS(e.target.value)}/>
            </div>
            <button className="btn btn-success"> Submit </button>
        </form>
        
    </div>
  )
}

export default CreateUsers;