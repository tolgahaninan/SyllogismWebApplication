import React from "react";
import sliderImg from "../../assets/laptop.jpg";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import { Autoplay, Pagination, Navigation } from "swiper";
import { connect } from "react-redux";
import { getFeaturedProducts } from "../../redux/actions/featuredProductActions";
import { useState } from "react";
import { useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

function IndexFeaturedProductsSlider({
 
  isShowingCompareModal,
  toggleCompareModal,
  featuredProducts,
  getFeaturedProducts,
  comparedProductLength,
  setComparedProductLength, 
  comparedProducts,
  setComparedProducts,
}) {
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    getFeaturedProducts();
  }, []);

  useEffect(() => {
    if(comparedProductLength===2){
      toggleCompareModal()
    }
  }, [comparedProductLength]);

  useEffect(() => {
    featuredProducts.status ? setLoading(false) : setLoading(true);
  }, [featuredProducts, loading]);

  const handleCompare = (e , featuredProducts) => {
    e.persist();
   
    if (comparedProductLength<2){
      setComparedProducts(comparedProducts => [...comparedProducts, featuredProducts]);
      setComparedProductLength(comparedProductLength+1)

    }else {
      setComparedProductLength(0)
      setComparedProducts([]);
      setComparedProducts(comparedProducts => [...comparedProducts, featuredProducts]);
      setComparedProductLength(1)
    }
    console.log(comparedProductLength)
    console.log(comparedProducts);
    
  }

  if (loading) {
    return "Loading";
  }
  return (
    <div class="indexFeaturedProductsSliderWrapper">
      <div class="indexFeaturedProductsSliderTopMenu">
        <h3 class="indexFeaturedProductsSliderTopMenuText">
          Recomended Products
        </h3>

        <ul class="indexFeaturedProductsSliderCategories">
          <li class="indexFeaturedProductsSliderSingleCategory"> Laptops</li>
          <li class="indexFeaturedProductsSliderSingleCategory">
            {" "}
            Smartphones{" "}
          </li>
          <li class="indexFeaturedProductsSliderSingleCategory"> Cameras </li>
          <li class="indexFeaturedProductsSliderSingleCategory">
            {" "}
            Accessories
          </li>
        </ul>
      </div>

      <Swiper
        slidesPerView={4}
        spaceBetween={45}
        loop={true}
        loopFillGroupWithBlank={true}
        autoplay={{
          delay: 3000,
          disableOnInteraction: false,
        }}
        navigation={true}
        modules={[Navigation, Autoplay]}
        className="IndexFeaturedProductsSlider"
      >
        {featuredProducts.featuredProducts?.map((featuredProducts) => (
          <SwiperSlide key={featuredProducts.id}>
            <div class="indexFeaturedProductsSliderSingleSlideWrapper">
              <img
                class="indexFeaturedProductsSliderImg"
                src={featuredProducts.image}
              ></img>
              <span class="indexFeaturedProductsSliderSingleSlideCategory">
                {featuredProducts.category.name}
              </span>
              <span class="indexFeaturedProductsSliderProductName">
                {featuredProducts.name}
              </span>
              <span class="indexFeaturedProductsSliderProductPrice">
                {" "}
                {featuredProducts.selling_price} TL
              </span>
              <hr class="indexFeaturedProductsSliderLine"></hr>

              <div class="indexFeaturedProductsSliderSingleSlideOptions">
                <button
                  onClick={e => handleCompare(e,featuredProducts)}
                  class="indexFeaturedProductsSliderSingleSlideCompareButton"
                >
                  <i class="fa fa-exchange"></i>
                </button>
                <Link to={`/products/${featuredProducts.id}`}>
                  <button class="indexFeaturedProductsSliderSingleSlideViewButton">
                    <i class="fa fa-eye"></i>
                  </button>
                </Link>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}

function mapStateToProps(state) {
  return {
    featuredProducts: state.featuredProductReducers,
  };
}

const mapDispatchToProps = {
  getFeaturedProducts,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(IndexFeaturedProductsSlider);
