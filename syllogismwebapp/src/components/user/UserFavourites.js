import React from "react";
import Header from "../common/Header";
import Navi from "../common/Navi";
import { Fragment } from "react";
import { useState,useEffect } from "react";
import { Redirect } from "react-router-dom/cjs/react-router-dom.min";
import "../../css/user/userFavourites.css"
import { Button } from "reactstrap";
import { connect } from "react-redux";
import { getLikesByUser } from "../../redux/actions/likeActions";
import axios from "axios";
import { useHistory } from "react-router-dom";

function UserFavourites({ likes, getLikesByUser}) {
  const [loading, setLoading] = useState(false);
  const [isLoggedIn, checkLoggedIn] = useState(false);
  const history = useHistory();

 
  useEffect(() => {
    getLikesByUser();
   },[]);


  useEffect(() => {
      if (!localStorage.getItem("auth_token")) {
        checkLoggedIn(true);
      } else {
        checkLoggedIn(false);
      }
    }, [isLoggedIn]);

    useEffect(() => {
  
      likes.status ? setLoading(false) : setLoading(true);
    }, [likes, loading]);


    const handleDelete = (e , id) => {
      e.preventDefault();
      axios.delete(`api/product/like/delete/${id}`).then((res) => {
        if (res.data.status === '200') {
          window.location.reload();
        } 
        else if (res.data.status === '404'){
          history.push("/404");
        }
      });
    }

    if (loading) {
      return "Loading";
    }

    if(!isLoggedIn){
      return (
          <Fragment>
            <Header></Header>
            <div class="userFavouritesWrapper">
              <h3 class="userFavouritesHeader"> Your Favourite Products</h3>
              {likes.likes?.map((likes) => (
              <div key ={likes.id}class="userFavouritesSingleFavourite">
                <img src={likes.product.image} class="userFavouritesSingleFavouriteProductImage"></img>
                <span class="userFavouritesSingleFavouriteProductCategory">{likes.product.category.name}</span>
                <a href={`/products/${likes.product.id}`} class="userFavouritesSingleFavouriteProductName">{likes.product.name}</a>
                <span class="userFavouritesSingleFavouriteProductPrice">{likes.product.selling_price} TL</span>
              
                <Button onClick={(e) => handleDelete(e , likes.product.id)} color="danger">Unlike</Button>
              
              </div>
              ))}
            </div>
      
          </Fragment>
        );
     } else {
      return <Redirect to="/" />
     }  
}

function mapStateToProps(state) {
  return {
    likes: state.likeReducers,
  };
}

const mapDispatchToProps = {
  getLikesByUser,
};

export default connect(mapStateToProps, mapDispatchToProps)(UserFavourites);

