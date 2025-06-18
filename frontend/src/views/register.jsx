import axios from "axios";
import { useRef } from "react";
import { Link } from "react-router-dom";
import axiosClient from "../axiosClient";
import { useStateContext } from "../contexts/contextprovider";

export default function register(){

    const nameRef = useRef();
    const emailRef = useRef();
    const passwordRef = useRef();
    const roleRef = useRef();

    const {setUser, setToken} = useStateContext();

    const Submit =  (ev) =>{
        ev.preventDefault();
        const payload = {
            name: nameRef.current.value,
            email: emailRef.current.value,
            password: passwordRef.current.value,
            role: roleRef.current.value,
        }
        axiosClient.post("/register",payload).then(({data})=>{
          setUser(data.user);
          setToken(data.token);
          console.log(data)
    }).catch(err => {
        const response = err.response;
        if(response && response.status === 422){
            console.log(response.data.errors);
        }
    });
}

    return(
        <div className="login-signup-form animated fadeinDown">
            <div className="form">
                <h1 className="title">
                    Create A New Account
                </h1>
                <form onSubmit={Submit}>
                    <input className="mt-3" ref={nameRef} type="name" placeholder="Name" />
                    <input className="mt-3" ref={emailRef} type="email" placeholder="Email" />
                    <input className="mt-3" ref={passwordRef} type="password" placeholder="Password" />
                    <select
                      id="roleSelect"
                      className="select mt-3"
                      ref={roleRef} 
                      defaultValue="" 
                    >
                      <option value="" disabled>
                        Choose a role
                      </option>
                      <option value="customer">Customer</option>
                      <option value="technical">technical</option>
                    </select>
                    <button className="button button-block">Register</button>
                    <p className="message">
                        Already Have An Account? <Link to= '/login'>Login</Link>
                    </p>
                </form>
            </div>
        </div>
    )
}