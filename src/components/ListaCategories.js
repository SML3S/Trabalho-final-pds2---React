import React, { useState, useEffect } from "react";
import * as api from "../services/Endpoints"
import { Link } from "react-router-dom";
import NavBar from "./navbar";

const ListagemCategories = () => {
    const [categories, setCategories] = useState([]);
    const [categoriesSelecionado, setCategoriesSelecionado] = useState(null);
    const [currentIndex, setCurrentIndex] = useState(-1);

    useEffect(() => {
        buscaCategories();
    }, []);

    const buscaCategories = () => {
        api.getAll("/categories")
            .then(response => {
                setCategories(response.data);
                console.log(response.data);
            })
            .catch(e => {
                console.log(e);
            });
    };

    const setCategoriesAtivo = (categories, index) => {
        setCategoriesSelecionado(categories);
        setCurrentIndex(index);
    };

    return (
        <>
        <div>
             <NavBar />
        </div>
        <div className="container list row">
       
            <div className="col-md-6">
                <h4>Categories</h4>
                <ul className="list-group py-1">
                    {categories &&
                        categories.map((categories, index) => (
                            <li  className={"list-group-item " + (index === currentIndex ? "active" : "")}
                                 onClick={() => setCategoriesAtivo(categories, index)}
                                 key={index}
                            >{categories.name}</li>
                        ))}
                </ul>
            </div>


            <div className="col-md-6">
                {categoriesSelecionado ? (
                    <div>
                        <h4>Detalhe</h4>
                        <div>
                            <label>
                                <strong>Nome:</strong>
                            </label>{" "}
                            {categoriesSelecionado.name}
                        </div>
                        
                        <Link to={"/categories/" + categoriesSelecionado.id} className="btn btn-warning">Editar</Link>
                    </div>
                ) : (
                    <div>
                        <br />
                        <p>Escolha uma categoria ...</p>
                    </div>
                )}
            </div>
        </div>
        </>
    );
};

export default ListagemCategories;