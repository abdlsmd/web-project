


import React from "react"

import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import styles from "./about.module.css"

/**
 *
 */
export default function About(){
   
    return (
        <div className={styles.AboutdivStyle}>
          <img src="./image/8.png" className={styles.AboutimgBox} />
            <div className={styles.AboutmainDiv}>
            <h2 className={styles.Aboutheading}>🎮 Welcome to GameOn Society 🚀</h2>
             {/* <Link to="/createEvent" className= "btn btn-success"> Add </Link> */}
           <p>
           
            Dive into the ultimate hub for gaming enthusiasts, where passion meets organization. 
            At GameOn Society, we believe in creating more than just a gaming community – we’re building a vibrant, interactive, 
            and well-managed environment for gamers of all stripes. 🎉
            <br/>

            Whether you’re organizing epic tournaments 🏆, managing teams 🕹️, or coordinating events 🎯, 
            GameOn Society has you covered. With our intuitive tools and features, you can easily handle registrations, 
            track progress, and communicate seamlessly with your members. 🛠️
            <br/>

            Our mission is to elevate your gaming society experience, making it easier than ever to connect, 
            compete, and celebrate your love for gaming. Join us at GameOn Society, where every game is a new adventure and 
            every member is a valued player. 🌟
            <br/>

            Level up your society management and let the games begin! 🎮🔥</p>
        </div>
      </div>
    )
}
