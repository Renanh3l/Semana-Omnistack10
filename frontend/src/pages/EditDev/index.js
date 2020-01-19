import React, { useState } from "react";
import { useHistory } from "react-router-dom";

import { useAlert } from "react-alert";

import api from "../../services/api";

import "../../global.css";
import "./styles.css";

function EditDev() {
  let history = useHistory();
  let alert = useAlert();
  const dev = history.location.state.editingDev;

  const [devName, setDevName] = useState(dev.name);
  const [devTechs, setDevTechs] = useState(dev.techs.join(", "));

  async function handleUpdateDev(e) {
    e.preventDefault();

    const response = await api.post("/update", {
      github_username: dev.github_username,
      name: devName,
      techs: devTechs
    });

    console.log(response.data);

    if (response.data.dev.nModified > 0) {
      alert.show("Dev atualizado!");
      history.push("/");
    }
  }

  function handleGoBack(e) {
    history.push("/");
  }

  return (
    <div id="editingDev">
      <main>
        <h1>Editar Dev</h1>

        <form
          onReset={handleGoBack}
          onSubmit={handleUpdateDev}
          className="editForm"
        >
          <label htmlFor="github_username">Usuário no Github</label>
          <input
            name="github_username"
            id="github_username"
            disabled
            placeholder={dev.github_username}
          ></input>

          <label htmlFor="name">Nome</label>
          <input
            name="name"
            id="name"
            placeholder={dev.name}
            value={devName}
            onChange={e => setDevName(e.target.value)}
          ></input>

          <label htmlFor="techs">Tecnologias</label>
          <input
            name="techs"
            id="techs"
            placeholder={dev.techs.join(", ")}
            value={devTechs}
            onChange={e => setDevTechs(e.target.value)}
          ></input>

          <button type="submit">Salvar</button>
          <button type="reset">Voltar</button>
        </form>
      </main>
    </div>
  );
}

export default EditDev;
