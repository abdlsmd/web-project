      
  import React from "react"
  import axios from "axios"
  import { useState, useEffect } from "react"
  import { useNavigate } from "react-router-dom"
  import styles from "./eventRegForm.module.css"
  import { useParams } from "react-router-dom"

/**
 *
 */
export default function UpdateSReg(){
      const {id} = useParams()
 
      const [fname, setFName] = useState("")
      const [ lname, setLName] = useState("")
      const [batch, setBatch] = useState("")
      const [degree, setDegree] = useState("")
      const [Rollnum, setRollnum] = useState("")
      const [Contact, setContact] = useState("")
      const [Team, setTeam] = useState("")
      const [PastExp, setExperience] = useState("")
      //file uploading
      const [CVimage, setCV] = useState(null)
      //selection status = boolean
      const [SelectionStatus, setSelection] = useState(false)

      const navigate = useNavigate()


      useEffect(() => {
          axios.get('http://localhost:3001/getSocieties/'+id)
          .then(result => {
            console.log(result)

            setFName(result.data.fname)
            setLName(result.data.lname)
            setBatch(result.data.batch)
            setDegree(result.data.degree)
            setRollnum(result.data.Rollnum)
            setContact(result.data.Contact)
            setTeam(result.data.Team)
            setExperience(result.data.PastExp)
            setCV(result.data.CVimage)
            setSelection(result.data.SelectionStatus)
            })
          .catch(err => console.log(err))
       
      }, [])
  
      const Update = (e) => {
        e.preventDefault();
        
        axios.put("http://localhost:3001/updateSR/"+id, 
          {
            fname,
            lname,
            batch,
            degree,
            Rollnum,
            Contact,
            Team,
            PastExp,
            CVimage, 
            SelectionStatus
          })
          .then(result => {
               console.log("Response data:", result)
               navigate('/society')
          })
        .catch(err => console.log(err))
    }
  
      
  
      return (
          <div className={styles.ERdivStyle}>
  
                   <img src="/image/EventBG.png" className={styles.ERimgBox} />
            <div className={styles.ERmainDiv}>
             <form onSubmit={Update}>
              <h2 className={styles.ERheading}> Update Society Reg </h2>
  
              <div className={styles.ERinputGroup}>
                  <label htmlFor="" className={styles.ERlabelName}>First Name</label>
                  <input type="text" 
                         placeholder="Enter Name"
                         className="form-control"
                         value={fname}
                         onChange={(e) => setFName(e.target.value)}/>
              </div>
              <div className={styles.ERinputGroup}>
                  <label htmlFor="" className={styles.ERlabelName}>Last Name</label>
                  <input type="text" placeholder="Enter last Name"
                    value={lname}
                    onChange={(e) => setLName(e.target.value)}/>
              </div>
              <div className={styles.ERinputGroup}>
                  <label htmlFor="" className={styles.ERlabelName}> Batch </label>
                  <input type="text" placeholder="Enter batch"
                  value={batch}
                    onChange={(e) => setBatch(e.target.value)}/>
              </div>
              <div className={styles.ERinputGroup}>
                  <label htmlFor="" className={styles.ERlabelName}>Degree</label>
                  <input type="text" placeholder="Enter degree program"
                  value={degree}
                    onChange={(e) => setDegree(e.target.value)}/>
              </div>
              <div className={styles.ERinputGroup}>
                  <label htmlFor="" className={styles.ERlabelName}>Rollnum</label>
                  <input type="text" placeholder="Enter Rollnum"
                  value={Rollnum}
                    onChange={(e) => setRollnum(e.target.value)}/>
              </div>
              <div className={styles.ERinputGroup}>
                  <label htmlFor="" className={styles.ERlabelName}>Contact</label>
                  <input type="text" placeholder="Enter contact number"
                  value={Contact}
                    onChange={(e) => setContact(e.target.value)}/>
              </div>
              <div className={styles.ERinputGroup}>
               {/* choice of team selections */}
                <label htmlFor="" className={styles.ERlabelName}>Select team</label>
                <select
                   
                    value={Team}
                    
                    onChange={(e) => setTeam(e.target.value)}>
                    <option value="">Select a team</option>
                    <option value="Operations"> Operations </option>
                    <option value="Finance"> Finance</option>
                    <option value="Event Planning"> Event Planning</option>
                    <option value="Content Creation"> Content Creation</option>
                    <option value="Sponsership"> Sponsership</option>
                    <option value="Training"> Training</option>

                </select>
                
            </div>
              <div className={styles.ERinputGroup}>
                  <label htmlFor="" className={styles.ERlabelName}>Past Experience (if any) </label>
                  <input type="text" placeholder="Share your past experience"
                  value={PastExp}
                  onChange={(e) => setExperience(e.target.value)}/>
              </div>
              <div className={styles.ERinputGroup}>
                <label htmlFor="" className={styles.SSlabelName}>Upload CV </label>
                <input type="file" 
                   name = "CVimage"
                   placeholder="CV"
                  onChange={e => setCV(e.target.files[0])}/>
            </div>

            {/* should not show to newMember */}
            <div className={styles.ERinputGroup}>
                <label htmlFor="" className={styles.SSlabelName}>Selection Status </label>
                <div className={`${styles.radioButtonGroup}  ${styles.SSLabel}`}>
                  <label className={styles.radioButtonGroup}>
                    <input type="radio"
                           value={true}
                           checked={SelectionStatus === true}
                           onChange={() => setSelection(true)}/>
                           Yes
                  </label>
                  <label className={styles.radioButtonGroup}>
                    <input type="radio"
                           value={false}
                           checked={SelectionStatus === false}
                           onChange={() => setSelection(false)}/>
                           No
                  </label>
                </div>
          </div>
             
              
              <button className={styles.ERBtn}> Update </button>
          </form>
          </div>
      </div>    
      )
  }

