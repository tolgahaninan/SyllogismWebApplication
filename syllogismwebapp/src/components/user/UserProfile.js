import React from "react";
import Header from "../common/Header";
import Navi from "../common/Navi";
import { Fragment } from "react";
import { useState, useEffect } from "react";
import { Redirect } from "react-router-dom/cjs/react-router-dom.min";
import { connect } from "react-redux";
import axios from "axios";
import { Button } from "reactstrap";
import { getUser } from "../../redux/actions/userActions";
import "../../css/user/userProfile.css"
function UserProfile({ user, getUser }) {
  const [isLoggedIn, checkLoggedIn] = useState(false);
  const [loading, setLoading] = useState(true);

  const [userInput, setUser] = useState({
    name: "",
    email: "",
    password: "",
    error_list: [],
  });
  useEffect(() => {
    if (!localStorage.getItem("auth_token")) {
      checkLoggedIn(true);
    } else {
      checkLoggedIn(false);
    }
  }, [isLoggedIn]);

  useEffect(() => {
    getUser();
  }, []);

  useEffect(() => {
    user.status ? setLoading(false) : setLoading(true);
  }, [user, loading]);

  const submitUpdate = (e) => {
    e.preventDefault();
    const data = {
      name: userInput.name,
      password: userInput.password,
      email: userInput.email,
    };
    axios.get("/sanctum/csrf-cookie").then((res) => {
      axios.put("/api/user/profile/update", data).then((res) => {
        if (res.data.status === "200") {
          window.location.reload();
        } else {
          setUser({ ...userInput, error_list: res.data.validation_errors });
        }
      });
    });
  };
  const handleInput = (e) => {
    e.persist();
    setUser({ ...userInput, [e.target.name]: e.target.value });
  };

  if (loading) {
    return "loading";
  }

  if (!isLoggedIn) {
    return (
      <Fragment>
        <Header></Header>
      <div class="userProfileWrapper">
        <form class="userProfileUpdateForm" encType="multipart/form-data" onSubmit={submitUpdate}>
          <label>Name</label>
          <input onChange={handleInput} placeholder={user.user?user.user.name:null}type="text" name="name" />

          <label>Email</label>
          <input onChange={handleInput} placeholder={user.user?user.user.email:null} type="text" name="email" />

          <label>Password</label>
          <input onChange={handleInput} placeholder={user.user?user.user.password:null}type="text" name="password" />

          <Button color="success">Update</Button>
        </form>
        </div>
      </Fragment>
    );
  } else {
    return <Redirect to="/" />;
  }
}

function mapStateToProps(state) {
  return {
    user: state.userReducers,
  };
}

const mapDispatchToProps = {
  getUser,
};

export default connect(mapStateToProps, mapDispatchToProps)(UserProfile);
