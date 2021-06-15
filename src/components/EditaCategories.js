import React, { useState, useEffect } from "react";
import * as api from "../services/Endpoints"
import NavBar from "./navbar";

const EditaCategories = props => {
    const estadoInicial = {
        id: null,
        name: "",
    };

    const [categories, setCategories] = useState(estadoInicial);
    const [message, setMessage] = useState("");

    const getCategories = (id) => {
        api.get(`/categories/${id}`)
            .then(response => {
                setCategories(response.data);
                console.log(response.data);
            })
            .catch(e => {
                console.log(e);
            });
    };

    useEffect(() => {
        getCategories(props.match.params.id);
    }, [props.match.params.id]);

    const trataCampo = event => {
        const { name, value } = event.target;
        setCategories({ ...categories, [name]: value });
    };

    const atualizarCategories = () => {
        api.update(`/categories/${categories.id}`, categories)
            .then(response => {
                console.log(response.data);
                setMessage("categories atualizado!");
            })
            .catch(e => { console.log(e); });
    };

    const excluirCategories = () => {
        api.remove(`/categories/${categories.id}`)
            .then(response => {
                console.log(response.data);
                props.history.push("/categories");
            })
            .catch(e => { console.log(e); });
    };

    return (
        <div>
         <NavBar /> 
            {categories ? (
                <div className="edit-form">
                    <h4>Categories</h4>
                    <form>
                        <div className="form-group">
                            <label htmlFor="nome">Nome</label>
                            <input
                                type="text"
                                className="form-control"
                                id="nome"
                                name="nome"
                                value={categories.name}
                                onChange={trataCampo}
                            />
                        </div>
                       
                    </form>

                    <button className="btn btn-warning danger mt-3" onClick={excluirCategories}>Excluir</button>
                    <button type="submit" className="btn btn-success mt-3 mx-3" onClick={atualizarCategories}>
                        Atualizar
                    </button>
                    <p>{message}</p>
                </div>
            ) : (
                <div>
                    <br />
                    <p>Selecione um Categories ...</p>
                </div>
            )}
        </div>
    );
};

export default EditaCategories;