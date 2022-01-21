import React from "react";
import { Route, Switch, BrowserRouter } from "react-router-dom";
import Covid from "./pages/Covid";
import Cotacao from "./pages/Cotacao";
import { Home } from "./pages/Home";
import RSSReader from "./components/RSSReader";
import { Estatisticas } from './pages/Estatisticas'
import { Cadastro } from "./pages/Login";
import { Perfil } from "./pages/Perfil";

function App() {
  return (
    <BrowserRouter>
      <Switch>
        <Route path="/" exact={true} component={Cotacao} />
        <Route path="/cadastrar" exact={true} component={Cadastro} />
        {/* <Route path="/login" exact={true} component={Cadastro} /> */}
        <Route path="/configuracoes" exact={true} component={Home} />
        <Route path="/home" exact={true} component={Home} />
        <Route path="/covid" exact={true} component={Covid} />
        <Route path="/cotacao" exact={true} component={Cotacao} />
        <Route path="/rss" exact={true} component={RSSReader} />
        <Route path="/estatisticas" exact={true} component={Estatisticas} />
        <Route path="/:username" component={Perfil} />
      </Switch>
    </BrowserRouter>
  );
}

export default App;
