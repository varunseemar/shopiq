import React from 'react'
import { useState ,useEffect} from 'react'
import {FetchData} from '../services/api'
import { useNavigate } from "react-router-dom";
import styles from '../styles/ProductsCrousel.module.css'

const ProductsCrousel = ({products}) => {
    const [displayedImages, setDisplayedImages] = useState([]);
    const navigate = useNavigate();

    const selectRandomImages = (productsArray) => {
        if(productsArray.length > 0){
          const randomImages = [];
          const usedIndices = new Set();
    
          while(randomImages.length < 3 && usedIndices.size < productsArray.length){
            const randomIndex = Math.floor(Math.random() * productsArray.length);
            if(!usedIndices.has(randomIndex)){
              randomImages.push(productsArray[randomIndex]);
              usedIndices.add(randomIndex);
            }
          }
          setDisplayedImages(randomImages);
        }
    };

    useEffect(() => {
        const interval = setInterval(() => {
          selectRandomImages(products);
        }, 4000);
        return () => clearInterval(interval);
    }, [products]);

    const handleImageClick = (productId) => {
        navigate(`/product/${productId}`);
    };

  return (
    <div className={styles.ProductsCrousel}>
      {displayedImages.map((product, index) =>(
        <img key={index} src={product.thumbnail} alt={`Product ${index + 1}`} className={styles.ProductsCrouselImage} onClick={() => handleImageClick(product.id)}/>
      ))}
    </div>
  )
}

export default ProductsCrousel