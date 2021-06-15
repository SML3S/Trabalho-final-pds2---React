import React, { useState } from "react";
import * as api from "../services/Endpoints"
import NavBar from "./navbar";

const NovoUsers = () => {
    const estadoInicialUsers = {
       
        email:"",
        id: null,
        name: "",
        password: "",
        phone:""   
      
        
    };
    const [users, setUsers] = useState(estadoInicialUsers);
    const [submitted, setSubmitted] = useState(false);

    const trataCampo = (event) => {
        const { name, value } = event.target;
        setUsers({ ...users, [name]: value });
    };

    const novo = () => {
        setUsers(estadoInicialUsers);
        setSubmitted(false);
    };

    const enviarUsers = () => {
        var data = {
            email:users.email,
            name: users.name,
            password: users.password,
            phone:users.phone
        };
        console.log(data)
        api.create(`/users`, data)
            .then(response => {
                setUsers(response.data);
                console.log(response);
                
                setSubmitted(true);
                console.log(response.data);
            })
            .catch(e => { console.log(e); });
    };

    return (
        <div className="submit-form">
        <NavBar /> 
            {submitted ? (
                <div>
                    <h4>Users cadastrado com sucesso!</h4>
                    <button className="btn btn-success" onClick={novo}>Novo</button>
                </div>
            ) : (
                <div>
                    <div className="form-group">
                        <label htmlFor="nome">Nome</label>
                        <input
                            type="text"
                            className="form-control"
                            id="name"
                            required
                            value={users.name}
                            onChange={trataCampo}
                            name="name"
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="nome">Telefone</label>
                        <input
                            type="text"
                            className="form-control"
                            id="phone"
                            required
                            value={users.phone}
                            onChange={trataCampo}
                            name="phone"
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="nome">Email</label>
                        <input
                            type="text"
                            className="form-control"
                            id="email"
                            required
                            value={users.email}
                            onChange={trataCampo}
                            name="email"
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="nome">Senha</label>
                        <input
                            type="text"
                            className="form-control"
                            id="password"
                            required
                            value={users.password}
                            onChange={trataCampo}
                            name="password"
                        />
                    </div>

                    <button onClick={enviarUsers} className="btn btn-success mt-4">Cadastrar</button>
                </div>
            )}
        </div>
    );
}

export default NovoUsers;