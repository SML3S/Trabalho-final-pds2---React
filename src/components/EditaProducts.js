import React, { useState, useEffect } from "react";
import * as api from "../services/Endpoints";
import NavBar from "./navbar";

const EditaProducts = props => {
    const estadoInicial = {
         id: null,
        description: "",
        imgUrl: "",
        name: "",
        price: 0
    };

    const [products, setProducts] = useState(estadoInicial);
    const [message, setMessage] = useState("");

    const getProducts = (id) => {
        api.get(`/products/${id}`)
            .then(response => {
                setProducts(response.data);
                console.log(response);
            })
            .catch(e => {
                console.log(e);
            });
    };
    useEffect(() => {
        getProducts(props.match.params.id);
    }, [props.match.params.id]);

    const trataCampo = event => {
        const { name, value } = event.target;
        setProducts({ ...products, [name]: value });
    };

    const atualizarProducts = () => {
        console.log("at "+products.id );
        api.update(`/Products/${products.id}`, products)
            .then(response => {
                console.log(response.data);
                setMessage("Products atualizado!");
            })
            .catch(e => { console.log(e); });
    };

    const excluirProducts = () => {
        api.remove(`/products/${products.id}`)
            .then(response => {
                console.log(response.data);
                props.history.push("/products");
            })
            .catch(e => { console.log(e); });
    };

    return (
        
        <div>
         <NavBar/> 
            {products ? (
                <div className="edit-form">
                <h4>Editar produto</h4>
                                
                    <form>
                    <div className="form-group">
                        <label htmlFor="nome">Nome</label>
                        <input
                            type="text"
                            className="form-control"
                            id="name"
                            required
                            value={products.name}
                            onChange={trataCampo}
                            name="name"
                        />
                        <label htmlFor="description">Descrição</label>
                        <input
                            type="text"
                            className="form-control"
                            id="description"
                            required
                            value={products.description}
                            onChange={trataCampo}
                            name="description"
                        />
                        <label htmlFor="price">Preço</label>
                        <input
                            type="number"
                            className="form-control"
                            id="price"
                            required
                            value={products.price}
                            onChange={trataCampo}
                            name="price"
                        />
                        <label htmlFor="imgUrl">imagem</label>
                        <input
                            type="text"
                            className="form-control"
                            id="imgUrl"
                            required
                            value={products.imgUrl}
                            onChange={trataCampo}
                            name="imgUrl"
                        />
                    </div>
                       
                    </form>

                    <button className="btn btn-warning danger mt-3" onClick={excluirProducts}>Excluir</button>
                    <button type="submit" className="btn btn-success mt-3 mx-3" onClick={atualizarProducts}>
                        Atualizar
                    </button>
                    <p>{message}</p>
                </div>
            ) : (
                <div>
                    <br />
                    <p>Selecione um Products ...</p>
                </div>
            )}
        </div>
    );
};

export default EditaProducts;