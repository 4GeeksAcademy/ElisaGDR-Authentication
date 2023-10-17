import React, { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { Context } from "../store/appContext";


export const Login = () => {
  const { store, actions } = useContext(Context);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();

  const handleLogin = (event) => {
    event.preventDefault();
    console.log("function handleLogin");
    actions.login(email, password);
    if (store.isLogin) {
      navigate('/demo');
    } else {
      navigate('/login');
    }
  }

  return (
    <div className="text-center mt-5">
      <h1>Bienvenido</h1>
      <div className="container mb-3">
        <form onSubmit={handleLogin}>
          <div className="row mb-3">
            <label htmlFor="inputEmail3" className="col-md-4 col-sm-2 text-end col-form-label">Email</label>
            <div className="col-md-4 col-sm-10">
              <input type="email" className="form-control" id="inputEmail3"
                onChange={(event) => setEmail(event.target.value)} />
            </div>
          </div>
          <div className="row mb-3">
            <label htmlFor="inputPassword3" className="col-md-4 col-sm-2 text-end col-form-label">Password</label>
            <div className="col-md-4 col-sm-10">
              <input type="password" className="form-control" id="inputPassword3"
                onChange={(event) => setPassword(event.target.value)} />
            </div>
          </div>
          <button type="submit" className="btn btn-primary">Sign in</button>
          {/*
          <button onClick={login} className="btn btn-primary">Sign in</button>
          <button type="submit">Click me!</button> 
          */}
        </form>
      </div>

      <div className="alert alert-info">
        {store.message || "Loading message from the backend (make sure your python backend is running)..."}
      </div>
    </div>
  )
}
