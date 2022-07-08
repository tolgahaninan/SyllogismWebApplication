import React, { Fragment } from "react";
import { Link } from "react-router-dom";
import Login from "./Login";
import Register from "./Register";
import UseModal from "../helper/UseModal";
import "../../css/header.css";
import "../../css/common.css";
import { useState, useEffect } from "react";
import axios from "axios";
import { Redirect } from "react-router-dom";
import { getSiteInfo } from "../../redux/actions/adminActions";
import { connect } from "react-redux";
function Header({ siteInfo, getSiteInfo }) {
  const [isShowingLoginModal, toggleLoginModal] = UseModal();
  const [isShowingRegisterModal, toggleRegisterModal] = UseModal();
  const [isLoggedIn, checkLoggedIn] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getSiteInfo();
  }, []);

  useEffect(() => {
    siteInfo.status ? setLoading(false) : setLoading(true);
  }, [siteInfo, loading]);

  const logoutSubmit = (e) => {
    e.preventDefault();

    axios.post("/api/logout").then((res) => {
      if ((res.data.status = "200")) {
        localStorage.removeItem("auth_token");
        localStorage.removeItem("auth_name");
        window.location.reload();
      }
    });
  };
  var AuthButtons = "";
  useEffect(() => {
    if (!localStorage.getItem("auth_token")) {
      checkLoggedIn(true);
    } else {
      checkLoggedIn(false);
    }
  }, [isLoggedIn]);

  if (loading) {
    return "loading";
  }
  return (
    <Fragment>
      <Login isShowing={isShowingLoginModal} toggle={toggleLoginModal}></Login>
      <Register
        isShowing={isShowingRegisterModal}
        toggle={toggleRegisterModal}
      ></Register>

      <div class="headerWrapper">
      
        <div class="headerTopSection">
          <div class="headerTopLeft">
            <ul class="headerTopLeftContact">
              <li class="headerTopLeftContactPhone">
                <i class="fa fa-phone"></i>
                {siteInfo.info?siteInfo.info[0].phone:null}
              </li>
              <li class="headerTopLeftContactMail">
                <i class="fa fa-envelope-o"></i>
                {siteInfo.info?siteInfo.info[0].email:null}
              </li>
              <li class="headerTopLeftContactAddress">
                <i class="fa fa-map-marker"></i>
                {siteInfo.info?siteInfo.info[0].location:null}
              </li>
            </ul>
          </div>
          <div class="headerTopRight">
            {}
            {isLoggedIn ? (
              <ul class="headerTopRightUser">
                <li
                  onClick={toggleRegisterModal}
                  class="headerTopRightRegister"
                >
                  <i class="fa fa-user" aria-hidden="true"></i>
                  Register
                </li>
                <li onClick={toggleLoginModal} class="headerTopRightLogin">
                  <i class="fa fa-user"></i>
                  Login
                </li>
              </ul>
            ) : (
              <ul class="headerTopRightUser">
                <li class="headerTopRightLogout">
                  <button
                    onClick={logoutSubmit}
                    type="button"
                    class="headerLogoutButton"
                  >
                    <i class="fa fa-sign-out"></i>
                    Logout
                  </button>
                </li>
              </ul>
            )}
          </div>
        </div>
        <div class="headerBottomSection">
          <div class="maxWidthWrapperRow">
            <div class="headerLogo">
             
                <Link to={"/"}  class="headerLogoText">  Syllogism.  </Link>
             
            </div>

            <div class="headerSearchBar">
              <form action="/action_page.php">
                <select class="headerSearchBarCategorySelect">
                  <option
                    class="headerSearchBarCategorySelectSingleCategory"
                    value="0"
                  >
                    All Categories
                  </option>
                  <option
                    class="headerSearchBarCategorySelectSingleCategory"
                    value="1"
                  >
                    Category 01
                  </option>
                  <option
                    class="headerSearchBarCategorySelectSingleCategory"
                    value="1"
                  >
                    Category 02
                  </option>
                </select>
                <input
                  class="headerSearchBarInputField"
                  type="text"
                  value="Search"
                />
                <input
                  class="headerSearchBarSubmitButton"
                  type="submit"
                  value="Submit"
                />
              </form>
            </div>

            {isLoggedIn ? null : (
              <div class="headerBottomButtonWrapper">
                <Link to="/user/favourites">
                  <div class="headerFavourites">
                    <i class="fa fa-heart-o"></i>
                    <span class="headerFavouritesText"> Your Favourites</span>
                  </div>
                </Link>
                <Link to="/user/profile">
                  <div class="headerCart">
                    <i class="fa fa-user"> </i>
                    <span class="headerCartText"> Your Profile </span>
                  </div>
                </Link>
              </div>
            )}
          </div>
        </div>
      </div>
    </Fragment>
  );
}

function mapStateToProps(state) {
  return {
    siteInfo: state.siteInfoReducer,
  };
}

const mapDispatchToProps = {
  getSiteInfo,
};

export default connect(mapStateToProps, mapDispatchToProps)(Header);
