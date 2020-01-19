import React from "react";

import "./styles.css";
import { AiOutlineEdit } from "react-icons/ai";
import { TiDeleteOutline } from "react-icons/ti";
import {useHistory} from 'react-router-dom';

function DevItem({onDelete, dev}) {
  let history = useHistory();

  return (
    <li className="dev-item">
      <div className="userCommands">
        <AiOutlineEdit onClick={()=>{history.push('/update', {editingDev: dev})}} className="edit-user" />
        <TiDeleteOutline onClick={()=>{onDelete(dev)}} className="delete-user" />
      </div>

      <header>
        <img src={dev.avatar_url} alt="Renan Henrique" />
        <div className="user-info">
          <strong>{dev.name}</strong>
          <span>{dev.techs.join(", ")}</span>
        </div>
      </header>
      <p>{dev.bio}</p>
      <a href={`http://github.com/${dev.github_username}`}>
        Acessar perfil no Github
      </a>
    </li>
  );
}

export default DevItem;
