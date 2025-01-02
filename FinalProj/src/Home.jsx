

import styles from "./home.module.css"

/**
 *
 */
export default function Home(){
   return (
    <div  className={styles.container}>
        <img  className={styles.Homeimage} src="./image/gaming.png" alt="home"/>
        <div className={styles.textOverlay}>
        <h1 className={styles.heading}> Welcome To 
            <br /> Society Management System </h1>
        <h4>Find all Events, Teams and Members at one platform </h4>
        </div>
    </div>
   )
}