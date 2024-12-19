import React, { useState, useEffect } from 'react';
import styles from '../styles/Product.module.css'
import Navbar from '../Components/Navbar'
import { Navigate, useNavigate, useParams } from 'react-router-dom';
import { FetchProductData } from '../services/api';
import cart from '../Images/cart.png'

const Product = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const navigate = useNavigate();

  // useEffect(() => {
  //   const handleBackNavigation = (event) => {
  //     console.log('Back button pressed');
  //     sessionStorage.setItem('isBackNavigation','true')
  //     navigate('/')
  //   };
  //   window.addEventListener('popstate', handleBackNavigation);
  //   return () => {
  //     window.removeEventListener('popstate', handleBackNavigation);
  //   };
  // }, []);

  useEffect(() =>{
    const fetchProductDetails = async () => {
      try{
        const response = await FetchProductData({id});
        setProduct(response.data);
        setLoading(false);
      } 
      catch(error){
        console.error('Error fetching product details:', error);
        setLoading(false);
      }
    };

    fetchProductDetails();
  },[id]);

  const handleNextImage = () =>{
    if(currentImageIndex < product.images.length - 1){
      setCurrentImageIndex(currentImageIndex + 1);
    }
    else{
      setCurrentImageIndex(0);
    }
  };

  const handlePrevImage = () =>{
    if(currentImageIndex > 0){
      setCurrentImageIndex(currentImageIndex - 1);
    }
    else{
      setCurrentImageIndex(product.images.length - 1);
    }
  };

  if(loading){
    return <div>Loading...</div>;
  }

  if(!product){
    return <div>Product not found!</div>;
  }

  return (
    <div>
      <div className={styles.NavbarProduct}>
        <Navbar />
      </div>
      <div className={styles.ProductPage}>
        <div className={styles.ProductLeftSection}>
          <div className={styles.ProductImageCarousel}>
            {product.images.length > 1 && <button onClick={handlePrevImage} className={`${styles.CarouselButton} ${styles.CarouselButtonLeft}`}>
              &#10094;
            </button>}
            <img src={product.images[currentImageIndex]} alt={`Product Image ${currentImageIndex + 1}`} className={styles.ProductImage}/>
            {product.images.length > 1 && <button onClick={handleNextImage} className={`${styles.CarouselButton} ${styles.CarouselButtonRight}`}>
              &#10095;
            </button>}
          </div>
        </div>
        <div className={styles.ProductRightSection}>
          <h2 className={styles.ProductTitle}>{product.title}</h2>
          <p className={styles.ProductPrice}>${product.price}</p>
          <p className={styles.ProductDescription}>{product.description}</p>
          <p className={styles.ProductRating}>Rating: ⭐ {product.rating}</p>
          <p className={styles.ProductStock}>Stock: {product.stock} units</p>
          <p className={styles.ProductCategory}>Category: {product.category}</p>
          <p className={styles.ProductBrand}>Brand: {product.brand}</p>
          <p className={styles.ProductWarranty}>Warranty: {product.warrantyInformation}</p>
          <p className={styles.ProductShipping}>Shipping: {product.shippingInformation}</p>
          <p className={styles.ProductAvailability}>Availability: {product.availabilityStatus}</p>
          <img src={cart} className={styles.AddToCartButton}></img>
          <div className={styles.ProductReviews}>
            <h3>Customer Reviews</h3>
            {product.reviews.map((review, index) => (
              <div key={index} className={styles.ProductReview}>
                <p><strong>{review.reviewerName}</strong> - Rating: {review.rating}⭐</p>
                <p>{review.comment}</p>
                <p><small>{new Date(review.date).toLocaleDateString()}</small></p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Product