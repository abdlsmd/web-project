
import styles from "./nav.module.css"
import { useAuth } from "./AuthProvider"
import { useState } from "react";
import { Link } from "react-router-dom";

/**
 *
 */
export default function Nav(){
    const { isloggedIn, logout } = useAuth();
  
    return (

        <div className= {styles.subheader}>
              <ul className= {styles.navul}>

                  <li className= {styles.navli} ><Link to="/home">Home</Link></li>
                  <li className= {styles.navli}  ><Link to="/events">Events</Link></li>
                  <li className= {styles.navli} ><Link to="teams">Teams</Link></li>
                  <li className= {styles.navli} >
                      <div className={styles.dropdown}>
                        
                         <Link to="/role" className={styles.dropbutton}>Role</Link>
                        
                         <div className={styles.dropdownContent}>
                            <Link to="#">Option 1</Link>
                            <Link to="#">Option 2</Link>
                            <Link to="#">Option 3</Link>    
                        </div>
                      </div>
                    </li>
                  <li className= {styles.navli} ><Link to="/about">About</Link></li>
                  
                  <div className={styles.RegForm}>
                    {isloggedIn ? (
                         <li className= {styles.navli}><a href="#" onClick={logout}>Sign Out</a></li> 
                    ) : (
                        <>
                          <li className= {styles.navli}><a href="register">Sign Up</a></li>
                          <li ><Link to="/login">Log In</Link></li>
                        </>
                    )}
                  </div>
              </ul>
        </div>
    )
}