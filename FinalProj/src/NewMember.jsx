
import React from 'react';
import { useNavigate } from 'react-router-dom'
import SocietyReg from './SocietyReg';
import EventReg from './EventReg';
// import styles from './newMem.module.css'
import styles from "./singleEvent.module.css"

/**
 *
 */
export default function NewMember(){

      const navigate = useNavigate();

    return (
        <div className={styles.EventdivStyle}>
            <img src="/image/EventBG.png" className={styles.EventimgBox} />
            <div className={styles.EventmainDiv}>
           <h1 className={styles.Eventheading}> Welcome to Gaming Society</h1>
           <h4 className={styles.Eventheading}>Register Yourself</h4>
              <div className={styles.newMemBtns}>
              <button className={styles.newMemberBtn} onClick={() => navigate('/createSR')}>
                  Register in Society
              </button>
              <button className={styles.newMemberBtn} onClick={() => navigate('/EventReg')}>
                  Register in Events
              </button>
              </div>
           </div>
        </div>
    )


}