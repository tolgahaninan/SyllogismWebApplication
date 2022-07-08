import React, { Fragment } from "react";
import "../../css/index.css";
import laptopImg from "../../assets/laptop.jpg";
import { connect } from "react-redux";

import { Link } from "react-router-dom";
import axios from "axios";
import { getFeaturedCategories } from "../../redux/actions/featuredCategoryActions";
import { useState } from "react";
import { useEffect } from "react";

function IndexFeaturedCategories({
  featuredCategories,
  getFeaturedCategories,
}) {
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    getFeaturedCategories();
  }, []);

  useEffect(() => {
    featuredCategories.status ? setLoading(false) : setLoading(true);
  }, [featuredCategories, loading]);

  if (loading) {
    return "Loading";
  }

  return (
  
    
    <div class="IndexFeaturedCategoriesWrapper">
     <h3 class="indexFeaturedProductsSliderTopMenuText">
          Recomended Categories
        </h3>
        
      {featuredCategories.featuredCategories?.map((featuredCategories) => (
        
        <div key={featuredCategories.id}class="indexSingleFeaturedCategory">
        <Link  to={`${featuredCategories.name}/products/` }>
          <img class="indexSingleFeaturedCategoryImg" src={featuredCategories.image}></img>
          </Link>
        </div>
        
      ))}
    </div>
  
  );
}

function mapStateToProps(state) {
  return {
    featuredCategories: state.featuredCategoryReducers,
  };
}

const mapDispatchToProps = {
  getFeaturedCategories,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(IndexFeaturedCategories);
