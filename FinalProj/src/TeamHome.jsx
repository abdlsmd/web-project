
import styles from './testpage.module.css'

/**
 *
 */
export default function TestHome({ eventName , image}){
    return ( 
        
        <div className={styles.backimgCon}>
           <img src={image} /> 
           <div className={styles.Containerstyle}>

            
           {eventName && (
            //   <div className={styles.mainEventdiv}>
                <div className={styles.eventName}>
                   {eventName}     
                </div> 
            )}
       

        {/* {/* <div className={styles.Eventcontainer}>
            {image && (
                <div className={styles.eventImage}>
                  <img src={image} alt="Event" />
                </div>
            )}
            

            {description && (
                <div className={styles.eventDescp}>
                   {description}
                </div>

           )}
           </div> */}
            </div> 
           {/* container prop */}
        </div>
    )
}