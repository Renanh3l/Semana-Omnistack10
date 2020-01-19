import React from "react";
import ReactDOM from "react-dom";
import App from './pages/App';
import EditDev from './pages/EditDev';
import { transitions, positions, Provider as AlertProvider } from "react-alert";
import AlertTemplate from "react-alert-template-basic";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

// Configuração adicional do react-alert
const options = {
  position: positions.TOP_RIGHT,
  timeout: 5000,
  offset: "30px",
  transition: transitions.SCALE
};

// Para páginas não encontradas
const NoMatch = ({ location }) => (
    <div>
      <h3>Página <code>{location.pathname}</code> não encontrada.</h3>
    </div>
)

ReactDOM.render(
  <AlertProvider template={AlertTemplate} {...options}>
    <Router>
      <Switch>
        <Route exact path="/">
          <App />
        </Route>
        <Route exact path="/update">
          <EditDev />
        </Route>

        <Route path="*" component={NoMatch} />
      </Switch>
    </Router>
  </AlertProvider>,
  document.getElementById("root")
);
