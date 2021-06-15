import React, { useState, useEffect } from "react";
import * as api from "../services/Endpoints";
import NavBar from "./navbar";

const EditaUsers = props => {
    const estadoInicial = {
        id: null,
        name: "",
        email:"",
        phone:""
    };

    const [users, setUsers] = useState(estadoInicial);
    const [message, setMessage] = useState("");

    const getUsers = (id) => {
        api.get(`/users/${id}`)
            .then(response => {
                setUsers(response.data);
                console.log(response);
            })
            .catch(e => {
                console.log(e);
            });
    };

    useEffect(() => {
        getUsers(props.match.params.id);
    }, [props.match.params.id]);

    const trataCampo = event => {
        const { name, value } = event.target;
        setUsers({ ...users, [name]: value });
    };

    const atualizarUsers = () => {
        api.update(`/users/${users.id}`, users)
            .then(response => {
                console.log(response.data);
                setMessage("Users atualizado!");
            })
            .catch(e => { console.log(e); });
    };

    const excluirUsers = () => {
        api.remove(`/users/${users.id}`)
            .then(response => {
                console.log(response.data);
                props.history.push("/users");
            })
            .catch(e => { console.log(e); });
    };

    return (
        <div>
        <NavBar /> 
            {users ? (
                <div className="edit-form">
                    <h4>Usuario</h4>
                    <form>
                        <div className="form-group">
                            <label htmlFor="nome">Nome</label>
                            <input
                                type="text"
                                className="form-control"
                                id="nome"
                                name="nome"
                                value={users.name}
                                onChangeText={trataCampo}
                                
                            />
                        </div>
                        <div className="form-group">
                            <label htmlFor="nome">Email</label>
                            <input
                                type="text"
                                className="form-control"
                                id="email"
                                name="email"
                                value={users.email}
                                onChange={trataCampo}
                            />
                            </div>
                            <div className="form-group">
                            <label htmlFor="nome">Telefone</label>
                            <input
                                type="text"
                                className="form-control"
                                id="phone"
                                name="phone"
                                value={users.phone}
                                onChange={trataCampo}
                            />
                        </div>
                       
                    </form>

                    <button className="btn btn-warning danger mt-3" onClick={excluirUsers}>Excluir</button>
                    <button type="submit" className="btn btn-success mt-3 mx-3" onClick={atualizarUsers}>
                        Atualizar
                    </button>
                    <p>{message}</p>
                </div>
            ) : (
                <div>
                    <br />
                    <p>Selecione um Usuario ...</p>
                </div>
            )}
        </div>
    );
};

export default EditaUsers;