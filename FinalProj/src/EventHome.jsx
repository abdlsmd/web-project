
import styles from "./eventhome.module.css"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faPlus } from "@fortawesome/free-solid-svg-icons"
import Testpage from "./Testpage"


/**
 *
 */
export default function EventHome(){
    //Overview
    //Creation
    //Teams and role assignment
    //Communication and notification

    return (
        <div>

         <div  className={styles.EHPrecontainer}>
            < Testpage />
              {/* <img className={styles.imgdecore} src="" alt="bgimg"/> */}
              <div className={styles.EHPretextOverlay}>
                  <div className={styles.bgheading}>
                     <h1> Events  </h1>
                     <p> Find all the Events detail here</p>
                   </div>
                </div>
              </div>

          <div className={styles.EHContainer}>

          <div className={styles.EHcard}>
              <FontAwesomeIcon icon={faPlus} className={styles.plusIcon}/>
              <a className={styles.EventHText} href="/createEvent"> Add Event</a>
          </div>

          <div className={styles.EHcard}>
              <img  className={styles.EHimages} src="./image/overview2.png" alt="home"/>
              <a className={styles.EventHText} href="eventsList"> 
               Gaming Events 
              <br/> Overview</a>
          </div>

          <div className={styles.EHcard}>
              <img  className={styles.EHimages} src="./image/edit.png" alt="home"/>
              <a className={styles.EventHText} href="EventListUpdate"> Edit Events </a>
          </div>
          <div className={styles.EHcard}>
              <img  className={styles.EHimages} src="./image/r2.png" alt="home"/>
              <a className={styles.EventHText} href="EventApprovalList"> 
                Events Request Status
              </a>
          </div>
          <div className={styles.EHcard}>
              <img  className={styles.EHimages} src="./image/p2.png" alt="home"/>
              <a className={styles.EventHText} href="PresidentApproval"> Pending Events </a>
          </div>
          

       </div>

       </div>
    )
   }

            {/* rest of events cards
            Creation
            team assignment
            role assignment */}
            {/* <div className={styles.eventList}> */}
               {/* <div className={styles.PretextOverlay}>
                  <div className={styles.Eventcard}>
                     <img  className={styles.Eventimages} src="./image/events.png" alt="home"/>
                     <a className={styles.EventText} href="eventsList"> Events 
                      <br/> Overview</a>
                  </div> */}
                  {/* <div className={styles.Allcard}>
                  <FontAwesomeIcon icon={faPlus} className={styles.plusIcon}/>
                     add a plus sign for adding new event
                      <img  className={styles.Allimages} src="./image/events.png" alt="home"/>
                      <a className={styles.EventText} href="/createEvent"> Add Event</a>
                      add event code 
                      <Link to="/createEvent" className= "btn btn-success"> Add </Link>
                     
                   </div> */}
                   {/* <div className={styles.Allcard}>
                      <img  className={styles.Allimages} src="./image/events.png" alt="home"/>
                      <a className={styles.EventText} href="eventHome"> Update Event </a>
                   </div>
                   */}
