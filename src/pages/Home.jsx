import React from 'react'
import styles from '../styles/Home.module.css'
import Navbar from '../Components/Navbar'
import HeroSection from '../Components/HeroSection'
import Products from '../Components/Products'

const Home = ({isMobile}) => {
  return (
    <>
        <div className={styles.Navbar}><Navbar /></div>
        <div className={styles.HeroSection}><HeroSection /></div>
        <div className={styles.Products}><Products /></div>
    </>
  )
}

export default Home