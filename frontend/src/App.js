import React, { useState, useEffect } from "react";
import { useAlert } from 'react-alert'
import api from "./services/api";

import "./global.css";
import "./App.css";
import "./Main.css";

import DevForm from "./components/DevForm";
import DevItem from "./components/DevItem";

function App() {
  const alert = useAlert()
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
    console.log('chegamos fr');
    const response = await api.post('/delete', dev);

    if (!response.data.error) {
      alert.show(response.data.message);
      setDevs(devs.filter(x => x.github_username !== dev.github_username));
    } else {
      alert.show(response.data.error);
    }
    
  }

  return (
    <div id="app">
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
  );
}

export default App;
