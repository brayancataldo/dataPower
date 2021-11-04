import React from 'react'
import { Route, Switch, BrowserRouter } from 'react-router-dom'
import Covid from './pages/Covid'
import { Home } from './pages/Home'

export function Routes() {
    return (
        <BrowserRouter>
        <Switch>
            <Route path="/" exact={true} component={Home} />
            <Route path="/configuracoes" component={Home} />
            <Route path="/home" component={Home} />
            <Route path="/covid" component={Covid} />
        </Switch>
    </ BrowserRouter>
    )
}
