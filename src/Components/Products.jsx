import React from 'react'
import ProductCrousel from '../Components/ProductsCrousel'
import styles from '../styles/Products.module.css'
import { useState ,useEffect} from 'react'
import {FetchData} from '../services/api'
import cart from '../Images/cart.png'
import { useNavigate, useLocation } from 'react-router-dom'

const Product = () => {
  const [products, setProducts] = useState([]);
  const [visibleProducts, setVisibleProducts] = useState(12);
  const navigate = useNavigate();
  const location = useLocation();
  useEffect(()=>{
    const fetchProducts = async ()=>{
      try{
        const response = await FetchData();
        setProducts(response.data.products)
        // const navEntries = window.performance.getEntriesByType('navigation');
        // const reloadDetected = navEntries.length > 0 && navEntries[0].type === 'reload';
        // if(reloadDetected){
        //   window.scrollTo(0, 0);
        // }
        // else{
        //   const isBackNavigation = sessionStorage.getItem('isBackNavigation') === 'true';
        //   if(isBackNavigation){
        //     sessionStorage.removeItem('isBackNavigation');
        //     const storedVisible = sessionStorage.getItem('visibleProducts');
        //     const storedScrollPosition = sessionStorage.getItem('scrollPosition');
        //     if(storedVisible){
        //       setVisibleProducts(parseInt(storedVisible, 10));
        //     }
        //     if(!storedScrollPosition){
        //       window.scrollTo(0, 0);
        //     }
        //     else{
        //       window.scrollTo(0, parseInt(storedScrollPosition, 10));
        //     }
        //   }
        // }
        const storedVisible = sessionStorage.getItem('visibleProducts');
        const storedScrollPosition = sessionStorage.getItem('scrollPosition');

        if(storedVisible){
          setVisibleProducts(parseInt(storedVisible, 10));
        }
        if(!storedScrollPosition){
          window.scrollTo(0, 0);
        } 
        else{
          window.scrollTo(0, parseInt(storedScrollPosition, 10));
        }
      }
      catch(error){
        console.error('Error fetching products:', error);
      }
    }
    console.log("Location state on back navigation:", location.state);
    fetchProducts();
  },[])

  const handleProductClick = (productId) =>{
    const scrollPosition = window.scrollY;
    sessionStorage.setItem('visibleProducts', visibleProducts);
    // sessionStorage.setItem('isBackNavigation', 'false');
    sessionStorage.setItem('scrollPosition', scrollPosition);
    // history.pushState({}, "", `/product/${productId}`);
    navigate(`/product/${productId}`, {
      state: { visibleProducts, scrollPosition },
    });
  };

  const loadMoreProducts = () => {
    setVisibleProducts((prevVisible) => prevVisible + 12);
  };

  return (
    <div className={styles.ProductMain}>
      <div className={styles.ProductMainLeftCrousel}>
        <ProductCrousel products={products}/>
      </div>
      <div className={styles.ProductMainDiv}>
          <div className={styles.ProductGrid}>
            {products.slice(0, visibleProducts).map((product) => (
              <div key={product.id} className={styles.ProductCard} onClick={() => handleProductClick(product.id)}>
                <img src={product.thumbnail} alt={product.title} className={styles.ProductImage} />
                <h3 className={styles.ProductTitle}>{product.title}</h3>
                <div className={styles.ProductValues}>
                  <p className={styles.ProductPrice}>${product.price}</p>
                  <p className={styles.ProductRating}>⭐ {product.rating}</p>
                  <img className={styles.ProductCart} src={cart}></img>
                </div>
              </div>
            ))}
          </div>
          {visibleProducts < products.length && (
            <button onClick={loadMoreProducts} className={styles.ShowMoreButton}>
              Show More
            </button>
          )}
      </div>
      <div className={styles.ProductMainRightCrousel}>
        <ProductCrousel products={products}/>
      </div>
    </div>
  )
}

export default Product