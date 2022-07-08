import React from "react";
import "../../css/navi.css";
import { connect } from "react-redux";
import { getCategories } from "../../redux/actions/categoryActions";
import { changeCategory } from "../../redux/actions/categoryActions";
import { Link } from "react-router-dom";
import { useEffect } from "react";
import { useState } from "react";

function Navi({ categories, getCategories ,currentCategory, changeCategory }) {
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    getCategories();
  
  },[]);

  useEffect(()=>{
    categories.status?setLoading(false):setLoading(true);
  }, [categories,loading]) 

  if (loading) {
    return "Loading";
  }

  return (
    <div class="navbarWrapper">
      <ul class="navbarItemWrapper">
        {categories.category?.map((categories) => (
          <li key={categories.id} class={
              currentCategory === categories.name
              ? "navbarSingleItemActive"
              : "navbarSingleItem"
          }>
              <Link to={`/${categories.name}/products`} onClick={() => changeCategory(categories.name)} >
              {" "}
              {categories.name}{" "}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

function mapStateToProps(state) {
  return {
    currentCategory: state.changeCategoryReducer,
    categories: state.categoryReducers,
  };
}
const mapDispatchToProps = {
  changeCategory,
  getCategories,
};
export default connect(mapStateToProps, mapDispatchToProps)(Navi);
