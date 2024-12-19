import React from 'react'
import logo from '../Images/logo.png'
import menu from '../Images/menu.png'
import styles from '../styles/Navbar.module.css'

const Navbar = () => {
  return (
    <>
        <div className={styles.NavbarMain}>
            <img src={logo} className={styles.NavbarMainLogo}></img>
            <p>Categories</p>
            <p>About Us</p>
            <p>Contact</p>
            <button className={styles.NavbarMainLoginButton}>Login</button>
            <button className={styles.NavbarMainSignupButton}>Sign Up</button>
            {/* <img src={menu} className={styles.NavbarMainMenu}></img> */}
        </div>
    </>
  )
}

export default Navbar