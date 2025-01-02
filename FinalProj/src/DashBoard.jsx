
import React from "react"
import styles from "./president.module.css"
import { useParams, Link } from "react-router-dom"
import { Navigate } from "react-router-dom"


const DashBoard = () => {
   
  const { userType } = useParams();

const options = {
    //Done
    President: [
      { src: "/image/cover2.png" , text: "Gaming Events", href:"/eventHome"},
      { src:"/image/newTeam.png", text: "Teams" , href: "/teams"},
      { src: "/image/GMembers.png" , text: "Members", href: "/members"},
      { src: "/image/mentor.png", text: "Exective Body", href: "/managers"},
      { src: "/image/GamingImages.png", text: "Images Gallery", href: "/PresidentGallery"},
    
    ],
    //EC
    //Done
    Manager: [
      { src: "/image/events.png" , text: "Gaming Events", href:"/eventHome"},
      { src:"/image/newTeam.png", text: "Teams" , href: "/teams"},
      { src:"/image/10.png" , text: "Society Registration Requests", href: "/SocietyRegRequest"},
      // { src: "/image/mentor.png", text: "Exective Body", href: "/managers"},
      { src: "/image/GamingImages.png" , text: "Gaming Images", href: "/MemberGallery"},

    ],
    //Done
    Member: [
       { src: "/image/cover2.png" , text: "Gaming Events", href:"/MembereventHome"},
       { src:"/image/newTeam.png", text: "Teams" , href: "/teams"},
       { src: "/image/GamingImages.png" , text: "Gaming Images", href: "/MemberGallery"},
      //  { src: "/image/7.png", text: "My Profile", href: "/MyProfilePage"}
    ],
    Mentor: [
      { src: "/image/cover2.png" , text: "Gaming Events", href:"/eventHome"},
      { src:"/image/newTeam.png", text: "Teams" , href: "/teams"},
      { src: "/image/GMembers.png" , text: "Members", href: "/members"},
      { src: "/image/mentor.png", text: "Executive Body", href: "/managers"},
      { src: "/image/GamingImages.png" , text: "Images Gallery", href: "/PresidentGallery"},
      { src: "/image/managers.png" , text: "President", href: "/President"}

    ]
}

  const userOptions = options[userType] || [];

   
     return (
        <div  className={styles.Precontainer}>
           <div className={styles.PretextOverlay}>
           {userOptions.map((option, index) => (
               <div className={styles.card} key={index}>
                    <img className={styles.images} src={option.src} alt={option.text}/>
                    <Link className={styles.PreText} to={option.href}>
                         {option.text}
                    </Link>
               </div>
           ))}
        </div>
    </div>
    )
}

export default DashBoard;