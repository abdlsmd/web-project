

import React from 'react';
import styles from './footer.module.css'
import { FaFacebook, FaTwitter, FaInstagram } from 'react-icons/fa';

/**
 *
 */
export default function Footer(){
    return (
        <footer className={styles.footer}>
            <div className={styles.container}>
                <p>
                    {new Date().getFullYear()}
                    <br />
                    My Company. 
                    <br />
                    All rights reserved
                </p>

                <nav>
                    <a href="/privacy-policy">Privacy Policy</a>
                    <a href="/terms-of-service">Terms of Service</a>
                </nav>
                
                <div className={styles.socialIcons}>
                <p className={styles.iconsLine}> Follow Us </p>
                  
                    <a href="https://facebook.com" target="_blank" rel="noopener norefrerrer noreferrer">
                    <FaFacebook />
                    </a>
                    <a href="https://twitter.com" target="_blank" rel="noopener norefrerrer noreferrer">
                    <FaTwitter />
                    </a>
                    <a href="https://instagram.com" target="_blank" rel="noopener norefrerrer noreferrer">
                    <FaInstagram />
                    </a>
                    </div>

                </div>

        </footer>
    )
}