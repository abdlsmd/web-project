
   
import styles from "./eventhome.module.css"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faPlus } from "@fortawesome/free-solid-svg-icons"
import Testpage from "./Testpage"


/**
 *
 */
export default function MembereventHome(){

    return (
        <div>

         <div  className={styles.EHPrecontainer}>
            < Testpage />
              {/* <img className={styles.imgdecore} src="" alt="bgimg"/> */}
              <div className={styles.EHPretextOverlay}>
                  <div className={styles.bgheading}>
                     <h1> Events  </h1>
                     <h5> Find all the Events detail here</h5>
                   </div>
                </div>
              </div>

          <div className={styles.EHContainer}>

          {/* <div className={styles.EHcard}>
              <FontAwesomeIcon icon={faPlus} className={styles.plusIcon}/>
              <a className={styles.EventHText} href="/createEvent"> Add Event</a>
          </div> */}

          <div className={styles.EHcard}>
              <img  className={styles.EHimages} src="./image/overview2.png" alt="home"/>
              <a className={styles.EventHText} href="eventsList"> 
               Gaming Events 
              <br/> Overview</a>
          </div>

          <div className={styles.EHcard}>
              <img  className={styles.EHimages} src="./image/member.png" alt="home"/>
              <a className={styles.EventHText} href="MemEventReq"> Request Event</a>
          </div>

       </div>

       </div>
    )
   }
