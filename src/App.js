import React from "react";
import { Route, Switch, BrowserRouter } from "react-router-dom";
import Covid from "./pages/Covid";
import Cotacao from "./pages/Cotacao";
import { Home } from "./pages/Home";
import RSSReader from "./components/RSSReader";
import { Estatisticas } from './pages/Estatisticas'
import { Login } from "./pages/Login";

function App() {
  return (
    <BrowserRouter>
      <Switch>
        <Route path="/" exact={true} component={Home} />
        <Route path="/login" exact={true} component={Login} />
        <Route path="/configuracoes" component={Home} />
        <Route path="/home" component={Home} />
        <Route path="/covid" component={Covid} />
        <Route path="/cotacao" component={Cotacao} />
        <Route path="/rss" component={RSSReader} />
        <Route path="/estatisticas" component={Estatisticas} />
      </Switch>
    </BrowserRouter>
  );
}

export default App;
