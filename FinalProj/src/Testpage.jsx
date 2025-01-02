

import styles from './testpage.module.css'

/**
 *
 */
export default function Testpage({ eventName , description , image}){
    return ( 
        
        <div className={styles.backimgCon}>
           <img src="/image/Deep Blue.png"  /> 
           <div className={styles.Containerstyle}>

            
           {eventName && (
            //   <div className={styles.mainEventdiv}>
                <div className={styles.eventName}>
                   {eventName}     
                </div> 
            )}
       

        <div className={styles.Eventcontainer}>
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
           </div>
           </div>
           {/* container prop */}
        </div>
    )
}