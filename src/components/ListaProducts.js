import React, { useState, useEffect } from "react";
import * as api from "../services/Endpoints"
import { Link } from "react-router-dom";
import NavBar from "./navbar";

const ListagemProducts = () => {
    const [products, setProducts] = useState([]);
    const [productsSelecionado, setProductsSelecionado] = useState(null);
    const [currentIndex, setCurrentIndex] = useState(-1);

    useEffect(() => {
        buscaProducts();
    }, []);

    const buscaProducts = () => {
        api.getAll("/products")
            .then(response => {
                setProducts(response.data.content);
                console.log(response.data.content);
            })
            .catch(e => {
                console.log(e);
            });
    };

    const setProductsAtivo = (products, index) => {
        setProductsSelecionado(products);
        setCurrentIndex(index);
    };

    return (
        <div className="container list row">
        <NavBar /> 
            <div className="col-md-6">
                <h4>Produtos</h4>
                <ul className="list-group py-1">
                    {products &&
                        products.map((products, index) => (
                            <li  className={"list-group-item " + (index === currentIndex ? "active" : "")}
                                 onClick={() => setProductsAtivo(products, index)}
                                 key={index}
                            >{products.name}</li>
                        ))}
                </ul>
            </div>


            <div className="col-md-6">
                {productsSelecionado ? (
                    <div>
                        <h4>Detalhe</h4>
                        <div>
                            <label>
                                <strong>Nome:</strong>
                            </label>{" "}
                            {productsSelecionado.name}
                        </div>
                        
                        <Link to={"/Products/" + productsSelecionado.id} className="btn btn-warning">Editar</Link>
                    </div>
                ) : (
                    <div>
                        <br />
                        <p>Escolha uma produto ...</p>
                    </div>
                )}
            </div>
        </div>
    );
};

export default ListagemProducts;