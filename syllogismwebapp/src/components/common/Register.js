import React, { useState, useEffect } from "react";
import "../../css/register.css";
import axios from "axios";
import { useHistory } from "react-router-dom";

function Register(props) {
  const history = useHistory();
  const { toggle, isShowing, children } = props;
  const [registerInput, setRegister] = useState({
    name:'',
    email:'',
    password:'',
    error_list:[]

  });

 
  const handleInput = (e) => {
    e.persist();
    setRegister({...registerInput, [e.target.name] : e.target.value});
  }

  const registerSubmit = (e) => {
    e.preventDefault();
    const data = {
      name : registerInput.name,
      password : registerInput.password,
      email : registerInput.email,
    }
    axios.get('/sanctum/csrf-cookie').then(res => {
      axios.post('/api/register' , data).then(res => {
        if(res.data.status==='200'){
          localStorage.setItem('auth_token',res.data.token);
          localStorage.setItem('auth_name',res.data.name);
          window.location.reload();
        }
        else {
          setRegister({...registerInput,error_list : res.data.validation_errors});
        }
      });
  });
    


  }

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
    <div class="registerModalWrapperBackground">
      <div class="registerModalWrapper">
        <form  onSubmit={registerSubmit} class="registerModalForm">
          <button onClick={toggle} class="registerWrapperCloseButton">
            {" "}
            x{" "}
          </button>
          <input
            class="registerModalFormUsernameField"
            name="name"
            value={registerInput.name}
            onChange={handleInput}
            type="text"
            placeholder="username"
          />
          
            <input
            name="email"
            class="registerModalFormMailField"
            value={registerInput.email}
            onChange={handleInput}
            type="email"
            placeholder="email"
          />
          
          <input
            name="password"
            class="registerModalFormPasswordField"
            value={registerInput.password}
            onChange={handleInput}
            type="password"
            placeholder="password"
          />
      
        
          <button  class="registerModalFormCreateButton">
            Create
          </button>
          <p class="registerModalFormRedirectMessage">
            Already registered? <a href="#">Sign In</a>
          </p>
        </form>
      </div>
    </div>
  );
}

export default Register;
