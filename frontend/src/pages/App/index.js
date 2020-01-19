import React, { useState, useEffect } from "react";
import { useAlert } from "react-alert";
import api from "../../services/api";

import "../../global.css";
import "./styles.css";

import DevForm from "../../components/DevForm";
import DevItem from "../../components/DevItem";

function App() {
  const alert = useAlert();
  const [devs, setDevs] = useState([]);

  useEffect(() => {
    async function loadDevs() {
      const response = await api.get("/devs");

      setDevs(response.data);
    }

    loadDevs();
  }, []);

  async function handleAddDev(data) {
    const response = await api.post("/devs", data);

    if (!response.data.error) {
      setDevs([...devs, response.data]);
    } else {
      alert.show(response.data.error);
    }
  }

  async function handleDeleteDev(dev) {
    const response = await api.post("/delete", dev);

    if (!response.data.error) {
      alert.show(response.data.message);
      setDevs(devs.filter(x => x.github_username !== dev.github_username));
    } else {
      alert.show(response.data.error);
    }
  }

  return (
    <div id="app">
      <header className="logoHeader">
        <h2>Semana</h2>
        <div class="headerContainer">
          <h1 class="omni">Omni</h1><h1>stack 10.0</h1>
        </div>
      </header>

      <div id="container">
        <aside>
          <strong>Cadastrar</strong>
          <DevForm onSubmit={handleAddDev} />
        </aside>

        <main>
          <ul>
            {devs.map(dev => (
              <DevItem onDelete={handleDeleteDev} key={dev._id} dev={dev} />
            ))}
          </ul>
        </main>
      </div>
    </div>
  );
}

export default App;
