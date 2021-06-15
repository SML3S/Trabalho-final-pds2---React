import React, { useState, useEffect } from "react";
import * as api from "../services/Endpoints";
import NavBar from "./navbar";

const NovoProducts = () => {
    const estadoInicialProducts = {
        description: "",
        imgUrl: "",
        name: "",
        price: 0
    };
    const [products, setProducts] = useState(estadoInicialProducts);
    const [submitted, setSubmitted] = useState(false);

    const trataCampo = (event) => {
        const { name, value } = event.target;
        setProducts({ ...products, [name]: value });
    };

    const novo = () => {
        setProducts(estadoInicialProducts);
        setSubmitted(false);
    };

    //categories
    const [cat, setCategories] = useState([]);
    const [categoriesSelecionado, setCategoriesSelecionado] = useState(-1);
    const [currentIndex, setCurrentIndex] = useState(0);

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


    const enviarProducts = () => {
        console.log("addCat " + categoriesSelecionado)
        var data = {
            categories: [
                {
                    id: categoriesSelecionado - 1,
                    name: cat[categoriesSelecionado - 1].name
                }
            ],
            description: products.description,
            imgUrl: products.imgUrl,
            name: products.name,
            price: products.price
        };
        console.log(data)
        api.create(`/products`, data)

            .then(response => {
                setProducts({
                    description: response.data.description,        
                    id: response.data.id,
                    imgUrl:response.data.imgUrl,                    
                    name: response.data.name,
                    price:response.data.price
                });
                setSubmitted(true);
                console.log(response.data);
            })
            .catch(e => { console.log(e); });
    };

    return (
        <div className="submit-form">
            <NavBar />
            <h1>Cadastra produto</h1>
            {submitted ? (
                <div>
                    <h4>Products cadastrado com sucesso!</h4>
                    <button className="btn btn-success" onClick={novo}>Novo</button>
                </div>
            ) : (
                <div>
                    <div class="form-group">
                        <label >Categoria:</label>
                        <select class="form-control" value={categoriesSelecionado} onChange={e => setCategoriesSelecionado(e.target.value)}>
                            <option>Seleciones</option>
                            {cat &&
                                cat.map((cat, index) => (
                                    <option className={"list-group-item "}
                                        value={cat.id}
                                        key={index}
                                    >{cat.name}</option>
                                ))}
                        </select>
                    </div>
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



                    <button onClick={enviarProducts} className="btn btn-success mt-4">Cadastrar</button>
                </div>
            )}

        </div>

    );
}

export default NovoProducts;