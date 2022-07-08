import React, { useState, useEffect } from "react";
import "../../css/login.css";
import axios from "axios";
import { useHistory } from "react-router-dom";
import { Redirect } from "react-router-dom";

function Login(props) {
  const history = useHistory();
  const { toggle, isShowing, children } = props;
  const [loginInput, setLogin] = useState({
    email: '',
    password: '',
    error_list: [],
  });

  const handleInput = (e) => {
    e.persist();
    setLogin({...loginInput, [e.target.name] : e.target.value});
  };

  const loginSubmit = (e) => {
    e.preventDefault();
    const data = {
      email: loginInput.email,
      password: loginInput.password,
    };
    axios.get("/sanctum/csrf-cookie").then((response) => {
      axios.post("api/login", data).then((res) => {
        if (res.data.status === '200') {
          localStorage.setItem('auth_token',res.data.token);
          localStorage.setItem('auth_name',res.data.name);

          if(res.data.role === 'user'){
            toggle();
            window.location.reload();
          }else if (res.data.role === 'admin'){
            history.push('/admin/users');
          }
         
        } else if (res.data.status === '401'){
          console.log('Invalid Credentials.')
        } 
        else {
          setLogin({...loginInput,error_list : res.data.validation_errors});
        }
      });
    });
  };

  useEffect(() => {
    const handleEsc = (event) => {
      if (event.key === "Escape") {
        toggle();
      }
    };

    if (isShowing) {
      window.addEventListener("keydown", handleEsc);
    }

    return () => window.removeEventListener("keydown", handleEsc);
  }, [isShowing, toggle]);

  if (!isShowing) {
    return null;
  }

  return (
    <div class="loginModalWrapperBackground">
      <div class="loginModalWrapper">
        <form onSubmit={loginSubmit} class="loginModalForm">
          <button onClick={toggle} class="loginWrapperCloseButton">
            {" "}
            x{" "}
          </button>
          <input
            name="email"
            class="loginModalFormMailField"
            value={loginInput.email}
            onChange={handleInput}
            type="email"
            placeholder="email"
          />
          
          <input
            name="password"
            value={loginInput.password}
            onChange={handleInput}
            class="loginModalFormPasswordField"
            type="password"
            placeholder="password"
          />
         
          <button class="loginModalFormLoginButton">Login</button>
          <p class="loginModalFormRedirectMessage">
            Not registered? <a href="#">Create an account</a>
          </p>
        </form>
      </div>
    </div>
  );
}

export default Login;
