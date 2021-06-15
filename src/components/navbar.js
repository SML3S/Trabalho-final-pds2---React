import React, { Component } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { Link } from "react-router-dom";


class NavBar extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isNavbarHidden: false
        };
    }
    render() {
        return (
        
        <nav className="container navbar navbar-expand navbar-dark bg-dark">
            <h1 className="navbar-brand">
                Exemplo CRUD
</h1>
            <div className="navbar-nav mr-auto">
                <li className="nav-item">
                    <Link to={"/login"} className="nav-link">
                        Login
                </Link>
                </li>
                <li className="nav-item">
                    <Link to={"/users"} className="nav-link">
                        Usuario
</Link>
                </li>
                <li className="nav-item">
                    <Link to={"/novoUsers"} className="nav-link">
                        Novo usuario
</Link>
                </li>
                <li className="nav-item">
                    <Link to={"/categories"} className="nav-link">
                        Categories
</Link>
                </li>
                <li className="nav-item">
                    <Link to={"/novoCategories"} className="nav-link">
                        Novo categoria
</Link>
                </li>
                <li className="nav-item">
                    <Link to={"/products"} className="nav-link">
                        Produto
</Link>
                </li>
                <li className="nav-item">
                    <Link to={"/novoProducts"} className="nav-link">
                        Novo Produto
</Link>
                </li>
            </div>
        </nav>);
    }
}

export default NavBar;