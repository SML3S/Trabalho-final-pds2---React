import React, { useState } from "react";
import * as api from "../services/Endpoints";
import NavBar from "./navbar";

const NovoCategories = () => {
    const estadoInicialCategories = {
        id: null,
        name: "",
    };
    const [categories, setCategories] = useState(estadoInicialCategories);
    const [submitted, setSubmitted] = useState(false);

    const trataCampo = (event) => {
        const { name, value } = event.target;
        setCategories({ ...categories, [name]: value });
    };

    const novo = () => {
        setCategories(estadoInicialCategories);
        setSubmitted(false);
    };

    const enviarCategories = () => {
        var data = {
           name: categories.name
        };
        console.log(data)
        api.create(`/categories`, data)
            .then(response => {
                setCategories({
                    id: response.data.id,
                    name: response.data.name,
                });
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
                    <h4>Categories cadastrado com sucesso!</h4>
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
                            value={categories.name}
                            onChange={trataCampo}
                            name="name"
                        />
                    </div>

                    <button onClick={enviarCategories} className="btn btn-success mt-4">Cadastrar</button>
                </div>
            )}
        </div>
    );
}

export default NovoCategories;