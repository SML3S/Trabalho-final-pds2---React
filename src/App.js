import React, { Component } from "react";
import { BrowserRouter, Switch, Route} from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";

import ListaCategories from "./components/ListaCategories.js";
import NovaCategories from "./components/NovaCategories.js";
import EditaCategories from "./components/EditaCategories.js";
import ListagemProducts from "./components/ListaProducts.js";
import EditaProducts from "./components/EditaProducts";
import NovoProducts from "./components/NovoProducts";
import ListaUsers from "./components/ListaUsers";
import EditaUsers from "./components/EditaUsers";
import NovoUsers from "./components/NovoUsers";
import Login from "./components/Login";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isNavbarHidden: false
    };
  }
  render() {
    return (
      <BrowserRouter>
        

        <div className="container mt-3">

          <Switch>
            <Route exact path={["/", "/login"]} component={Login} />
            <Route exact path="/categories" component={ListaCategories} />
            <Route exact path="/novoCategories" component={NovaCategories} />
            <Route path="/categories/:id" component={EditaCategories} />
            <Route exact path="/products" component={ListagemProducts} />
            <Route exact path="/novoProducts" component={NovoProducts} />
            <Route path="/products/:id" component={EditaProducts} />
            <Route exact path="/users" component={ListaUsers} />
            <Route path="/users/:id" component={EditaUsers} />
            <Route exact path="/novoUsers" component={NovoUsers} />
          </Switch>
        </div>
      </BrowserRouter>
    );
  }
}
export default App;