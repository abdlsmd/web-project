
import Profile from './Profile'
import SocietyReg from './SocietyRegRequest'
import Testpage from './Testpage'
import styles from "./members.module.css"
import { Link } from 'react-router-dom'

//members request
/**
 *
 */
export default function Members(){

    const cards = [
      { src: "/image/cover2.png" , text: "Society Registration Requests", href:"/SocietyRegRequest"},
      { src:"/image/newTeam.png", text: "Profiles" , href: "/Profile"}
    ]
   
    return (
        //society registration approval
        //crud
        <div>
            <Testpage />
            <div className={styles.cardContainer}>
                 {cards.map((card, index) => (
                    <div key={index} className={styles.card}>
                        <img src={card.src} alt={card.text} className={styles.cardImage} />
                        <div className={styles.cardContent}>
                            
                            
                            <Link className={styles.cardLink} to={card.href}>
                            <h3>{card.text}</h3>
                           </Link>
                        </div>
                    </div>
                 ))}
            </div>
        </div>
        // <div>
        //     <SocietyReg/>
        // </div>


        //members profile crud
        //approval
        // <div>
        //     <Profile />
        // </div>
        
    )
   
}