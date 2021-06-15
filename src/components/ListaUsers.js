import React, { useState, useEffect } from "react";
import * as api from "../services/Endpoints"
import { Link } from "react-router-dom";
import NavBar from "./navbar";

const ListaUsers = () => {
    const [users, setUsers] = useState([]);
    const [usersSelecionado, setUsersSelecionado] = useState(null);
    const [currentIndex, setCurrentIndex] = useState(-1);

    
    useEffect(() => {  
        console.log("lista user= "+localStorage.getItem("TOKEN_KEY"))      
        buscaUsers();
    }, []);

    const buscaUsers = () => {
        api.getAll("/users")
            .then(response => {
                setUsers(response.data);
                console.log(response.data);
            })
            .catch(e => {
                console.log(e);
            });
    };

    const setUsersAtivo = (users, index) => {
        setUsersSelecionado(users);
        setCurrentIndex(index);
    };

    return (
        <div className="container list row">
        <NavBar /> 
            <div className="col-md-6">
                <h4>Usuarios</h4>
            
                <ul className="list-group py-1">
                    {users &&
                        users.map((users, index) => (
                            <li  className={"list-group-item " + (index === currentIndex ? "active" : "")}
                                 onClick={() => setUsersAtivo(users, index)}
                                 key={index}
                            >{users.name}</li>
                        ))}
                </ul>
            </div>


            <div className="col-md-6">
                {usersSelecionado ? (
                    <div>
                        <h4>Detalhe</h4>
                        <div>
                            <label>
                                <strong>Nome:</strong>
                            </label>{" "}
                            {usersSelecionado.name}
                        </div>
                        <div>
                            <label>
                                <strong>Email:</strong>
                            </label>{" "}
                            {usersSelecionado.email}
                        </div>
                        <div>
                            <label>
                                <strong>Telefone:</strong>
                            </label>{" "}
                            {usersSelecionado.phone}
                        </div>
                        
                        <Link to={"/users/" + usersSelecionado.id} className="btn btn-warning">Editar</Link>
                    </div>
                ) : (
                    <div>
                        <br />
                        <p>Escolha uma usuario ...</p>
                    </div>
                )}
            </div>
        </div>
    );
};

export default ListaUsers;