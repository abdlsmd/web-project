
import React ,{ useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";

/**
 *
 */
function UpdateUsers () {

    const { id } = useParams()
    console.log("here is id",id);

    const [name, setName] = useState()
    const [email, setEmail] = useState()
    const [status, setStatus] = useState()
    const [team, setTeam] = useState()
    const [role, setRole] = useState()
    const [hiringStatus, setHS] = useState()
    const navigate = useNavigate()

    
    useEffect(() => {
        axios.get('http://localhost:3001/getUser/'+ id)
        .then(result => {

            console.log(result)
            setName(result.data.name)
            setEmail(result.data.email)
            setStatus(result.data.status)
            setTeam(result.data.team)
            setRole(result.data.role)
            setHS(result.data.hiringStatus)
            
        })
        .catch(err => console.log(err))
  
      },[]) 

      const Update = (e) => {
          e.preventDefault();
          axios.put("http://localhost:3001/updateUser/"+id,
            {name, email, status, team , role, hiringStatus})
          .then(result => {
              console.log(result)
              navigate('/')
          })
          .catch(err => console.log(err))
      }


  return (
    <div>
    <form onSubmit={Update}>
        <h2> Update Users </h2>
        <div>
            <label htmlFor="">Name</label>
            <input type="text" placeholder="Enter Name"
            value = {name}  
             onChange={(e) => setName(e.target.value)}
            />
        </div>
        <div>
            <label htmlFor="">Email</label>
            <input type="email" placeholder="email"
            value = {email}   
            onChange={(e) => setEmail(e.target.value)}
            />
        </div>
        <div>
            <label htmlFor="">Status</label>
            <input type="text" placeholder="Enter Status"
            value = {status}   
            onChange={(e) => setStatus(e.target.value)}
            />
        </div>
        <div>
            <label htmlFor="">Team</label>
            <input type="text" placeholder="Enter Team"
            value = {team}  
             onChange={(e) => setTeam(e.target.value)}
            />
        </div>
        <div>
            <label htmlFor="">Role</label>
            <input type="text" placeholder="Enter Role"
            value = {role}   onChange={(e) => setRole(e.target.value)}
            />
        </div>
        <div>
            <label htmlFor="">HiringStatus</label>
            <input type="text" placeholder="Enter Status"
            value = {hiringStatus}    
            onChange={(e) => setHS(e.target.value)}
            />
        </div>
        <button className="btn btn-success"> Update </button>
    </form>
    
</div>
  )
}

export default UpdateUsers;