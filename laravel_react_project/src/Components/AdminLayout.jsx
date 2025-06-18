import axios from "axios";
import { useEffect } from "react";
import { useContext } from "react";
import { Navigate, Outlet, Link } from "react-router-dom";
import axiosClient from "../axiosClient";
import { useStateContext } from "../contexts/contextprovider";



export default function AdminLayout(){

  const {user, token, setUser, setToken} = useStateContext() ;

  if(!token){
    return <Navigate to='/login'/>
  }

    if(user.role === "customer"){
      return <Navigate to='/home'/>
    }
    
    const onLogout =  (ev) =>{
      ev.preventDefault();
      axiosClient.get('/logout')
      .then(({}) => {
        setUser(null)
        setToken(null)
      })
  }

  useEffect(() => {
      axiosClient.get('/user')
        .then(({data}) => {
          setUser(data)
        })
    }, [])

  return(
      <div id="defaultLayout">
          <div className="content">
            <header>
              <div className="logo">Dern-Support</div>
              <nav>
                <Link to="/admin/dashboard">Dashboard</Link>
                <Link to="/admin/technicals">Technicians</Link>
                <Link to="#" onClick={onLogout} className="btn-logout">Logout</Link>
              </nav>
            </header>
            <main>
            <Outlet />
            </main>
          </div>
      </div>
  )
}