import React from 'react'
import styles from '../styles/HeroSection.module.css'
import { useState,useEffect } from 'react'
import banner1 from '../Images/banner1.jpg'
import banner2 from '../Images/banner2.jpg'
import banner3 from '../Images/banner3.jpg'
import banner4 from '../Images/banner4.jpg'

const HeroSection = () => {
const images = [
  banner1,
  banner2,
  banner3,
  banner4
]
const [currentIndex, setCurrentIndex] = useState(0);

const goToPrevious = ()=>{
  const isFirstSlide = currentIndex === 0;
  setCurrentIndex(isFirstSlide ? images.length - 1 : currentIndex - 1);
};

const goToNext = ()=>{
  const isLastSlide = currentIndex === images.length - 1;
  setCurrentIndex(isLastSlide ? 0 : currentIndex + 1);
};

useEffect(() =>{
  const interval = setInterval(() =>{
    goToNext();
  },4000);

  return () => clearInterval(interval);
},[currentIndex]);

  return (
    <div className={styles.HeroSectionMain}>
      <div className={styles.HeroSectionImages} style={{transform: `translateX(-${currentIndex * 100}%)`,}}>
        {images.map((image, index)=>(
          <div key={index} style={{backgroundImage: `url(${image})`, backgroundSize: 'contain',backgroundPosition: 'center',}}>
          </div>
        ))}
      </div>
      <div className={styles.HeroSectionButtons}>
        <button className={styles.prevButton} onClick={goToPrevious}>
          ❮
        </button>
        <button className={styles.nextButton} onClick={goToNext}>
          ❯
        </button>
      </div>
    </div>
  )
}

export default HeroSection