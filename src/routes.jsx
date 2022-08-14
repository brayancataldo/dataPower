import React, { lazy, Suspense } from "react";
import { Route, Switch, BrowserRouter } from "react-router-dom";
import Progress from "./components/Progress";
import { Buscar } from "./pages/Buscar";
import Chat from "./pages/Chat";
const Cotacao = lazy(() => import("./pages/Cotacao"));
const Home = lazy(() => import("./pages/Home"));
const Estatisticas = lazy(() => import("./pages/Estatisticas"));
const Covid = lazy(() => import("./pages/Covid"));
const Perfil = lazy(() => import("./pages/Perfil"));
const Cadastro = lazy(() => import("./pages/Cadastro"));
const MeusArquivos = lazy(() => import("./pages/MeusArquivos"));
const Login = lazy(() => import("./pages/Login"));
const Tag = lazy(() => import("./pages/Tag"));
const Play = lazy(() => import("./pages/Play"));

export function Routes(username) {
  return (
    <Suspense fallback={<Progress forceCenter={true} />}>
      <BrowserRouter>
        <Switch>
          <Route path="/" exact={true} component={Cotacao} />
          <Route path="/chat" exact={true} component={Chat} />
          <Route path="/chat/:usuarioDestino" exact={true} component={Chat} />
          <Route path="/buscar" exact={true} component={Buscar} />
          <Route path="/buscar/:search" exact={true} component={Buscar} />
          <Route path="/cadastro" exact={true} component={Cadastro} />
          <Route path="/configuracoes" exact={true} component={Home} />
          <Route path="/home" exact={true} component={Home} />
          <Route path="/estatisticas/covid" exact={true} component={Covid} />
          <Route path="/cotacao" exact={true} component={Cotacao} />
          <Route path="/meus-arquivos" exact={true} component={MeusArquivos} />
          <Route path="/estatisticas" exact={true} component={Estatisticas} />
          <Route path="/play" exact={true} component={Play} />
          <Route path="/login" exact={true} component={Login} />
          <Route path="/tag/:id" component={Tag} />
          <Route path="/:username" component={Perfil} />
        </Switch>
      </BrowserRouter>
    </Suspense>
  );
}
