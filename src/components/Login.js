import React, { useState, useEffect } from "react";
import * as api from "../services/Endpoints"
import {  useHistory } from "react-router-dom";


const Login = () => {

    const history = useHistory();
    
    const estadoInicialLogin = {
        email: "",
        password: ""
    };
    const [login, setLogin] = useState(estadoInicialLogin);
    const [msg, setMsg ]= useState(null);
    const [submitted, setSubmitted] = useState(false);

    const trataCampo = (event) => {
        const { name, value } = event.target;
        setLogin({ ...login, [name]: value });
    };

    const novo = () => {
        setLogin(estadoInicialLogin);
        setSubmitted(false);
    };
   
    useEffect(() => {  
        
        localStorage.clear();
        
    }, []);

    
    const enviarLogin = () => {
        if(login.email === "" || login.password === ""){
            setMsg("Preencha email e senha para continuar!") ;
        }else{
        var data = {
           email: login.email,
           password: login.password
        };
    
        console.log(data)
        api.create(`/auth/login`, data)
            .then(response => {
               setToken(response.data.token );
               console.log("login= "+localStorage.getItem("TOKEN_KEY"))            
               
            })
            .catch(e => { 
                setSubmitted(true);
                history.push("/login");
                            console.log(e); });
        }
    };


    const setToken = token => {
        
        if(token){
        localStorage.setItem("TOKEN_KEY", token);
        console.log("setToken") ;         
        history.push("/products");
        
        }else
        {
        setSubmitted(true);
        history.push("/login")
        }
    };

        
    return (

        <div className="submit-form">
            <nav className="container navbar navbar-expand navbar-dark bg-dark">
                <h1 className="navbar-brand">
                    LOGIN
            </h1>

            </nav>
            {submitted ? (
                <div>
                    <h4>Usuario não cadastrado!</h4>
                    <button className="btn btn-success" onClick={novo}>Voltar</button>
                </div>
            ) : (
                <div>
               
                    <div className="form-group">
                    <p>{msg}</p>
                        <label htmlFor="email">Email</label>
                        <input
                            type="text"
                            className="form-control"
                            id="email"
                            required
                            value={login.email}
                            onChange={trataCampo}
                            name="email"
                        />

                    </div>

                    <div className="form-group">
                        <label htmlFor="password">Password</label>
                        <input
                            type="text"
                            className="form-control"
                            id="password"
                            required
                            value={login.password}
                            onChange={trataCampo}
                            name="password"
                        />
                    </div>
                    <button type="submit" onClick={enviarLogin} className="btn btn-warning"  >Entrar</button>
                </div>
            )}
        </div>
    );
}

export default Login;